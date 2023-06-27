import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

// Custom
import { H3 } from "../Titles";
import Button, { ButtonAlt } from "../Button";
import {
  CustomSheet,
  ButtonGroup
} from "./styles";

export default function confirm(
  onConfirm: Function,
  title: string = "Tem certeza?",
  confirmText: null | string = "Confirmar",
  message: string = "",
  children: React.ReactNode = <></>
) {
  const modalContainer = document.createElement('div');

  const id = `modal-container-${Math.random()}`;

  modalContainer.setAttribute('id', id);
  document.body.appendChild(modalContainer);

  function selfDestroy() {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById(id) as HTMLElement);
      document.body.removeChild(modalContainer);
    }, 100);
  }

  ReactDOM.render(
    <ConfirmModalComponent
      title={title}
      message={message}
      confirmText={confirmText}
      onConfirm={() => onConfirm()}
      onClose={() => selfDestroy()}>
      {children}
    </ConfirmModalComponent>,
    document.getElementById(id)
  );
}

// Interface
interface IConfirmModalComponentProps {
  title: string,
  message: string,
  confirmText: string | null,
  onConfirm: Function,
  onClose: Function,
  children?: React.ReactNode
};

function ConfirmModalComponent({
  title,
  message,
  confirmText = null,
  onConfirm,
  onClose,
  children
}: IConfirmModalComponentProps) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }, []);

  function handleClose() {
    setOpen(false);
    onClose();
  }

  function handleConfirm() {
    onConfirm();
    handleClose();
  }

  return (
    <CustomSheet isOpen={isOpen} onClose={() => handleClose()}>
      <CustomSheet.Container>
        <CustomSheet.Header />
        <CustomSheet.Content>
          <H3>{title}</H3>

          {message.length > 0 &&
            <p>{message}</p>
          }

          {children}

          {confirmText
            ? <ButtonGroup>
              <ButtonAlt onClick={() => handleConfirm()}>{confirmText}</ButtonAlt>
              <Button onClick={() => handleClose()}>Voltar</Button>
            </ButtonGroup>
            : <Button onClick={() => handleClose()}>Voltar</Button>
          }
        </CustomSheet.Content>
      </CustomSheet.Container>

      <CustomSheet.Backdrop onClick={() => handleClose()} />
    </CustomSheet>
  )
}