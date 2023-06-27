import React from 'react';
import ReactDOM from 'react-dom';

import { Toast } from './styles';

type errorTypes = "success" | "danger";

export default function toast(title: string, message: string, type: errorTypes = "success") {
  const toastContainer = document.createElement('div');

  const id = `toast-container${Math.random()}`;

  toastContainer.setAttribute('id', id);
  document.body.appendChild(toastContainer);

  ReactDOM.render(
    <ToastComponent title={title} message={message} type={type} />,
    document.getElementById(id)
  );

  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById(id) as HTMLElement);
    document.body.removeChild(toastContainer);
  }, 3600);
}

interface IToastProps {
  title: string;
  message: string;
  type: errorTypes;
};

function ToastComponent({ title, message, type }: IToastProps) {
  return (
    <Toast type={type}>
      <h5>{title}</h5>
      <p>{message}</p>
    </Toast>
  );
}
