import styled from 'styled-components';

export const HeaderWrapper = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 10;

	display: flex;
	align-items: center;

	padding: 10px 15px;

	background-color: var(--white-1);

	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
	border-radius: 5px;

	border-bottom: 5px solid var(--primary-color);

	img {
		height: 35px;
		width: 35px;

		margin-right: 10px;
		border-radius: 50%;
	}

	span {
		font-size: 1rem;
		font-weight: 500;
		margin-right: 20px;
	}
`;

export const LocationsInputWrapper = styled.div`
	width: 250px;
	margin-right: 15px;
`;

export const Burger = styled.button`
	justify-self: flex-end;

	color: var(--text-default);
	font-size: 1.4rem;
	background-color: transparent;
	border: none;

	transition: 0.3s;

	&:hover {
		color: var(--primary-color);
	}
`;

export const LinkWrapper = styled.div`
	height: fit-content;
	padding: 0 30px;

	ul {
		margin: 0;
	}
	a {
		padding: 10px 15px;

		font-size: 1.25rem;
		font-weight: 500;
		text-decoration: none;
		text-align: right;
		border-right: 3px solid transparent;

		transition: 0.3s;

		&, &:visited, &:active, &:focus {
			color: var(--text-default);
		}
		&:hover {
			color: var(--primary-color);
			border-color: var(--primary-color);
		}

		i {
			margin-right: 10px;
		}
	}
`;

export const Sidenav = styled.div`
	position: fixed;
	z-index: 11;
	top: 0;
	right: ${props => props.show ? "0" : "-65%"};
	min-height: 150%;
	width: 35%;
	max-width: 350px;

	background-color: var(--white-1);
	overflow: hidden;
	word-wrap: break-word;
	white-space: nowrap;

	transition: 0.3s;

	& > div {
		padding: 10px 20px;
	}

	@media (max-width: 575px) {
		width: 65%;

		& > div {
			width: calc(100% - 20px);
			display: flex;
			justify-content: space-between;
		}
	}

	.buttonWrapper {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 50px;

		padding-right: 10px;

		button.close {
			color: var(--text-default);
			font-size: 1.4rem;
			background-color: transparent;
			border: none;

			transition: 0.3s;

			&:hover {
				color: var(--primary-color);
			}
		}
	}

	${LinkWrapper} {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 0;

		a {
			width: 100%;
			margin: 0;
		}
	}
`;

export const SidenavBackground = styled.div`
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	height: 150%;
	width: 100%;

	background-color: rgba(0, 0, 0, 0.5);
	opacity: ${props => props.show ? 1 : 0};

	transition: 0.3s;
`;