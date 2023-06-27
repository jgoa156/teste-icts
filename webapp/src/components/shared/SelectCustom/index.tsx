import React, { useState, useEffect } from "react";

// Shared
import Spinner from "components/shared/Spinner";

// Custom
import {
	InputWrapper,
	SelectStyled,
	FloatingLabel,
	AlertLabel,
	SpinnerWrapper
} from "./styles";

// Interface
interface IOption {
	value: any | any[];
	label: string;
}

interface ISelectCustomProps {
	label: string;
	options: IOption[];
	value: any;
	handleValue: (e) => any;
	required?: boolean;
	obligatoryAlert?: string;
	displayAlert?: boolean;
	children?: React.ReactNode;
	fetching?: boolean;
	noOptionsMessage?: string;
	[x: string]: any;
};

export default function SelectCustom({
	label,
	options,
	value,
	handleValue,
	required = false,
	obligatoryAlert = "Campo obrigatório",
	displayAlert = !!(alert.length != 0 || required),
	children,
	fetching = false,
	noOptionsMessage = "Nenhum item encontrado",
	...props
}: ISelectCustomProps) {
	const [focused, setFocused] = useState(false);
	const [empty, setEmpty] = useState(true);

	function handle(e) {
		let valueTemp = e.value;

		handleValue(valueTemp);
		setEmpty(false);
	}

	// Prevent undefined behaviour
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		setLoaded(true);

		if (value) {
			let emptyTemp = value.length == 0;
			setEmpty(emptyTemp);
		} else {
			setEmpty(true);
		}
	}, [value]);

	return (
		loaded
			? <InputWrapper focused={focused}>
				<SelectStyled
					placeholder={""}
					options={options}
					onChange={(e) => handle(e)}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					verified={
						displayAlert
							? true
							: required
								? !empty
								: true
					}
					empty={empty}
					valid={!empty}
					focused={focused || !empty}
					fetching={fetching}
					noOptionsMessage={() => fetching
						? <SpinnerWrapper><Spinner size={"20px"} color={"var(--muted)"} /></SpinnerWrapper>
						: <>{noOptionsMessage}</>
					}
					{...props}
				/>

				<FloatingLabel>{label}</FloatingLabel>
				<AlertLabel>
					{displayAlert
						? required && empty
							? obligatoryAlert
							: ""
						: ""}
				</AlertLabel>

				{children}
			</InputWrapper>
			: null
	);
}