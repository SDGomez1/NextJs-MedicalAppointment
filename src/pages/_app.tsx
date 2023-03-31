import type { AppProps, AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";
import "@styles/globals.css";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });
const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<SessionProvider session={pageProps.session}>
			<main className={raleway.className}>
				<Component {...pageProps} />
			</main>
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
