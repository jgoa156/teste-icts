import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useSelector } from "react-redux";

// Shared
import BikeStation from "../BikeStation";

// Custom
import {
	Sidenav,
	SidenavBackground
} from "./styles";

import styles from "./_styles.module.scss";

// Interfaces
import { IRootState } from "redux/store";
import IUserLogged from "interfaces/IUserLogged";

export default function MapComponent({ stations }) {
	const user = useSelector<IRootState, IUserLogged>(state => state.user);
	const [showSidenav, setShowSidenav] = useState(false);

	// Markers
	const [displayedStation, setDisplayedStation] = useState(null);
	function handleClickMarker(station) {
		setDisplayedStation(station);
		setShowSidenav(true);
	}

	const google = window.google;
	return (
		user.logged && <>
			<GoogleMap
				zoom={15}
				center={user.location}
				mapContainerClassName={styles.mapContainer}
				options={{
					mapTypeControl: false,
					fullscreenControl: false,
					clickableIcons: false,
					streetViewControl: false,
					styles: [
						{
							"featureType": "poi",
							"elementType": "labels.icon",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						}
					]
				}}>
				{stations?.map((station, index) =>
					<MarkerF
						key={index}
						position={station}
						icon={{
							url: `${process.env.img}/reservationMarker.png`,
							anchor: new google.maps.Point(17, 46),
							scaledSize: new google.maps.Size(40, 50)
						}}
						onClick={() => handleClickMarker(station)} />
				)}
				<MarkerF
					position={user.location as any}
					icon={{
						url: `${process.env.img}/userMarker.png`,
						anchor: new google.maps.Point(17, 46),
						scaledSize: new google.maps.Size(40, 50)
					}}
				/>
			</GoogleMap>

			<Sidenav show={showSidenav && displayedStation}>
				<div>
					<div className={"buttonWrapper"}>
						<button
							className={"close"}
							onClick={() => setShowSidenav(false)}>
							<i className={"fas fa-times"} />
						</button>
					</div>

					{showSidenav && displayedStation &&
						<BikeStation station={displayedStation} />
					}
				</div>
			</Sidenav>

			{showSidenav
				? <SidenavBackground onClick={() => setShowSidenav(false)} show={showSidenav} />
				: null
			}
		</>
	);
}