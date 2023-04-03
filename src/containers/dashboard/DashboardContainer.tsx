import { MainInfoPanel } from "@/components/dashboard/MainInfoPanel";
import { SmallCard } from "@/components/dashboard/SmallCard";
import styles from "@styles/dashboard/DashboardContainer.module.css";

export type smallcardContent = {
	title: string;
	content: string | null;
};

const DashboardContainer = (props: {
	children: smallcardContent[];
	title: string;
}) => {
	return (
		<div className={styles.Information}>
			<div className={styles.SmallCardContainer}>
				<SmallCard>
					<h4>Proxima Cita general disponbile</h4>
					<p>30/03/2023 - 10:00 AM Sede hospital del sur</p>
				</SmallCard>
				<SmallCard>
					<h4>Ultimos resultados de laboratorio</h4>
				</SmallCard>
			</div>
			<MainInfoPanel title='Proxima cita agendada' />
		</div>
	);
};

export { DashboardContainer };
