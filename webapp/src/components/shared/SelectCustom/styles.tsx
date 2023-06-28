import styled from "styled-components";
import Select from "react-select";

// Colors
const text = {
	default: "var(--text-default)",
	unfocused: "var(--muted)",
	focused: "var(--primary-color)",
	valid: "var(--primary-color)",
	invalid: "var(--danger)"
};
const background = {
	unfocused: "var(--white-3)",
	focused: "var(--white-3)"
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
	
	font-size: 1rem;
	border-radius: 4px;
	border: 1px solid var(--white-3);

  z-index: ${props => props.focused ? 1 : 0};

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
		
	}
	&:hover::after {
		background-color: ${background.focused};
	}
`;

export const SelectStyled = styled(Select)`
	width: 100%;
	z-index: 2;

	margin-bottom: 24px;
	border-radius: 4px;

	& [class*="control"] {
		display: grid;
		grid-template-columns: 1fr 30px;

		background-color: transparent;
		border-radius: 4px;
		border: none;
		box-shadow: none;

		&:hover {
			background-color: transparent;
			cursor: pointer;
		}

    & > div:first-child {
      height: 48px;
      display: flex !important;

      padding: 16px 8px 0;
      border-radius: 4px;
      background-color: transparent;

      transition: 0.3s;

      &:hover {
        background-color: transparent;
        cursor: text;
      }

      & > div:first-child {
        max-width: calc(100vw - 120px);
        color: ${text.default};
      }

      & > div:nth-child(2), input {
        margin: 0;
        padding: 0;

        color: ${text.default}
      }
    }
	}

	& [class*="ValueContainer"] {
		& [class*="Input"] {
			position: absolute;
		}
	}
	& [class*="indicatorContainer"] {
		color: ${text.unfocused};
	}
	& [class*="indicatorSeparator"] {
		display: none;
	}
  
	& [class*="menu"] {
    margin: 0;
		border-radius: 4px;

		& > div {
			padding: 10px 0;
			background-color: var(--white-4);
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);

			div[class*="option"] {
				margin: 0 !important;
				padding: 6px 12px !important;
				
				color: var(--text-default);
				background-color: transparent;
				border-bottom: none !important;
				border-left: 4px solid transparent;

				transition: 0.3s;

				i {
					margin-right: 10px;
				}

				&:hover {
					color: var(--text-default);
					background-color: var(--white-2);
					border-color: var(--primary-color);
				}

				&[class*="9gakcf"] {
					background-color: var(--white-2);
				}
			}
		}
	}

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
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;