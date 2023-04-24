import { useState } from "react";
import styles from "@styles/setUp/DayCheckBox.module.css";
const DayCheckBox = (props: { text: string }) => {
	const [checked, setChecked] = useState(false);
	return (
		<>
			<div
				className={
					checked
						? [styles.DayCheckBox, styles.checked].join(" ")
						: styles.DayCheckBox
				}
				onClick={(e) => {
					e.preventDefault();
					setChecked(!checked);
				}}
			>
				{props.text}
			</div>
		</>
	);
};

export { DayCheckBox };
