import { trpc } from "@/utils/trpc";
import styles from "@styles/register.module.css";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/router";

const register = () => {
	const createUser = trpc.user.create.useMutation();

	const router = useRouter();

	const [nombre, setNombre] = useState("");
	const [Correo, setCorreo] = useState("");
	const [password, setPassword] = useState("");
	const [rol, setRol] = useState("");
	const [phNumber, setPhNumber] = useState("");
	const [dob, setDob] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		createUser.mutate({
			name: nombre,
			email: Correo,
			password: password,
			isDoctor: rol == "true" ? true : false,
			phoneNumber: Number(phNumber),
			DOB: dob,
		});
	};
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
						setNombre(e.target.value);
					}}
				/>
				<label>Correo</label>
				<input
					name='Correo'
					onChange={(e) => {
						setCorreo(e.target.value);
					}}
				/>
				<label>Contraseña</label>
				<input
					name='password'
					type='password'
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<label>Verificar Contraseña</label>
				<input
					name='passwordVerfication'
					type='password'
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
				/>
				<label>Fecha de nacimiento</label>
				<input
					type='date'
					name='dob'
					onChange={(e) => {
						setDob(e.target.value);
					}}
				/>

				<button type='submit'>Registrate</button>
			</form>
		</div>
	);
};

export default register;
