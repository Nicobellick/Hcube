import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {useState} from 'react'
import './App.css';

function App() {
const [value, setValue] = useState(new Date())
const changeDate = (e) => {
  setValue(e)
}

  return (
    <div className="App">
      <Calendar id='calendar' onChange={changeDate} value={value} />

      <h1>Date selectionne : {value.toLocaleDateString()}</h1>
    </div>
  );
}

export default App;
