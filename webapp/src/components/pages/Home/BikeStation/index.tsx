import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Collapse from "react-bootstrap/Collapse";
import Calendar from "react-calendar";

// Shared
import { H3 } from "components/shared/Titles";
import Button, { ButtonAlt } from "components/shared/Button";

// Custom
import {
	BikeStationWrapper,
	SliderWrapper,
	Info,
	FormReservation,
	CalendarWrapper
} from "./styles";

export default function BikeStation({ station }) {
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

	// Form
	const [collapse, setCollapse] = useState(false);
	const [dateReservation, setDateReservation] = useState(new Date());

	function handleReservation(e) {
		e.preventDefault();

		function parseDate(date) {
			return date.toLocaleDateString("pt-BR").split("/").reverse().join("-");
		}
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

				<Button onClick={() => setCollapse(!collapse)} aria-expanded={collapse}>
					<i className="fas fa-calendar-plus" />
					Reservar bicicleta
					<i className={`fas fa-chevron-${collapse ? "up" : "down"}`} style={{ paddingLeft: 10, paddingRight: 0 }} />
				</Button>

				<Collapse in={collapse}>
					<FormReservation>
						<CalendarWrapper>
							<Calendar
								prevLabel={<i className="fas fa-chevron-left" />}
								prev2Label={<i className="fas fa-chevron-double-left" />}
								nextLabel={<i className="fas fa-chevron-right" />}
								next2Label={<i className="fas fa-chevron-double-right" />}
								minDate={new Date()}
								onChange={(value) => setDateReservation(value as Date)}
								value={dateReservation} />
						</CalendarWrapper>

						<ButtonAlt type="submit" onClick={(e) => handleReservation(e)}>
							<i className="fas fa-check" />
							Confirmar reserva
						</ButtonAlt>
					</FormReservation>
				</Collapse>
			</Info>
		</BikeStationWrapper>
	);
}