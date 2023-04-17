import { signIn } from "next-auth/react";
import Link from "next/link";

import styles from "@styles/mainPage/Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.Navbar}>
			<Link href='/'>
				<h1>Medical</h1>
			</Link>

			<div>
				<Link href='/auth/register'>Registrate</Link>
				<button onClick={() => signIn()}>Accede</button>
			</div>
		</nav>
	);
};

export { Navbar };
