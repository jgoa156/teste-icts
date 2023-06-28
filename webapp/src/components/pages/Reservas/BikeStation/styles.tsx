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

export const Reservation = styled.div`
	display: flex;
	align-items: center;

	padding: 15px 20px;
	margin-top: 15px;

	background-color: var(--white-2);
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
	border-radius: 5px;

	i {
		margin-right: 15px;
		font-size: 1.75rem;
		color: #AAA;
	}

	p {
		margin: 0;
		padding: 0;
		border: none;

		span {
			color: var(--text-default);
			font-weight: 500;
		}
	}
`;