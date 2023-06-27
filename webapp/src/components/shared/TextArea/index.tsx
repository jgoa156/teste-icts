import React, { useEffect, useState } from "react";

import { InputWrapper, FloatingLabel, AlertLabel, Input } from "./styles";

// Interface
interface ITextAreaProps {
  type?: string;
  label: string;
  value: string;
  handleValue: (e) => any;
  mask?: any;
  maskChar?: string | null;
  required?: boolean;
  validate?: (e) => boolean;
  alert?: string;
  obligatoryAlert?: string;
  displayAlert?: boolean;
  children?: React.ReactNode;
  [x: string]: any;
};

export default function TextArea({
  type = "text",
  label,
  value,
  handleValue,
  mask = null,
  maskChar = null,
  required = false,
  validate = (e) => {
    return true;
  },
  alert = "",
  obligatoryAlert = "Campo obrigatório",
  displayAlert = !!(alert.length != 0 || required),
  children,
  ...props
}: ITextAreaProps) {
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
  }, []);

  return (
    loaded ?
      <InputWrapper>
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
          valid={valid}
          {...props} />

        <FloatingLabel>{label}</FloatingLabel>
        <AlertLabel>
          {displayAlert
            ? required && empty
              ? obligatoryAlert
              : !valid
                ? alert
                : ""
            : ""}
        </AlertLabel>

        {children}
      </InputWrapper>
      : null
  );
}
