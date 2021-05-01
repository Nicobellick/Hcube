import {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import Information from './components/Information';
import axios from 'axios'
import 'react-calendar/dist/Calendar.css'
import './App.css';

function App() {
const [value, setValue] = useState(new Date())

const changeDate = (e) => {
  setValue(e)
  
}
useEffect(() => {
  axios.get('http://localhost:4242/posts')
  .then((res) => console.log(res.data))
}, [])

  return (
    <div className="App">
      <Calendar id='calendar' onChange={changeDate} value={value} />
      <Information/>
      <h1>Date selectionne : {value.toLocaleDateString()}</h1>
    </div>
  );
}

export default App;
