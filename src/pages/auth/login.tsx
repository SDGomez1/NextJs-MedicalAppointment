import {
	type GetServerSideProps,
	type InferGetServerSidePropsType,
} from "next";
import { type FormEvent, useState } from "react";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";

import styles from "@styles/auth/login.module.css";
import { TypeOf } from "zod";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const ctx = { req: context.req, res: context.res };
	const query = { query: context.query };
	const session = await getServerAuthSession(ctx);

	if (!session) {
		return {
			props: { queryParams: query },
		};
	}

	return {
		redirect: {
			destination: "/",
			permanent: true,
		},
	};
};

const login = ({
	queryParams,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await signIn("credentials", {
				redirect: true,
				username: email,
				password: password,
				callbackUrl: "/",
			});
		} catch (e) {
			alert("Ha ocurrido un error");
		}
	};

	return (
		<div className={styles.Main}>
			<Link href='/'>
				<h1>Medical</h1>
			</Link>
			<form onSubmit={handleSubmit}>
				<label>Correo</label>
				<input
					name='Correo'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required
				/>
				<label>Contraseña</label>
				<input
					name='password'
					type='password'
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					required
				/>
				<p className={styles.ErrorMessage}>
					{queryParams.query.error ? "Correo o contraseña invalidos" : ""}{" "}
				</p>
				<button type='submit'>Iniciar sesión</button>
				<p>
					No Tienes una cuenta?{" "}
					<Link href={"/auth/register"}>Crea una Aquí</Link>
				</p>
			</form>
		</div>
	);
};

export default login;
