import MainLayout from "../layouts/MainLayout";

const About = () => {
  return (
    <MainLayout>
      {/* Hero / Intro */}
      <section className="section">
        <div className="container max-w-4xl">

          <h1 className="text-4xl font-bold mb-6">
            About TRU PAC
          </h1>

          <p className="text-gray-700 leading-relaxed text-lg">
            TRU PAC INC is a trusted supplier of food packaging and restaurant
            supplies, serving businesses that rely on consistency, durability,
            and competitive bulk pricing to operate efficiently.
          </p>

        </div>
      </section>

      {/* Industry Experience */}
      <section className="section">
        <div className="container max-w-4xl">

          <h2 className="text-2xl font-semibold mb-4">
            Industry Experience
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            With deep experience in the restaurant supply and food packaging
            industry, TRU PAC understands the operational demands of restaurants,
            food trucks, caterers, franchises, and wholesale buyers.
          </p>

          <p className="text-gray-700 leading-relaxed">
            From high-volume takeout operations to specialty food businesses,
            our product range is curated to support daily service, peak demand,
            and long-term growth.
          </p>

        </div>
      </section>

      {/* Reliability */}
      <section className="section">
        <div className="container max-w-4xl">

          <h2 className="text-2xl font-semibold mb-4">
            Reliability You Can Count On
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Reliability is at the core of how we operate. Our customers depend
            on consistent supply, predictable quality, and responsive service —
            and we take that responsibility seriously.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We work closely with established manufacturers and trusted brands
            to ensure every product meets practical, real-world requirements
            for food service environments.
          </p>

        </div>
      </section>

      {/* Long-Term Partnerships */}
      <section className="section">
        <div className="container max-w-4xl">

          <h2 className="text-2xl font-semibold mb-4">
            Built for Long-Term Partnerships
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            TRU PAC focuses on long-term relationships rather than one-time
            transactions. We partner with businesses as they grow, helping them
            scale their operations with dependable packaging solutions.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Our goal is to be a supplier you can rely on — one that understands
            your business, your volume needs, and your standards.
          </p>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <div className="container max-w-4xl">

          <div className="material-card p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Partner with TRU PAC
            </h3>

            <p className="text-gray-700 mb-6">
              Whether you’re sourcing everyday supplies or exploring custom
              packaging options, TRU PAC is ready to support your business.
            </p>

            <a href="/contact" className="btn-primary inline-block">
              Contact Us
            </a>
          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default About;

