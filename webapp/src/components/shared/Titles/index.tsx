import styled, { css } from "styled-components";

const Title = css`
	color: var(--text-default);
	white-space: normal;

	i {
		color: var(--white-3);
	}
	
	&:after {
		width: 50px;
		height: 3px;
		display: block;

		margin-top: 10px;

		background-color: var(--primary-color);
		content: "";
	};
`;

const H1 = styled.h1`
	${Title};
`;

const H2 = styled.h2`
	${Title};
`;

const H3 = styled.h3`
	${Title};
`;

const H4 = styled.h4`
	${Title};
`;

const H5 = styled.h5`
	${Title};
`;

const H6 = styled.h6`
	${Title};
`;

export { H1, H2, H3, H4, H5, H6 };