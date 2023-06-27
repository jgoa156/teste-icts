import styled from "styled-components";

export const WrapperStyled = styled.div<{ centerAlign?: boolean }>`
	width: 100%;
	position: relative;

	display: flex;
	justify-content: center;
	
  margin-top: 15px;
  margin-bottom: 50px;
	padding: 15px;

  ${({ centerAlign }) => centerAlign &&
		"min-height: 100vh;" +
		"align-items: center;" +
		"overflow: hidden;" +
		"padding: 0 15px;" +
		"margin: 0;"
	}

	& > div {
		width: 100%;
		height: 100%;
		max-width: 1920px;

		display: flex;
		justify-content: center;
    flex-direction: column;
    
		padding: 0 30px;

		@media only screen and (max-width: 575px) {
			padding: 0;
		}

		animation: slide 0.5s forwards;

		@keyframes slide {
			from {
				opacity: 0;
				margin-top: 50px;
			}
			to {
				opacity: 1;
				margin-top: 0;
			}
		}
	}
`;