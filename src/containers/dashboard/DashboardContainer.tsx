import { MainInfoPanel } from "@/components/dashboard/MainInfoPanel";
import { SmallCard } from "@/components/dashboard/SmallCard";

import styles from "@styles/dashboard/DashboardContainer.module.css";

export type smallcardContent = {
	title: string;
	content: string | null;
};

const DashboardContainer = (props: { text: smallcardContent[] }) => {
	return (
		<div className={styles.Information}>
			<div className={styles.SmallCardContainer}>
				<SmallCard>
					<h4>{props.text[0].title}</h4>
					{props.text[0].content ? <p>{props.text[0].content}</p> : <></>}
				</SmallCard>
				<SmallCard>
					<h4>{props.text[1].title}</h4>
					{props.text[1].content ? <p>{props.text[1].content}</p> : <></>}
				</SmallCard>
			</div>
			<MainInfoPanel title='Proxima cita agendada' />
		</div>
	);
};

export { DashboardContainer };
