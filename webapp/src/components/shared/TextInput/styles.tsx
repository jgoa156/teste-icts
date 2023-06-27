import styled from 'styled-components';

// Colors
const text = {
	default: "var(--text-default)",
	unfocused: "var(--muted)",
	focused: "var(--primary-color)",
	valid: "var(--primary-color)",
	invalid: "var(--danger)"
};
const background = {
	unfocused: "var(--white-1)",
	focused: "var(--white-4)"
};

export const AlertLabel = styled.div`
	position: absolute;
	top: 4px;
	right: 8px;

	color: ${text.invalid};
	font-size: 0.75rem;
	font-weight: 400;

	transition: 0.2s;

	&:not(:empty) {
		animation: fade-in 0.1s forwards;

		@keyframes fade-in {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
	}
`;

export const FloatingLabel = styled.div`
	position: absolute;
	left: 8px;

	font-weight: 400;
	transition: 0.15s;
`;

export const InputWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 48px;
	margin-bottom: 24px;
	z-index: 0;
	
	font-size: 1rem;
	border-radius: 4px;
	border: 1px solid var(--white-3);

	&::after {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;

		background-color: ${background.unfocused};
		border-radius: 4px;

		transition: 0.3s;
		content: '';
		opacity: 1;
		
		${({ disabled }) => disabled ? "background-color: #222 !important;" : ""}
	}
	&:hover::after {
		background-color: ${background.focused};
	}
`;

export const Input = styled.input`
	&:focus-visible {
		outline: none;
	}
	&:-webkit-autofill,
	&:-webkit-autofill:hover, 
	&:-webkit-autofill:focus, 
	&:-webkit-autofill:active {
		/* PAIN; AGONY EVEN; SUFFERING, IF YOU WILL */
		-webkit-box-shadow: 0 0 0px 1000px ${background.unfocused} inset;
		-webkit-text-fill-color: ${text.default};
	}

	width: 100%;
	height: 48px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;

	padding: 16px 8px 0;
	border-radius: 4px;
	border: none;

	color: ${text.default};
	background-color: transparent;

	transition: 0.2s;

	& + ${FloatingLabel} {
		color: ${props =>
		props.verified
			? props.valid
				? !props.empty
					? text.valid
					: props.focused
						? text.focused
						: text.unfocused
				: text.invalid
			: props.focused
				? text.focused
				: text.unfocused};
		font-size: ${props => props.focused ? "0.75rem" : "1rem"};
		top: ${props => props.focused ? "4px" : "12px"};
		z-index: ${props => props.focused ? 3 : 1};

    & + ${AlertLabel} {
      z-index: ${props => props.focused ? 3 : 1};
    }
	}
`;
