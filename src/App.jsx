import './App.css';
import { useState } from 'react'
import Clipboard from 'react-clipboard.js';

function App() {
  const [textInput, setTextInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formattedText, setFormattedText] = useState("")

  const handleChange = (e) => {
    setIsSubmitted(false);
    setTextInput(e.target.value);
  }

  const handleSubmit = () => {
    console.log(textInput)
    setFormattedText(formatter(textInput));
    setIsSubmitted(true);
  }

  const formatter = (text) => {    
    return text.replace(/\s([P][M])|\s([p][m])/g, 'pm').replace(/\s([A][M])|\s([a][m])/g, 'am').replace(/([,])/g, ', ').replace(/(\s)(\s)/g, ' ').replace(/[)]\s/g, '\n').replace(/[(]/g, '\n')
  }

  return (
    <div className="container">
      <label for="textInput">Please paste your text below:</label>
      <textarea type="text" name="textInput" onChange={handleChange} />
      <button onClick={handleSubmit}>Format</button>
     {isSubmitted && !formattedText && (
        <div id="error-message">Please paste the text you would like to format</div>
      )}
      {isSubmitted && formattedText && (
        <>
        <div id="formattedText">{formattedText}</div>
        <Clipboard data-clipboard-text={formattedText}>
        Copy to clipboard
      </Clipboard>
        </>
      )}
    </div>
  );
}

export default App;
