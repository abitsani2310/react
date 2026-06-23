import { fetchPageMetadata } from "utils/fetchPageMetaData";

const DEFAULT_API_BASE_URL = "https://portal.sorbannaga.com";

export const getCommonServerSideProps = async (context, pageName, pageId = null) => {
    const { req, res } = context;
    const language = req.cookies.languageSetting;

    let config = null;

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_API_BASE_URL;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const configRes = await fetch(
            `${baseUrl}/api/v1/config`,
            {
                method: "GET",
                headers: {
                    "X-software-id": 33571750,
                    "X-server": "server",
                    "X-localization": language || "en",
                    origin: process.env.NEXT_CLIENT_HOST_URL || "https://sorbannaga.com",
                },
                signal: controller.signal,
            }
        );
        clearTimeout(timeout);

        const contentType = configRes.headers.get("content-type") || "";
        if (!configRes.ok || !contentType.includes("application/json")) {
            console.error(`Config API returned ${configRes.status}: ${configRes.statusText}`);
        }
        else {
            config = await configRes.json();
        }
    } catch (error) {
        console.error("Failed to fetch config:", error?.message || error);
    }

    let metaData = null;
    try {
        metaData = await fetchPageMetadata(pageName, pageId, language);
    } catch (error) {
        console.error("Failed to fetch page metadata:", error?.message || error);
    }

    res.setHeader(
        "Cache-Control",
        config
            ? "public, s-maxage=3600, stale-while-revalidate"
            : "private, no-cache, no-store, max-age=0, must-revalidate"
    );

    return {
        props: {
            configData: config,
            metaData: metaData,
        },
    };
}
