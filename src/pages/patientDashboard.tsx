import { DashboardContainer } from "@/containers/dashboard/DashboardContainer";
import { Sidebar } from "@components/dashboard/SideBar";
import { TopBar } from "@components/dashboard/TopBar";
import styles from "@styles/patientDashboard.module.css";
const patientDashboard = () => {
	const listItems: string[] = [
		"Panel principal",
		"Doctores",
		"Sedes",
		"Historial de citas",
		"Resultados de laboratorio",
	];
	return (
		<div className={styles.MainContainer}>
			<TopBar />
			<section className={styles.Container}>
				<Sidebar
					listItems={listItems}
					haveButton={true}
				/>
				<DashboardContainer />
			</section>
		</div>
	);
};

export default patientDashboard;
