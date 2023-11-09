import React, { SyntheticEvent, useEffect, useRef } from 'react';
import './Toast.scss';
import { ShowToast, HideToast } from './ShowToast';

// const TOAST_CONTAINER_ID = 'toast' as const;
const TOAST_TIME_MS = 4500 as const;

interface ToastProperties {
  timer?: number;
  label: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
}

export const Toast: React.FC<ToastProperties> = (props) => {
  const toast = useRef<HTMLOutputElement>(null);
  let timer: number = -1;

  const onReset = () => {
    window.clearTimeout(timer);
  };

  const onStart = () => {
    timer = window.setTimeout(HideToast, props.timer);
  };

  const onClose = (event: SyntheticEvent | null) => {
    if (event) event.preventDefault();
    HideToast();
  };

  useEffect(() => {
    onStart();
    toast.current?.focus();

    return () => {
      onClose(null);
    };
  });

  return (
    <output
      aria-labelledby="toast-label"
      onMouseLeave={onStart}
      onMouseEnter={onReset}
      className="toast"
      ref={toast}
      style={{
        backgroundColor: props.backgroundColor || 'transparent',
        color: props.color || '#555555',
        border: props.borderColor || '#555555',
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close dialog"
        className="modal-close no-button"
      >
        x
      </button>
      <p id="toast-label">{props.label}</p>
    </output>
  );
};

Toast.defaultProps = {
  timer: TOAST_TIME_MS,
  backgroundColor: 'transparent',
  color: '#555555',
  borderColor: '#555555',
};

export default ShowToast;

