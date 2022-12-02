import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

function App() {

  const [imgSource, setImageSource] = useState();

  return (
    <ImageContext.Provider value={{ imgSource, setImageSource }}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </ImageContext.Provider>
  );
}

export default App;