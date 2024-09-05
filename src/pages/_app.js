import "@/styles/globals.css";
import Head from "next/head";
import { Fragment } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "sonner";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>COP SK-Baidoo Officers</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster />
        <ReactQueryDevtools style={{ fontFamily: "SF Mono" }} initialIsOpen={false} />
      </QueryClientProvider>
    </Fragment>
  );
}
