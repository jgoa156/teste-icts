import styled from 'styled-components';

export const BikeStationWrapper = styled.div`
	position: relative;
`;

export const SliderWrapper = styled.div`
	position: absolute;
	top: -50px;
	left: -20px;

	width: calc(100% + 40px);

	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

	div.slick-slide {
		height: 100%;
		width: 100%;

		& > div > img {
			height: 250px;
			width: 100%;
			object-fit: cover;
		}
	}

	.slick-arrow {
		z-index: 1;
		color: white;
		width: 40px;
		height: 40px;

		i {
			font-size: 25px;
			text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
		}

		&:before {
			display: none;
		}
	}

	.slick-prev {
		left: 20px;
	}

	.slick-next {
		right: 20px;
	}

	.slick-dots {
		bottom: 10px;

		li > button:before {
			color: white;
		}
	}
`;

export const Info = styled.div`
	padding-top: 230px;

	p {
		margin-bottom: 30px;
		margin-top: 20px;
		padding-bottom: 20px;

		font-size: 1.125rem;
		color: var(--muted);
		white-space: normal;
		border-bottom: 1px solid var(--white-3);	
	}
`;

export const FormReservation = styled.form`
	padding: 20px;

	background-color: var(--white-5);
	border-radius: 0 0 5px 5px;
	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
`;

export const CalendarWrapper = styled.div`
	margin-bottom: 20px;
	font-weight: 500 !important;

	.react-calendar {
		border: none;
		font-family: "Heebo" !important;

		.react-calendar__navigation__label__labelText {
			font-weight: 500;
		}

		.react-calendar__month-view__weekdays__weekday abbr {
			text-decoration: none;
		}

		.react-calendar__tile--hasActive {
			background-color: var(--primary-color);
			color: var(--white-5);
		}

		.react-calendar__tile {
			font-weight: 500;
		}

		.react-calendar__tile--now {
			background-color: var(--white-5);
			color: var(--primary-color-2);
		}

		.react-calendar__tile--active {
			background-color: var(--primary-color);
			color: var(--white-5);
		}
	}
`;