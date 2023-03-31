import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { signIn } from "next-auth/react";

const Navbar = () => {
	return (
		<nav className={styles.Navbar}>
			<Link href='/'>
				<h1>Medical</h1>
			</Link>
			<div>
				<Link href=''>Registrate</Link>
				<button onClick={() => signIn()}>Accede</button>
			</div>
		</nav>
	);
};

export { Navbar };
