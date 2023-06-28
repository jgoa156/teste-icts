import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Collapse from "react-bootstrap/Collapse";
import Calendar from "react-calendar";
import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Shared
import { H3 } from "components/shared/Titles";
import Button, { ButtonAlt } from "components/shared/Button";
import SelectCustom from "components/shared/SelectCustom";
import toast from "components/shared/Toast";
import Spinner from "components/shared/Spinner";

// Custom
import {
	BikeStationWrapper,
	SliderWrapper,
	Info,
	FormReservation,
	CalendarWrapper
} from "./styles";

// Interfaces
import { IRootState } from "redux/store";
import IUserLogged from "interfaces/IUserLogged";

export default function BikeStation({ station }) {
	const router = useRouter();
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

	// Form
	const [sent, setSent] = useState<boolean>(false);
	const [fetching, setFetching] = useState<boolean>(false);
	const [collapse, setCollapse] = useState<boolean>(false);
	const [dateReservation, setDateReservation] = useState(new Date());
	const [hourStart, setHourStart] = useState<string>("");
	const handleHourStart = value => {
		setHourStart(value);
	}

	const [hourEnd, setHourEnd] = useState("");
	const handleHourEnd = value => {
		setHourEnd(value);
	}

	function handleReservation(e) {
		e.preventDefault();

		function parseDate(date) {
			return date.toLocaleDateString("pt-BR").split("/").reverse().join("-");
		}

		async function fetchReservation(data) {
			setSent(true);
			setFetching(true);

			const options = {
				url: `${process.env.api}/users/${data.userId}/placeReservation`,
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				data: {
					stationId: data.stationId,
					day: data.day,
					hourStart: data.hourStart,
					hourEnd: data.hourEnd,
				}
			};

			await axios.request(options as AxiosRequestConfig).then(
				(response) => {
					router.replace("/reservas");
				}).catch((error) => {
					const errorMessages = {
						0: "Oops, tivemos um erro. Tente novamente.",
						401: "Email e/ou senha inválidos.",
						404: "Usuário não encontrado."
					};

					const code = error?.response?.status ? error.response.status : 500;
					toast("Erro", code in errorMessages ? errorMessages[code] : errorMessages[0], "danger");

				});

			setFetching(false);
		}

		if (hourStart.length != 0 && hourEnd.length != 0)
			fetchReservation({
				userId: user.id,
				stationId: station.id,
				day: parseDate(dateReservation),
				hourStart: hourStart,
				hourEnd: hourEnd
			});
	}

	const [availableHoursStart, setAvailableHoursStart] = useState<String[]>([]);
	const [availableHoursEnd, setAvailableHoursEnd] = useState<String[]>([]);

	function getAvailableHoursArray(start, end) {
		let availableHours: String[] = [];
		for (let i = start; i < end; i++) {
			availableHours.push(`${String(i).padStart(2, "0")}:00`);
		}

		return availableHours;
	}

	useEffect(() => {
		const availableHours = getAvailableHoursArray(0, 24);

		setAvailableHoursStart(availableHours);
		setAvailableHoursEnd(availableHours);
	}, []);

	useEffect(() => {
		if (hourStart.length != 0) {
			const _hourStart = parseInt(hourStart.split(":")[0]);
			setAvailableHoursEnd(getAvailableHoursArray(_hourStart + 1, 24));
		}
	}, [hourStart]);

	useEffect(() => {
		if (hourEnd.length != 0) {
			const _hourEnd = parseInt(hourEnd.split(":")[0]);
			setAvailableHoursStart(getAvailableHoursArray(0, _hourEnd));
		}
	}, [hourEnd]);

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

						<SelectCustom
							label={"Início"}
							name={"hourStart"}
							value={hourStart}
							handleValue={handleHourStart}
							// @ts-ignore
							options={
								availableHoursStart?.map((hour) => {
									return {
										value: hour,
										label: hour
									}
								})}
							required={true}
							alert={""}
							displayAlert={sent}
							noOptionsMessage={"Nenhum horário encontrado"}
						/>

						<SelectCustom
							label={"Término"}
							name={"hourEnd"}
							value={hourEnd}
							handleValue={handleHourEnd}
							// @ts-ignore
							options={
								availableHoursEnd?.map((hour) => {
									return {
										value: hour,
										label: hour
									}
								})}
							required={true}
							alert={""}
							displayAlert={sent}
							noOptionsMessage={"Nenhum horário encontrado"}
						/>

						<ButtonAlt type="submit" onClick={(e) => handleReservation(e)}>
							{fetching
								? <Spinner size={"20px"} color={"var(--primary-color)"} />
								: <>
									<i className="fas fa-check" />
									Confirmar reserva
								</>
							}
						</ButtonAlt>
					</FormReservation>
				</Collapse>
			</Info>
		</BikeStationWrapper>
	);
}