import styled from "styled-components";

const Button = styled.button`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 12px 20px;

	color: white;
	background-color: var(--primary-color);
	font-size: 1rem;
	font-weight: bold;
  text-transform: uppercase;

	line-height: 20px;
	
	border-radius: 5px;
	border: none;
	outline: none;

	transition: 0.3s;

  i {
    margin-right: 10px;

    font-size: 1.125rem;
  }

	&:hover {
		background-color: var(--primary-color-2);
	}
`;

export const ButtonAlt = styled(Button)`
  background: none;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);

  &:hover {
		background-color: var(--white-5);
	}
`;

export default Button;