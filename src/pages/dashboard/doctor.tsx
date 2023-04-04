import { DashboardContainer } from "@/containers/dashboard/DashboardContainer";
import type { smallcardContent } from "@/containers/dashboard/DashboardContainer";

import { Sidebar } from "@components/dashboard/SideBar";
import { TopBar } from "@components/dashboard/TopBar";

import styles from "@styles/patientDashboard.module.css";

import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const ctx = { req: context.req, res: context.res };
	const session = await getServerAuthSession(ctx);

	if (session) {
		return {
			props: {},
		};
	}

	return {
		redirect: {
			destination: "/",
			permanent: true,
		},
	};
};

const doctorDashboard = () => {
	const listItems: string[] = [
		"Panel principal",
		"Próximas citas",
		"Pacientes",
		"Horarios",
		"",
	];

	const cardText: smallcardContent[] = [
		{
			title: "Todos los pacientes",
			content: null,
		},
		{
			title: "Ver detalles de la próxima cita",
			content: null,
		},
	];
	return (
		<div className={styles.MainContainer}>
			<TopBar />
			<section className={styles.Container}>
				<Sidebar
					listItems={listItems}
					haveButton={false}
				/>
				<DashboardContainer text={cardText} />
			</section>
		</div>
	);
};

export default doctorDashboard;
