import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {Route, Switch} from 'react-router'
import axios from 'axios'
import Addrdv from './components/Addrdv';
import Admin from './components/Admin';
import Calendar from 'react-calendar'
import Hours from './components/Hours';
import Information from './components/Information';
import 'react-calendar/dist/Calendar.css'
import './App.css';

function App() {
  const hours = ["11h00", "11h25", "11h50", "12h15", "14h25", "14h50", "15h15", "15h40", "16h05", "16h30"]
  // Hours depending time of appointment ( 25min / RDV) no UTC yet
  
  const [checkDispo, setCheckDispo] = useState([]) // Entire BDD
  const [dayChoose, setDayChoose] = useState(new Date()) // Day choose in Calendar
  const [day, setDay] = useState('') // Format 0-0-0000
  const [hourSelected, setHourSelected] = useState('') // Hour selected by client
  const [mapcheck, setMapcheck] = useState([]) // All days available in BDD
  const [person, setPerson] = useState('') // Name of client
    
// All database :
const checkDatabase = () => {
  axios.get('http://localhost:4242/posts')
  .then((res) => setCheckDispo(res.data))
  .then(setMapcheck(checkDispo.map((e) => e.date)))
}
// Select date on calendar
const changeDate = (e) => {
  setDayChoose(e) 
}
// Convert selected day in 00-00-0000
useEffect(() => {
  let day = dayChoose.toLocaleDateString('fr-FR', {day: 'numeric'}) + '-' + dayChoose.toLocaleDateString('fr-FR', {month: 'numeric'}) + '-' + dayChoose.toLocaleDateString('fr-FR', {year: 'numeric'})
  setDay(day)
  // Create day if doesnt exist
  postRdv(day) 
 // eslint-disable-next-line 
}, [dayChoose])

const postRdv = (day) => {
  if(mapcheck.indexOf(day) > -1){
    return null
  }else { 
  // Create day if doesnt exist in BDD
  let info = 
    {
      date : day,
      time : hours 
  }
  axios.post('http://localhost:4242/posts', info)
  .then(res => console.log(res))
  .catch(err => console.log(err))

  // Refresh
  setTimeout(() => {  
    checkDatabase()
  }, 1000)}}

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
        <Link to='/admin' id='admin'>Espace Admin</Link>
      <div className='nameCalendar'>
        <Information setPerson={setPerson} setCheckDispo={setCheckDispo} checkDispo={checkDispo}/>
        <Calendar onClickDay={changeDate} value={dayChoose} onChange={checkDatabase} />
      </div>
      <div className='disponibility'>
        <h3>Durée du rendez-vous</h3>
          <div id='delay'>
            <p id='timeRdv'>25 min</p>
          </div>
        <div className='hoursAppointments'>
          <h4>Quelle heure vous convient le mieux ?</h4>
          <p id='fuseau'>UTC +02:00 Heure normale d'Europe centrale</p>
          <Hours hours={hours} checkDispo={checkDispo} person={person} setCheckDispo={setCheckDispo} day={day} hourSelected={hourSelected} setHourSelected={setHourSelected} />
        </div>
      </div>
      </Route>
        <Route path='/admin' >
          <Admin />
        </Route>
        <Route path='/confirm'>
          <Addrdv />
        </Route>
        </Switch>
      </div>
    
  );
  }

export default App;
