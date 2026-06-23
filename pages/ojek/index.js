import Head from "next/head";
import Link from "next/link";

const foodModule = {
  title: "Makanan",
  subtitle: "Pesan makanan dan minuman terdekat.",
  href: "/home?module=5&source=o-jek",
};

const fallbackModules = [foodModule];

const isFoodModule = (moduleItem) => {
  const id = String(moduleItem?.id || moduleItem?.module_id || "");
  const type = String(
    moduleItem?.type || moduleItem?.module_type || ""
  ).toLowerCase();
  const name = String(
    moduleItem?.module_name ||
      moduleItem?.moduleName ||
      moduleItem?.name ||
      ""
  ).toLowerCase();

  return id === "5" || type === "food" || name.includes("makanan");
};

const normalizeModules = (channelData) => {
  const rawModules =
    channelData?.modules ||
    channelData?.data?.modules ||
    channelData?.data ||
    [];

  if (!Array.isArray(rawModules) || rawModules.length === 0) {
    return fallbackModules;
  }

  const foodModules = rawModules.filter(isFoodModule);
  const selectedModules = foodModules.length > 0 ? foodModules : [foodModule];

  return selectedModules.slice(0, 1).map((moduleItem) => {
    const title =
      moduleItem?.module_name ||
      moduleItem?.moduleName ||
      moduleItem?.name ||
      "SorBanNaga";
    const identifier = moduleItem?.slug || moduleItem?.id || "";

    return {
      title,
      subtitle: moduleItem?.description || "Pesan makanan dan minuman terdekat.",
      href: identifier
        ? `/home?module=${encodeURIComponent(identifier)}&source=o-jek`
        : foodModule.href,
    };
  });
};

const OjekChannelPage = ({ modules }) => {
  return (
    <>
      <Head>
        <title>SorBanNaga x O-JEK</title>
        <meta
          name="description"
          content="Pintu masuk SorBanNaga untuk pengguna O-JEK."
        />
        <meta name="robots" content="index,follow" />
      </Head>

      <main className="ojek-page">
        <section className="hero">
          <div className="brand-row">
            <span className="brand-mark">SN</span>
            <div>
              <p className="eyebrow">SorBanNaga x O-JEK</p>
              <h1>Layanan SorBanNaga</h1>
            </div>
          </div>
          <p className="lead">
            Pesan makanan dan minuman dari SorBanNaga langsung dari kanal O-JEK.
          </p>
          <Link className="primary-action" href="/home?module=5&source=o-jek">
            Buka Makanan
          </Link>
        </section>

        <section className="module-grid" aria-label="Modul SorBanNaga">
          {modules.map((moduleItem) => (
            <Link
              className="module-card"
              href={moduleItem.href}
              key={`${moduleItem.title}-${moduleItem.href}`}
            >
              <span className="module-icon">
                {moduleItem.title.slice(0, 2).toUpperCase()}
              </span>
              <span>
                <strong>{moduleItem.title}</strong>
                <small>{moduleItem.subtitle}</small>
              </span>
            </Link>
          ))}
        </section>

        <footer className="footer-copy">
          O-JEK menghubungkan kamu ke layanan SorBanNaga. Pemesanan diproses di
          SorBanNaga.
        </footer>
      </main>

      <style jsx>{`
        .ojek-page {
          min-height: 100vh;
          background: #f7f9f5;
          color: #172117;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
          padding: 18px 16px 28px;
        }

        .hero {
          max-width: 620px;
          margin: 0 auto;
          padding: 18px 0 16px;
        }

        .brand-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-mark {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          background: #159600;
          font-weight: 800;
          letter-spacing: 0;
          flex: 0 0 auto;
        }

        .eyebrow {
          margin: 0 0 3px;
          color: #53645a;
          font-size: 13px;
          font-weight: 700;
        }

        h1 {
          margin: 0;
          font-size: 28px;
          line-height: 1.12;
          letter-spacing: 0;
        }

        .lead {
          margin: 16px 0 18px;
          color: #4b5a51;
          font-size: 15px;
          line-height: 1.5;
        }

        .primary-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          width: 100%;
          border-radius: 8px;
          background: #159600;
          color: #ffffff;
          font-weight: 800;
          text-decoration: none;
        }

        .module-grid {
          max-width: 620px;
          margin: 8px auto 0;
          display: grid;
          gap: 10px;
        }

        .module-card {
          display: grid;
          grid-template-columns: 46px 1fr;
          gap: 12px;
          align-items: center;
          min-height: 78px;
          padding: 12px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #e1e8df;
          text-decoration: none;
          color: inherit;
        }

        .module-icon {
          width: 46px;
          height: 46px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #eaf5e8;
          color: #0d7e00;
          font-size: 14px;
          font-weight: 800;
        }

        strong {
          display: block;
          font-size: 15px;
          line-height: 1.25;
          letter-spacing: 0;
        }

        small {
          display: block;
          margin-top: 4px;
          color: #5c6a62;
          font-size: 12px;
          line-height: 1.35;
        }

        .footer-copy {
          max-width: 620px;
          margin: 16px auto 0;
          color: #6d786f;
          font-size: 12px;
          line-height: 1.45;
          text-align: center;
        }

        @media (min-width: 760px) {
          .ojek-page {
            padding-top: 38px;
          }

          .module-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://portal.sorbannaga.com";

  try {
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/api/v1/ojek/channel/configuration`,
      {
        headers: {
          Accept: "application/json",
          "X-software-id": "33571750",
          "X-server": "server",
        },
      }
    );

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok || !contentType.includes("application/json")) {
      return { props: { modules: fallbackModules } };
    }

    const channelData = await response.json();
    return { props: { modules: normalizeModules(channelData) } };
  } catch (error) {
    return { props: { modules: fallbackModules } };
  }
}

export default OjekChannelPage;
