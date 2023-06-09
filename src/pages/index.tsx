import { DoctorPage } from "@components/mainPage/DoctorPage";
import { LandingPage } from "@components/mainPage/LandingPage";
import { Footer } from "@components/mainPage/Footer";
import { Navbar } from "@components/mainPage/Navbar";

import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";

import { prisma } from "@/server/db";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const ctx = { req: context.req, res: context.res };
	const session = await getServerAuthSession(ctx);
	if (session?.user.email) {
		const dbUser = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
		});
		if (dbUser?.phoneNumber == null) {
			return {
				redirect: {
					destination: "/auth/completeRegistration",
					permanent: true,
				},
			};
		}
		if (!dbUser.isDoctor) {
			return {
				redirect: {
					destination: "/dashboard/patient",
					permanent: true,
				},
			};
		}
		return {
			redirect: {
				destination: "/dashboard/doctor",
				permanent: true,
			},
		};
	}

	return {
		props: {},
	};
};
export default function IndexPage(): JSX.Element {
	return (
		<>
			<Navbar />
			<LandingPage />
			<DoctorPage />
			<Footer />
		</>
	);
}
