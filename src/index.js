import ReactDOM from 'react-dom'; // Import from react-dom (not client)
import FormComponent from './Components/form-component.js'; // Assuming the correct path

import './styles.css';

const rootElement = document.getElementById("root");
ReactDOM.render(<FormComponent />, rootElement);
