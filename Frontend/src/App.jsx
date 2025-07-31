import FaceExpressionDetector from './components/FaceExpressionDetector/FaceExpressionDetector';
import MoodSongs from './components/MoodSongs/MoodSongs';
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className='Heading'>Facial Expression Detection</h1>
      <FaceExpressionDetector />
      <MoodSongs />
    </div>
  );
}

export default App;
