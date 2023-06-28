import styled from 'styled-components';

export const Sidenav = styled.div`
	position: fixed;
	z-index: 11;
	top: 0;
	left: ${props => props.show ? "0" : "-65%"};
	height: 150%;
	min-height: 150%;
	width: 400px;

	background-color: var(--white-1);
	overflow-y: auto;
	word-wrap: break-word;
	white-space: nowrap;

	transition: 0.3s;

	& > div {
		padding: 0 20px;
		overflow-y: auto;
		height: 1565px;
	}

	@media (max-width: 575px) {
		width: 90%;
		left: ${props => props.show ? "0" : "-90%"};
	}

	.buttonWrapper {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 50px;

		padding-left: 10px;

		button.close {
			z-index: 10;
			color: var(--white-1);
			text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
			font-size: 1.4rem;
			background-color: transparent;
			border: none;

			transition: 0.3s;

			&:hover {
				color: var(--primary-color);
			}
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