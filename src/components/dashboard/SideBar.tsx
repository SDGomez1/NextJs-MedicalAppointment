import styles from "@styles/dashboard/Sidebar.module.css";

const Sidebar = (props: { listItems: string[]; haveButton: boolean }) => {
	const generateListItems: JSX.Element[] = props.listItems?.map(
		(item, index) => {
			return <li key={index}>{item}</li>;
		}
	);
	return (
		<div className={styles.SideBar}>
			{props.haveButton ? <button>Nueva Cita +</button> : null}
			<ul>{generateListItems}</ul>
			<p>Ajustes</p>
		</div>
	);
};

export { Sidebar };
