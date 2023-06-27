import React from "react";

// Custom
import { WrapperStyled } from "./styles";

export default function Wrapper(props) {
	return (
		<WrapperStyled {...props}>
			<div>
				{props.children}
			</div>
		</WrapperStyled>
	);
}