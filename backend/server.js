import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import xss from "xss-clean";
import Joi from "joi";

dotenv.config();

const app = express();


// ================= SECURITY MIDDLEWARE =================

// Security headers
app.use(helmet());

// HTTP request logging
app.use(morgan("combined"));

// Sanitize user input
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use("/api", limiter);

const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5
});

app.use("/api/cart-order", orderLimiter);

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://paperplasticsupply.com"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// JSON body parser
app.use(express.json());


// ================= FILE UPLOAD SECURITY =================

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads allowed"));
    }
    cb(null, true);
  }
});


// ================= EMAIL TRANSPORT =================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// ================= VALIDATION =================

const cartSchema = Joi.object({
  contact: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
  }).required(),
  items: Joi.array().required()
});


// ================= CONTACT FORM =================

app.post("/api/contact", async (req, res) => {
  try {

    await transporter.sendMail({
      from: `"Website" <${process.env.EMAIL_USER}>`,
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

    await transporter.sendMail({
      from: `"TRU PAC Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: order.contact.email,
      subject: `New Quote Request • ${order.orderId}`,
      html: emailHTML
    });

    await transporter.sendMail({
      from: `"TRU PAC" <${process.env.EMAIL_USER}>`,
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
      .map((p) => `<li>${p}</li>`)
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

    await transporter.sendMail({
      from: `"TRU PAC Quotes" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: form.email,
      subject: `New Custom Packaging Quote - ${form.businessName}`,
      html: emailHTML,
      attachments: req.file ? [{ path: req.file.path }] : []
    });

    res.sendStatus(200);

  } catch (err) {
    console.error("Quote mail error:", err);
    res.status(500).send("Mail failed");
  }
});


// ================= SERVER =================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});