import {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router'
import axios from 'axios'
import Calendar from 'react-calendar'
import Hours from './components/Hours';
import Information from './components/Information';
import 'react-calendar/dist/Calendar.css'
import './App.css';
import Admin from './components/Admin';

function App() {
  const [person, setPerson] = useState('') // Name of client
  const [dayChoose, setDayChoose] = useState(new Date()) // Day choose in Calendar
  const formatDate = {  year: 'numeric', month: 'numeric', day: 'numeric' }; 
  const [day, setDay] = useState('')
  // Hours depending time of appointment ( 25min / RDV)
  const hours = ["11h00", "11h25", "11h50", "12h15", "14h25", "14h50", "15h15", "15h40", "16h05", "16h30"]
  const [checkDispo, setCheckDispo] = useState([]) // Entire BDD
  const [hourSelected, setHourSelected] = useState('') // Hour selected by client
  const [mapcheck, setMapcheck] = useState([]) // All days available in BDD
  
// find index de cette valeur, splice(i, 0) 
// All database :
const checkDatabase = () => {
  axios.get('http://localhost:4242/posts')
  .then((res) => setCheckDispo(res.data))
  .then(setMapcheck(checkDispo.map((e) => e.date)))
  .then(console.log(mapcheck))
}


// Select date on calendar
const changeDate = (e) => {
  setDayChoose(e)
}
// Convert selected day in 00/00/0000
useEffect((formatDate) => {

  let day = dayChoose.toLocaleDateString('fr-FR', formatDate)
  setDay(day)
  // Create day on BDD if doesn't exist

 // eslint-disable-next-line 
}, [dayChoose])

const postRdv = (day) => {
  // UPDATE sur bdd et supprimer dans array le rdv qui est pris par le Client
  // Puis faire un POST sur RDVS en créant un nouveau "RDVPRIS" avec DATE + HOUR + NAME
  let info = 
    {
      date : day,
      time : hours
  }
  axios.post('http://localhost:4242/posts', info)
  .then(res => console.log(res))
  .catch(err => console.log(err))
  alert('Day create in BDD !')
}
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
      <div className='nameCalendar'>
        <Information setPerson={setPerson} setCheckDispo={setCheckDispo} checkDispo={checkDispo}/>
        <Calendar onClickDay={changeDate} value={dayChoose} onChange={checkDatabase} />
        <button onClick={postRdv}>Cree le jour</button>
      </div>
      <div className='disponibility'>
        <h1>Date selectionne : {dayChoose.toLocaleDateString('fr-FR', formatDate)}</h1>
        <p>Votre nom est : {person}</p>
        <div className='hoursAppointments'>
          <h2>Disponibility for this day :</h2>
          <Hours checkDispo={checkDispo} person={person} setCheckDispo={setCheckDispo} day={day} hourSelected={hourSelected} setHourSelected={setHourSelected} mapcheck={mapcheck} setMapcheck={setMapcheck}/>
        </div>
      </div>
      </Route>
        <Route path='/admin' >
          <Admin />
        </Route>
        </Switch>
      </div>
    
  );
  }

export default App;
