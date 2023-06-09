import { DashboardContainer } from "@/containers/dashboard/DashboardContainer";
import type { smallcardContent } from "@/containers/dashboard/DashboardContainer";

import { Sidebar } from "@components/dashboard/SideBar";
import { TopBar } from "@components/dashboard/TopBar";

import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";

import { prisma } from "@/server/db";

import styles from "@styles/patientDashboard.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const ctx = { req: context.req, res: context.res };
	const session = await getServerAuthSession(ctx);

	if (session) {
		if (session.user.email) {
			const user = await prisma.user.findUnique({
				where: {
					email: session.user.email,
				},
			});
			if (user?.isDoctor == false) {
				return {
					props: {},
				};
			}
			return {
				redirect: {
					destination: "/dashboard/doctor",
					permanent: true,
				},
			};
		}
	}

	return {
		redirect: {
			destination: "/",
			permanent: true,
		},
	};
};
const patientDashboard = () => {
	const listItems: string[] = [
		"Panel principal",
		"Doctores",
		"Sedes",
		"Historial de citas",
		"Resultados de laboratorio",
	];

	const cardText: smallcardContent[] = [
		{
			title: "Próxima Cita general disponible",
			content: "30/03/2023 - 10:00 AM Sede hospital del sur",
		},
		{
			title: "Últimos resultados de laboratorio",
			content: null,
		},
	];
	return (
		<div className={styles.MainContainer}>
			<TopBar />
			<section className={styles.Container}>
				<Sidebar
					listItems={listItems}
					haveButton={true}
				/>
				<DashboardContainer text={cardText} />
			</section>
		</div>
	);
};

export default patientDashboard;
