/*import StudentCard from "./studentcard.jsx"
function App() {
  return (
    <div className="App">
      <h1 className="app-title">Student ID Cards</h1>
      <div className="cards-container">
        <StudentCard name="Himanshu Singh" marks={85} grade="A" />
        <StudentCard name="Hashi Tarar" marks={78} grade="B+" />
        <StudentCard name="Himasni Rishi" marks={92} grade="A+" />
      </div>
    </div>
  );
}
export default App; */


import react from "react"; 
import{ useState } from "react";

function App() {
  const [isOn, setIsOn] = useState(false);
  return (
    <div style ={{textAlign : 'center', marginTop : '50px'}}>
      <h1>Toggle Button</h1>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}
export default App;