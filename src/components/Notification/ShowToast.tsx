import ReactDOM from 'react-dom';
import './Toast.scss';
import {Toast} from './Toast'
const TOAST_CONTAINER_ID = 'toast' as const;

interface ToastProperties {
  timer?: number;
  label: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string
}

export const ShowToast = (props: ToastProperties, documentId: string = TOAST_CONTAINER_ID) => {
    let container = document.getElementById(documentId) as Element;
  
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', documentId);
      document.body.appendChild(container);
    }
  
    ReactDOM.render(<Toast {...props} />, container);
  };
  
export  const HideToast = (documentId: string = TOAST_CONTAINER_ID) => {
    ReactDOM.unmountComponentAtNode(document.getElementById(documentId) as Element);
  };