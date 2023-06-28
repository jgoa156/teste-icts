import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Collapse from "react-bootstrap/Collapse";
import Calendar from "react-calendar";
import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";

// Shared
import { H3, H4 } from "components/shared/Titles";
import Button, { ButtonAlt } from "components/shared/Button";
import SelectCustom from "components/shared/SelectCustom";
import toast from "components/shared/Toast";

// Custom
import {
	BikeStationWrapper,
	SliderWrapper,
	Info,
	Reservation
} from "./styles";

// Interfaces
import { IRootState } from "redux/store";
import IUserLogged from "interfaces/IUserLogged";

export default function BikeStation({ station }) {
	const user = useSelector<IRootState, IUserLogged>(state => state.user);

	function NextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<button className={className} style={style} onClick={onClick}>
				<i className="fas fa-chevron-right" />
			</button>
		);
	}

	function PrevArrow(props) {
		const { className, style, onClick } = props;
		return (
			<button className={className} style={style} onClick={onClick}>
				<i className="fas fa-chevron-left" />
			</button>
		);
	}

	return (
		<BikeStationWrapper>
			<SliderWrapper>
				<Slider
					dots={true}
					infinite={true}
					speed={500}
					slidesToShow={1}
					slidesToScroll={1}
					nextArrow={<NextArrow />}
					prevArrow={<PrevArrow />}
				>
					{station?.images.map((image, index) => <img key={index} src={image.link} referrerPolicy="no-referrer" />)}
				</Slider>
			</SliderWrapper>

			<Info>
				<H3>{station?.name}</H3>
				<p>{station?.address}</p>

				<H4>Reservas</H4>
				{station?.reservations.map((reservation) =>
					<Reservation>
						<i className="fas fa-calendar-check" />

						<div>
							<p>
								<span>{reservation?.day.split("-").reverse().join("/")}</span>
							</p>
							<p>
								De {reservation?.hourStart.slice(0, 5)} até as {reservation?.hourEnd.slice(0, 5)}
							</p>
						</div>
					</Reservation>
				)}
			</Info>
		</BikeStationWrapper>
	);
}