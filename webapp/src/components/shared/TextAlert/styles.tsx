import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .spinner {
    margin-bottom: 35px;
  }

  i {
    margin-bottom: 35px;
    font-size: 4rem;

    &.fa-check {
      background: -webkit-linear-gradient(-45deg, #14c1fa, #2c538f);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    &.fa-times {
      background: -webkit-linear-gradient(-45deg, var(--danger), var(--danger-hover));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
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
`;

export const TextAlertStyled = styled.p`
  margin: 0;
  
  text-align: center;
  color: var(--muted);
`;