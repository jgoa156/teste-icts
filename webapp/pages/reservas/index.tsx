import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Shared
import Spinner from "components/shared/Spinner";
import toast from "components/shared/Toast";

// Custom
import MapComponent from "components/pages/Reservas/Map";

// Interfaces
import { IRootState } from "redux/store";
import IUserLogged from "interfaces/IUserLogged";

export default function Home() {
	const router = useRouter();
	const user = useSelector<IRootState, IUserLogged>(state => state.user);
	const [loaded, setLoaded] = useState(true);

	useEffect(() => {
		if (!user.logged) {
			router.replace("/entrar");
		} else {
			fetchStations();
		}
	}, [user]);

	// Loading stations
	const [stations, setStations] = useState<any>([]);
	async function fetchStations() {
		const options = {
			url: `${process.env.api}/users/${user.id}/reservations`,
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		};

		await axios.request(options as AxiosRequestConfig).then(
			(response) => {
				setStations(response.data);
			}).catch((error) => {
				const errorMessages = {
					0: "Oops, tivemos um erro. Recarregue a página e tente novamente."
				};

				const code = error?.response?.status ? error.response.status : 500;

				toast("Erro", code in errorMessages ? errorMessages[code] : errorMessages[0], "danger");
			});

		setLoaded(true);
	}

	return (
		<>
			<Head>
				<title>Minhas reservas - {process.env.title}</title>
			</Head>

			{loaded
				// @ts-ignore
				? <MapComponent stations={stations} />
				: <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Spinner size={"30px"} color={"var(--primary-color)"} />
				</div>
			}
		</>
	);
}