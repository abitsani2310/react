import { fetchPageMetadata } from "utils/fetchPageMetaData";

export const getCommonServerSideProps = async (context, pageName, pageId = null) => {
    const { req, res } = context;
    const language = req.cookies.languageSetting;

    let config = null;

    try {
        const configRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
            {
                method: "GET",
                headers: {
                    "X-software-id": 33571750,
                    "X-server": "server",
                    "X-localization": language,
                    origin: process.env.NEXT_CLIENT_HOST_URL,
                },
            }
        );

        if (!configRes.ok) {
            console.error(`Config API returned ${configRes.status}: ${configRes.statusText}`);
            return { props: { configData: null, metaData: null } };
        }

        config = await configRes.json();
    } catch (error) {
        console.error("Failed to fetch config:", error?.message || error);
        return { props: { configData: null, metaData: null } };
    }

    const metaData = await fetchPageMetadata(pageName, pageId, language);

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate"
    );

    return {
        props: {
            configData: config,
            metaData: metaData,
        },
    };
}