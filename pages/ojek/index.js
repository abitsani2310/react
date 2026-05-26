import Head from "next/head";
import Link from "next/link";

const fallbackModules = [
  {
    title: "Makanan",
    subtitle: "Pesan makanan dan minuman terdekat.",
    href: "/home?source=o-jek&intent=food",
  },
  {
    title: "e-Niaga",
    subtitle: "Belanja kebutuhan harian dari toko lokal.",
    href: "/home?source=o-jek&intent=e-niaga",
  },
  {
    title: "Sembako",
    subtitle: "Cari kebutuhan pokok untuk rumah.",
    href: "/home?source=o-jek&intent=sembako",
  },
  {
    title: "Paket",
    subtitle: "Masuk ke layanan pengiriman SorBanNaga.",
    href: "/parcel-delivery-info?source=o-jek",
  },
  {
    title: "Rental",
    subtitle: "Sewa kendaraan dan layanan pendukung.",
    href: "/home?source=o-jek&intent=rental",
  },
];

const normalizeModules = (channelData) => {
  const rawModules =
    channelData?.modules ||
    channelData?.data?.modules ||
    channelData?.data ||
    [];

  if (!Array.isArray(rawModules) || rawModules.length === 0) {
    return fallbackModules;
  }

  return rawModules.slice(0, 8).map((moduleItem) => {
    const title =
      moduleItem?.module_name ||
      moduleItem?.moduleName ||
      moduleItem?.name ||
      "SorBanNaga";
    const identifier = moduleItem?.slug || moduleItem?.id || "";

    return {
      title,
      subtitle:
        moduleItem?.description ||
        "Buka katalog dan layanan SorBanNaga.",
      href: identifier
        ? `/home?module=${encodeURIComponent(identifier)}&source=o-jek`
        : "/home?source=o-jek",
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
            Pilih kebutuhan kamu dan lanjutkan di ekosistem SorBanNaga.
          </p>
          <Link className="primary-action" href="/home?source=o-jek">
            Buka Katalog
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
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(
      `${baseUrl}/api/v1/ojek/channel/configuration`,
      {
        headers: {
          "X-software-id": "33571750",
          "X-server": "server",
        },
      }
    );

    if (!response.ok) {
      return { props: { modules: fallbackModules } };
    }

    const channelData = await response.json();
    return { props: { modules: normalizeModules(channelData) } };
  } catch (error) {
    return { props: { modules: fallbackModules } };
  }
}

export default OjekChannelPage;
