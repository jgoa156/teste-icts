import styled from "styled-components";

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	padding: 35px;
	background-color: var(--white-2);
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

	@media only screen and (max-width: 575px) {
		padding: 25px;
	}
`;
export default Container;