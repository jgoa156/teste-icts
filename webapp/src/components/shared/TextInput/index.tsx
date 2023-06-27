import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";

import { InputWrapper, FloatingLabel, AlertLabel, Input } from "./styles";

// Interface
interface ITextInputProps {
	type?: string;
	label: string;
	value: string;
	handleValue: (e) => any;
	mask?: any;
	maskChar?: string | null;
	formatChars?: any;
	required?: boolean;
	validate?: (e) => boolean;
	overrideValidate?: boolean | null;
	alert?: string;
	obligatoryAlert?: string;
	displayAlert?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
	[x: string]: any;
};

export default function TextInput({
	type = "text",
	label,
	value,
	handleValue,
	mask = null,
	maskChar = null,
	formatChars = null,
	required = false,
	validate = (e) => {
		return true;
	},
	overrideValidate = null,
	alert = "",
	obligatoryAlert = "Campo obrigatório",
	displayAlert = !!(alert.length != 0 || required),
	disabled = false,
	children,
	...props
}: ITextInputProps) {
	const [focused, setFocused] = useState(value && value.length != 0);
	const [verified, setVerified] = useState(false);
	const [empty, setEmpty] = useState(true);
	const [valid, setValid] = useState(false);

	function handleAndValidate(e) {
		setVerified(true);

		let valueTemp = e.target.value;
		handleValue(valueTemp);

		let emptyTemp = valueTemp.length == 0;
		setEmpty(emptyTemp);
		setValid(required ? !emptyTemp && validate(valueTemp) : validate(value));
	}

	// Prevent undefined behaviour
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		setLoaded(true);

		if (value) {
			let emptyTemp = value.length == 0;
			setEmpty(emptyTemp);
			setValid(required ? !emptyTemp && validate(value) : validate(value));
		} else {
			setEmpty(true);
			setValid(required ? false && validate(value) : validate(value));
		}
	}, [value]);

	return (
		loaded
			? <InputWrapper disabled={disabled}>
				{mask === null
					? (
						<Input
							type={type}
							value={value}
							onChange={(e) => handleAndValidate(e)}
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							verified={
								displayAlert
									? true
									: required
										? !empty
										: verified
							}
							empty={empty}
							focused={focused || !empty}
							valid={overrideValidate != null ? overrideValidate : valid}
							{...props} />
					) : (
						<InputMask
							value={value}
							onChange={(e) => handleAndValidate(e)}
							mask={mask}
							maskChar={maskChar}
							formatChars={formatChars}
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							{...props}>
							{(inputProps) => (
								<Input
									type={type}
									verified={
										displayAlert
											? true
											: required
												? !empty
												: verified
									}
									empty={empty}
									focused={focused || !empty}
									valid={overrideValidate != null ? overrideValidate : valid}
									{...inputProps}
								/>
							)}
						</InputMask>
					)
				}

				<FloatingLabel>{label}</FloatingLabel>
				<AlertLabel>
					{displayAlert
						? required && empty
							? obligatoryAlert
							: !valid || overrideValidate == false
								? alert
								: ""
						: ""}
				</AlertLabel>

				{children}
			</InputWrapper>
			: null
	);
}
