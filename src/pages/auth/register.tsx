import { trpc } from "@/utils/trpc";
import styles from "@styles/register.module.css";
import Link from "next/link";
import type { FormEvent } from "react";
import { useRouter } from "next/router";

const register = () => {
	const createUser = trpc.user.create.useMutation();

	const router = useRouter();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const nombre: string = event.target.NombreCompleto.value;
		const Correo: string = event.target.Correo.value;
		const password: string = event.target.password.value;
		const rol: string = event.target.rol.value;
		const phNumber: string = event.target.phNumber.value;
		const nombdobre: string = event.target.dob.valueAsDate;

		createUser.mutate({
			name: nombre,
			email: Correo,
			password: password,
			isDoctor: rol == "true" ? true : false,
			phoneNumber: Number(phNumber),
			DOB: nombdobre,
		});
	};
	return (
		<div className={styles.Main}>
			<Link href='/'>
				<h1>Medical</h1>
			</Link>
			<form onSubmit={handleSubmit}>
				<label>Nombre Completo</label>
				<input name='NombreCompleto' />
				<label>Correo</label>
				<input name='Correo' />
				<label>Contraseña</label>
				<input
					name='password'
					type='password'
				/>
				<label>Verificar Contraseña</label>
				<input
					name='passwordVerfication'
					type='password'
				/>
				<label>Rol</label>
				<select name='rol'>
					<option value='false'> Paciente</option>
					<option value='true'>Doctor</option>
				</select>
				<label>Numero de teléfono</label>
				<input name='phNumber' />
				<label>Fecha de nacimiento</label>
				<input
					type='date'
					name='dob'
				/>

				<button type='submit'>Registrate</button>
			</form>
		</div>
	);
};

export default register;
