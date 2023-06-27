import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout, setLocation } from "redux/slicer/user";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

// Custom
import LocationsInput from "../LocationsInput";
import {
	HeaderWrapper,
	Burger,
	Sidenav,
	LinkWrapper,
	SidenavBackground,
	LocationsInputWrapper
} from "./styles";

// Interfaces
import { IRootState } from "redux/store";
import IUserLogged from "interfaces/IUserLogged";

export default function Header() {
	const dispatch = useDispatch();
	const user = useSelector<IRootState, IUserLogged>(state => state.user);
	const [showSidenav, setShowSidenav] = useState(false);

	const links = [
		{ icon: "fas fa-bicycle", title: "Localizar estações", route: "home" },
		{ icon: "far fa-calendar-check", title: "Minhas reservas", route: "reservas" },
		{ icon: "fas fa-sign-out", title: "Sair", onClick: () => dispatch(logout()) }
	];

	const isMobile = useMediaQuery({
		query: "(max-width: 575px)"
	});

	// Search
	const [place, setPlace] = useState<any>(null);
	const handlePlace = value => {
		setPlace(value);
	}

	useEffect(() => {
		if (place?.geo && place?.geo != user.location) {
			dispatch(setLocation({
				location: place.geo
			}));
		}
	}, [place]);

	return (
		<HeaderWrapper>
			<LocationsInputWrapper>
				<LocationsInput
					place={place}
					handlePlace={handlePlace}
				/>
			</LocationsInputWrapper>

			<div style={{ display: "flex", alignItems: "center" }}>
				<img src={user.picture} referrerPolicy="no-referrer" />
				{!isMobile && <span>{user.name}</span>}

				<Burger onClick={() => setShowSidenav(true)} aria-expanded={showSidenav}>
					<i className={"fas fa-bars"} />
				</Burger>
			</div>

			<Sidenav show={showSidenav}>
				<div>
					<div className={"buttonWrapper"}>
						<button
							className={"close"}
							onClick={() => setShowSidenav(false)}>
							<i className={"fas fa-times"} />
						</button>
					</div>

					<LinkWrapper>
						{links.map((link, index) =>
							link.route
								? <Link key={index} href={`/${link.route}`}>
									<a><i className={link.icon} />{link.title}</a>
								</Link>
								: <a key={index} href="#" onClick={link.onClick}><i className={link.icon} />{link.title}</a>
						)}
					</LinkWrapper>
				</div>
			</Sidenav>

			{showSidenav
				? <SidenavBackground onClick={() => setShowSidenav(false)} show={showSidenav} />
				: null
			}
		</HeaderWrapper>
	);
}