import FaceExpressionDetector from './components/FaceExpressionDetector/FaceExpressionDetector';
import MoodSongs from './components/MoodSongs/MoodSongs';
import "./App.css";
import { useState } from 'react';



function App() {

  const [Songs, setSongs] = useState([]);

  return (
    <div className="App">
      <h1 className='Heading'>Facial Expression Detection</h1>
      <FaceExpressionDetector setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
    </div>
  );
}

export default App;
