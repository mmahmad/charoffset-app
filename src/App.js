import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputString, setInputString] = useState('');
  const [offsetBase, setOffsetBase] = useState(0);
  const [enableHighlight, setEnableHighlight] = useState(false);
  const [startOffset, setStartOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);
  const offsetLabelWidth = Math.max(20, Math.ceil(Math.log10(inputString.length + offsetBase + 1)) * 12);
  const repoURL = "https://github.com/mmahmad/charoffset-app";


  const handleInputChange = (e) => {
    setInputString(e.target.value);
  };

  const handleOffsetChange = (e) => {
    setOffsetBase(parseInt(e.target.value));
  };

  // Check if the character at the given index should be highlighted
  // based on the current offset base and the start and end offsets
  // of the highlight range.
  // This only highlights if the enableHighlight flag is set to true.
  const isHighlighted = (index) => {
    return enableHighlight && (index+offsetBase >= startOffset && index+offsetBase <= endOffset);
  };

  return (
      <div className="App">
        <div className="container">
        <header className="App-header">
          <h1>Character Offset Labeler</h1>
        </header>
        <main>
          <label htmlFor="inputString" className="input-label">Enter your string:</label>
          <textarea
              className="input-box"
              value={inputString}
              onChange={handleInputChange}
              placeholder="Enter a string..."
              rows="4"
              cols="50"
          />

          <div>
            <label htmlFor="offsetBase">Start offset from index: </label>
            <select id="offsetBase" value={offsetBase} onChange={handleOffsetChange}>
              <option value={0}>0</option>
              <option value={1}>1</option>
            </select>

            {/* Input range of offsets to highlight */}
            <div>
              <label htmlFor="enableHighlight">Enable Highlight:</label>
              <input type="checkbox" id="enableHighlight" checked={enableHighlight} onChange={(e) => setEnableHighlight(e.target.checked)} />
              {enableHighlight && (
                  <>
              <div>
                <label htmlFor="startOffset">Highlight from offset: </label>
                <input type="number" id="startOffset" min="0" value={startOffset} onChange={(e) => setStartOffset(Number(e.target.value))} />
                <label htmlFor="endOffset"> to: </label>
                <input type="number" id="endOffset" min="0" value={endOffset} onChange={(e) => setEndOffset(Number(e.target.value))} />
              </div>
                  </>
                  )}
            </div>

          </div>

          {/* Specify the length of the display string */}
          <div>
            <label>Length of input: {inputString.length} </label>
          </div>

          <div className="string-display">
            {inputString.split('').map((char, index) => (
                <div key={index} className={`char-container${isHighlighted(index) ? ' highlighted' : ''}`}>
                  <div className="char-label-container">
                    {char}
                    <div className="offset-label" style={{ width: `${offsetLabelWidth}px` }}>
                      {index + offsetBase}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </main>

        <footer>
          <div style={{ marginTop: '1rem' }}>
            <a href={repoURL} target="_blank" rel="noopener noreferrer">
              View the source code on GitHub
            </a>
          </div>
        </footer>

        </div>
      </div>
  );
}

export default App;
