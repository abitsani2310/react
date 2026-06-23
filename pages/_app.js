import "../src/styles/globals.css";
import "../src/styles/nprogress.css";
import { CacheProvider } from "@emotion/react";
import { Provider as ReduxProvider } from "react-redux";
import createEmotionCache from "../src/utils/create-emotion-cache";
import { store } from "redux/store";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "theme";
import CssBaseline from "@mui/material/CssBaseline";
import { RTL } from "components/rtl";
import { Toaster } from "react-hot-toast";
import { SettingsConsumer, SettingsProvider } from "contexts/settings-context";
import "../src/language/i18n";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "next/router";
import nProgress from "nprogress";
import useScrollToTop from "api-manage/hooks/custom-hooks/useScrollToTop";

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();
const persistor = persistStore(store);

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  useScrollToTop();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  const theme = createTheme({
                    colorPreset: settings?.colorPreset,
                    direction: settings?.direction,
                    paletteMode: settings?.theme,
                  });

                  return (
                    <ThemeProvider theme={theme}>
                      <RTL direction={settings?.direction}>
                        <CssBaseline />
                        {getLayout(<Component {...pageProps} />)}
                        <Toaster position="top-center" />
                        <ReactQueryDevtools initialIsOpen={false} />
                      </RTL>
                    </ThemeProvider>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
