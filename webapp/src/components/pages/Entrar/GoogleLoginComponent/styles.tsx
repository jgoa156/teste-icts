import styled from 'styled-components';
import Container from "components/shared/Container";

export const LoginWrapper = styled(Container)`
	width: 35%;
	
	padding: 35px;

	@media only screen and (max-width: 1024px) {
		width: 65%;
	}

	@media only screen and (max-width: 575px) {
		width: 100%;

		padding: 25px;
	}

	& > div {
		display: flex;
		flex-direction: column;
	}

	img {
		width: 50%;
		object-fit: cover;
		margin-bottom: 45px;
	}
`;

export const TitleWrapper = styled.div`
	width: 100%;
	margin-bottom: 35px;
`;