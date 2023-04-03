import { DashboardContainer } from "@/containers/dashboard/DashboardContainer";
import { Sidebar } from "@components/dashboard/SideBar";
import { TopBar } from "@components/dashboard/TopBar";
import styles from "@styles/patientDashboard.module.css";
const doctorDashboard = () => {
	const listItems: string[] = [
		"Panel principal",
		"Próximas citas",
		"Pacientes",
		"Horarios",
		"",
	];
	return (
		<div className={styles.MainContainer}>
			<TopBar />
			<section className={styles.Container}>
				<Sidebar
					listItems={listItems}
					haveButton={false}
				/>
				<DashboardContainer />
			</section>
		</div>
	);
};

export default doctorDashboard;
