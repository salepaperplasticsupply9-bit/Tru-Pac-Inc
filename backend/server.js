import express from "express";
import multer from "multer";
import { Resend } from "resend";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import Joi from "joi";
import os from "os";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend client ready");


// ================= SECURITY MIDDLEWARE =================

app.use(helmet());
app.use(morgan("combined"));

// Rate limiting — general API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use("/api", limiter);

// Rate limiting — order endpoint
const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5
});
app.use("/api/cart-order", orderLimiter);

// CORS — allow your frontend origins only
const allowedOrigins = [
  "http://localhost:5173",
  "https://paperplasticsupply.com",
  "https://www.paperplasticsupply.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());


// ================= FILE UPLOAD =================

const upload = multer({
  dest: os.tmpdir(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  }
});


// ================= VALIDATION SCHEMAS =================

const cartSchema = Joi.object({
  orderId: Joi.string().required(),
  orderDate: Joi.string().required(),
  totalItems: Joi.number().required(),
  totalUnits: Joi.number().required(),
  contact: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    businessName: Joi.string().allow("").optional(),
    deliveryAddress: Joi.string().allow("").optional(),
    city: Joi.string().allow("").optional(),
    state: Joi.string().allow("").optional(),
    zipCode: Joi.string().allow("").optional(),
    notes: Joi.string().allow("").optional()
  }).required(),
  items: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      quantity: Joi.number().required()
    }).unknown(true)
  ).required()
});

const contactSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().allow("").optional(),
  message: Joi.string().allow("").optional()
}).unknown(true);


// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "TRU PAC backend running" });
});


// ================= CONTACT FORM =================

app.post("/api/contact", async (req, res) => {

  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Invalid request data");
  }

  try {
    await resend.emails.send({
      from: "Website <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      replyTo: req.body.email,
      subject: "New Contact Message",
      text: JSON.stringify(req.body, null, 2)
    });

    res.sendStatus(200);

  } catch (err) {
    console.error("Contact mail error:", err);
    res.status(500).send("Mail failed");
  }
});


// ================= CART ORDER =================

app.post("/api/cart-order", async (req, res) => {

  const { error } = cartSchema.validate(req.body);
  if (error) {
    console.error("Validation error:", JSON.stringify(error.details, null, 2));
    return res.status(400).send("Invalid request data");
  }

  try {
    const order = req.body;

    const itemsHTML = (order.items || [])
      .map(
        (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;">${item.name}</td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
            ${item.quantity.toLocaleString()}
          </td>
        </tr>
      `
      )
      .join("");

    const emailHTML = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f7f7f7;padding:30px;">
        <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;border:1px solid #eee">

          <div style="background:#163D69;color:white;padding:20px;text-align:center;">
            <h2 style="margin:0;">New Quote Request</h2>
            <p style="margin:5px 0 0;">Order ID: ${order.orderId}</p>
          </div>

          <div style="padding:25px">

            <h3 style="color:#163D69;margin-bottom:10px;">Customer Information</h3>
            <p><strong>Name:</strong> ${order.contact.fullName}</p>
            <p><strong>Email:</strong> ${order.contact.email}</p>
            <p><strong>Phone:</strong> ${order.contact.phone}</p>
            <p><strong>Business:</strong> ${order.contact.businessName || "N/A"}</p>

            <h3 style="color:#163D69;margin-top:25px;margin-bottom:10px;">Delivery Address</h3>
            <p>
              ${order.contact.deliveryAddress || ""}<br/>
              ${order.contact.city || ""}, ${order.contact.state || ""} ${order.contact.zipCode || ""}
            </p>

            <h3 style="color:#163D69;margin-top:25px;margin-bottom:10px;">Order Items</h3>

            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr style="background:#F6EEE0;">
                  <th style="padding:10px;text-align:left;">Product</th>
                  <th style="padding:10px;text-align:center;">Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div style="margin-top:20px;padding:15px;background:#f9f9f9;border-radius:8px;">
              <p><strong>Total Products:</strong> ${order.totalItems}</p>
              <p><strong>Total Units:</strong> ${order.totalUnits.toLocaleString()}</p>
              <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
            </div>

          </div>

          <div style="background:#f3f3f3;padding:15px;text-align:center;font-size:12px;color:#666">
            TRU PAC Packaging • Automated Order Notification
          </div>

        </div>
      </div>
    `;

    // Email to business owner
    await resend.emails.send({
      from: "TRU PAC Orders <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      replyTo: order.contact.email,
      subject: `New Quote Request • ${order.orderId}`,
      html: emailHTML
    });

    // Confirmation email to customer
    await resend.emails.send({
      from: "TRU PAC <onboarding@resend.dev>",
      to: order.contact.email,
      subject: "We Received Your Quote Request",
      html: `
        <h2>Thank you for your request!</h2>
        <p>Hi ${order.contact.fullName},</p>
        <p>We received your packaging quote request and our team will respond within 24 hours.</p>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p>Thanks,<br/>TRU PAC Team</p>
      `
    });

    res.sendStatus(200);

  } catch (err) {
    console.error("Cart mail error:", err);
    res.status(500).send("Mail failed");
  }
});


// ================= CUSTOM QUOTE =================

app.post("/api/custom-quote", upload.single("logo"), async (req, res) => {

  try {
    const form = req.body;

    const productsList = (form.products || "")
      .split(",")
      .map((p) => `<li>${p.trim()}</li>`)
      .join("");

    const emailHTML = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f7f7f7;padding:30px;">
        <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;border:1px solid #eee">

          <div style="background:#163D69;color:white;padding:20px;text-align:center;">
            <h2 style="margin:0;">New Custom Packaging Quote</h2>
            <p style="margin:5px 0 0;">Submitted: ${new Date().toLocaleString()}</p>
          </div>

          <div style="padding:25px">

            <h3 style="color:#163D69;margin-bottom:10px;">Business Information</h3>
            <p><strong>Business Name:</strong> ${form.businessName}</p>
            <p><strong>Contact Name:</strong> ${form.contactName}</p>
            <p><strong>Email:</strong> ${form.email}</p>
            <p><strong>Phone:</strong> ${form.phone}</p>

            <h3 style="color:#163D69;margin-top:25px;margin-bottom:10px;">Packaging Details</h3>
            <ul>${productsList || "<li>No product selected</li>"}</ul>

            <p><strong>Print Type:</strong> ${form.printType || "Not specified"}</p>
            <p><strong>Estimated Quantity:</strong> ${form.quantity || "Not provided"} units</p>

          </div>

          <div style="background:#f3f3f3;padding:15px;text-align:center;font-size:12px;color:#666">
            TRU PAC Packaging • Custom Quote Request
          </div>

        </div>
      </div>
    `;

    await resend.emails.send({
      from: "TRU PAC Quotes <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      replyTo: form.email,
      subject: `New Custom Packaging Quote - ${form.businessName}`,
      html: emailHTML,
      attachments: req.file ? [{
        filename: req.file.originalname || "logo",
        path: req.file.path
      }] : []
    });

    res.sendStatus(200);

  } catch (err) {
    console.error("Quote mail error:", err);
    res.status(500).send("Mail failed");
  }
});


// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});


// ================= START SERVER =================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});