import { LandingLayout } from "components/layout/LandingLayout";
import LandingPage from "../src/components/landing-page";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigData, setLandingPageData } from "redux/slices/configData";
import Router from "next/router";
import SEO from "../src/components/seo";
import useGetLandingPage from "../src/api-manage/hooks/react-query/useGetLandingPage";
import { useGetConfigData } from "../src/api-manage/hooks/useGetConfigData";
import { RTL } from "components/rtl";

const DEFAULT_API_BASE_URL = "https://portal.sorbannaga.com";

const fetchJsonSafely = async (path, language) => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_API_BASE_URL;
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 10000);

	try {
		const response = await fetch(`${baseUrl}${path}`, {
			method: "GET",
			headers: {
				"X-software-id": 33571750,
				"X-server": "server",
				"X-localization": language || "en",
				origin: process.env.NEXT_CLIENT_HOST_URL || "https://sorbannaga.com",
			},
			signal: controller.signal,
		});
		const contentType = response.headers.get("content-type") || "";

		if (!response.ok || !contentType.includes("application/json")) {
			return null;
		}

		return await response.json();
	} catch (error) {
		return null;
	} finally {
		clearTimeout(timeout);
	}
};

const Root = (props) => {
	const { configData, landingPageData } = props;
	const { data, refetch } = useGetLandingPage();
	const dispatch = useDispatch();
	const { data: dataConfig, refetch: configRefetch } = useGetConfigData();
	useEffect(() => {
		configRefetch();
		refetch();
	}, []);
	useEffect(() => {
		dispatch(setLandingPageData(data));
		if (dataConfig) {
			if (dataConfig.length === 0) {
				Router.push("/404");
			} else if (dataConfig?.maintenance_mode) {
				Router.push("/maintainance");
			} else {
				dispatch(setConfigData(dataConfig));
			}
		} else {
		}
	}, [dataConfig, data]);
	let lanDirection = undefined;

	if (typeof window !== "undefined") {
		lanDirection = JSON.parse(localStorage.getItem("settings"))
	}
	// console.log({ lanDirection })
	return (
		<>
			<CssBaseline />
			{/* <DynamicFavicon configData={configData} /> */}
			<SEO
				image={landingPageData?.meta_image || configData?.fav_icon_full_url}
				businessName={configData?.business_name}
				configData={configData}
				title={landingPageData?.meta_title || configData?.business_name}
				description={landingPageData?.meta_description || configData?.meta_description}
			/>
			{data && (
				<LandingLayout configData={dataConfig} landingPageData={data}>

					<LandingPage
						configData={dataConfig}
						landingPageData={data}
					/>

				</LandingLayout>
			)}
		</>
	);
};
export default Root;
export const getServerSideProps = async (context) => {
	const { req, res } = context;
	const language = req.cookies.languageSetting;

	const [config, landingPageData] = await Promise.all([
		fetchJsonSafely("/api/v1/config", language),
		fetchJsonSafely("/api/v1/react-landing-page", language),
	]);
	// Set cache control headers for 1 hour (3600 seconds)
	res.setHeader(
		"Cache-Control",
		config && landingPageData
			? "public, s-maxage=3600, stale-while-revalidate"
			: "private, no-cache, no-store, max-age=0, must-revalidate"
	);

	return {
		props: {
			configData: config,
			landingPageData: landingPageData
		},
	};
};
