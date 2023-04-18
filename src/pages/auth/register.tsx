import { type FormEvent, useState, useRef } from "react";
import { type GetServerSideProps } from "next";
import Link from "next/link";

import { trpc } from "@/utils/trpc";
import { getServerAuthSession } from "@/server/auth";
import { signIn } from "next-auth/react";

import { useNameTextParse } from "@/hooks/useNameTextParse";

import styles from "@styles/auth/register.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const ctx = { req: context.req, res: context.res };
	const session = await getServerAuthSession(ctx);

	if (!session) {
		return {
			props: {},
		};
	}

	return {
		redirect: {
			destination: "/",
			permanent: true,
		},
	};
};

const register = (): JSX.Element => {
	const errorRef = useRef<HTMLParagraphElement>(null);

	const [registered, setregistered] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const [nombre, setNombre] = useState("");
	const [Correo, setCorreo] = useState("");
	const [password, setPassword] = useState("");
	const [verfPassword, setVerfPassword] = useState("");
	const [rol, setRol] = useState("");
	const [phNumber, setPhNumber] = useState("");
	const [dob, setDob] = useState("");

	const createUser = trpc.user.create.useMutation();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (verfPassword === password) {
			if (dob) {
				try {
					await createUser.mutateAsync({
						name: nombre,
						email: Correo,
						password: password,
						isDoctor: rol == "true" ? true : false,
						phoneNumber: Number(phNumber),
						DOB: dob,
					});
					setregistered(true);
				} catch (e: any) {
					console.log(e);

					alert(e.message);
				}
			}
		} else {
			if (errorRef.current) {
				errorRef.current.style.display = "block";
				errorRef.current.focus();

				setErrorMsg("Las contraseñas no coinciden");
			}
		}
	};
	if (!registered) {
		return (
			<div className={styles.Main}>
				<Link href='/'>
					<h1>Medical</h1>
				</Link>
				<form onSubmit={handleSubmit}>
					<label>Nombre Completo</label>
					<input
						name='NombreCompleto'
						onChange={(e) => {
							let name = useNameTextParse(e.target.value);
							setNombre(name);
						}}
						required
					/>
					<label>Correo</label>
					<input
						name='Correo'
						onChange={(e) => {
							setCorreo(e.target.value);
						}}
						required
						type='email'
					/>
					<label>Contraseña</label>
					<input
						name='password'
						type='password'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
						minLength={8}
					/>
					<label>Verificar Contraseña</label>
					<p
						ref={errorRef}
						className={styles.error}
					>
						{errorMsg}
					</p>
					<input
						name='passwordVerfication'
						type='password'
						required
						onChange={(e) => {
							setVerfPassword(e.target.value);
						}}
					/>
					<label>Rol</label>
					<select
						name='rol'
						onChange={(e) => {
							setRol(e.target.value);
						}}
					>
						<option value='false'> Paciente</option>
						<option value='true'>Doctor</option>
					</select>
					<label>Numero de teléfono</label>
					<input
						name='phNumber'
						onChange={(e) => {
							setPhNumber(e.target.value);
						}}
						required
						minLength={8}
						maxLength={10}
						type='tel'
					/>
					<label>Fecha de nacimiento</label>
					<input
						type='date'
						max='2005-12-31'
						name='dob'
						onChange={(e) => {
							setDob(e.target.value);
						}}
						required
					/>

					<button type='submit'>Registrate</button>
					<p className={styles.GetLogIn}>
						Ya tienes una cuenta?{" "}
						<Link href={"/auth/login"}> Inicia sesión </Link>
					</p>
				</form>
			</div>
		);
	}
	return (
		<div className={styles.ContainerRegistered}>
			<h2>Se Registrado Correctamente</h2>
			<p> Inicie sesión para terminar de configurar su cuenta.</p>
			<button onClick={() => signIn()}> Iniciar sesión</button>
		</div>
	);
};

export default register;
