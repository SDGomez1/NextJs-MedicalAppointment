import styles from "@styles/dashboard/SmallCard.module.css";

const SmallCard = (props: { children: JSX.Element[] | JSX.Element }) => {
	return <div className={styles.SmallCard}>{props.children}</div>;
};

export { SmallCard };
