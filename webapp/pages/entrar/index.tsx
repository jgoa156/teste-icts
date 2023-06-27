import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Shared
import Wrapper from "components/shared/Wrapper";
import Spinner from "components/shared/Spinner";

// Custom
import GoogleLoginComponent from "components/pages/Entrar/GoogleLoginComponent";
import BackgroundVideo from "components/pages/Entrar/BackgroundVideo";

// Interfaces
import { IRootState } from "redux/store";
import IUserLogged from "interfaces/IUserLogged";

export default function Entrar() {
	const router = useRouter();
	const user = useSelector<IRootState, IUserLogged>(state => state.user);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (user.logged) {
			router.replace("/home");
		} else {
			setTimeout(() => setLoaded(true), 250);
		}
	}, [user]);

	return (
		<>
			<Head>
				<title>Entrar - {process.env.title}</title>
			</Head>

			{loaded
				? <Wrapper centerAlign={true}>
					<BackgroundVideo />

					<GoogleLoginComponent />
				</Wrapper>
				: <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Spinner size={"30px"} color={"var(--primary-color)"} />
				</div>
			}
		</>
	);
}