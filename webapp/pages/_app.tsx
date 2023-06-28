import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "redux/store";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from "components/shared/Header";
import { useDispatch } from "react-redux";
import { setLocation } from "redux/slicer/user";
import { getLocation } from "utils";
import { useJsApiLoader } from "@react-google-maps/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../public/styles/main.css";
import "../public/styles/calendar.css";
import "../public/fonts/Heebo.css";

// Interfaces
import { IRootState } from "redux/store";
import IUserLogged from "interfaces/IUserLogged";

export default function AppWrapper(props: any) {
	return (
		<GoogleOAuthProvider clientId={process.env.googleClientId as string}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App {...props} />
				</PersistGate>
			</Provider>
		</GoogleOAuthProvider>
	);
}

function App(props: any) {
	const dispatch = useDispatch();
	const user = useSelector<IRootState, IUserLogged>(state => state.user);

	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		setLoaded(true);

		async function loadLocation() {
			dispatch(setLocation({
				location: await getLocation()
			}));
		}

		loadLocation();
	}, []);

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.mapsApiKey as string,
		libraries: ["places"]
	});

	return (
		<section id="app">
			<Head>
				{/* Meta */}
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="theme-color" content="#111" />

				<title>{process.env.title}</title>

				{/* Font Awesome */}
				<link
					rel="stylesheet"
					href="https://jgoa156.github.io/FA5PRO/css/all.min.css"
				/>
			</Head>

			<noscript>
				You need to turn on JavaScript to see this page
			</noscript>

			{loaded && isLoaded && <>
				{user.logged && <Header />}

				<main id={"main"}>
					<props.Component {...props.pageProps} />
				</main>
			</>}
		</section>
	);
}