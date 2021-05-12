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
  const formatDate = {  year: 'numeric',  month: 'numeric',  day: 'numeric' }; 
  const [day, setDay] = useState('')

  // Hours depending time of appointment ( 25min / RDV)
  const hours = ["11h00", "11h25", "11h50", "12h15", "14h25", "14h50", "15h15", "15h40", "16h05", "16h30"]
  const [checkDispo, setCheckDispo] = useState([]) // Entire BDD
  const [hourSelected, setHourSelected] = useState('') // Hour selected by client
  const [mapcheck, setMapcheck] = useState([]) // All days available in BDD
  const [refresh, setRefresh] = useState(true)
  
// find index de cette valeur, splice(i, 0) 
// All database :
const checkDatabase = () => {
  axios.get('http://localhost:4242/posts')
  .then((res) => setCheckDispo(res.data))
  .then(setMapcheck(checkDispo.map((e) => e.date)))


}
// filter, aller sur RDVS, voir si un jour est pris, si oui regarder les heures et enlever les heureus
// afficher Hours.filter(e e!== RDVS)

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

// A faire : recuperer l'heure selectionner, let newHour = [heure].splice(heure selectionné), axios.put('/update/${day}', newHour)
const postRdv = (day) => {
  if(mapcheck.indexOf(day) > -1){
    console.log('Day already exist')
  }else { 
  
  let info = 
    {
      date : day,
      time : hours
  }
  axios.post('http://localhost:4242/posts', info)
  .then(res => console.log(res))
  .catch(err => console.log(err))
  console.log(`Day ${day} create in BDD !`)
  // Refresh
  setTimeout(() => {  
    setRefresh(!refresh)
    checkDatabase()
  }, 1000)

}
}

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
      <div className='nameCalendar'>
        <Calendar onClickDay={changeDate} value={dayChoose} onChange={checkDatabase} />
        <Information setPerson={setPerson} setCheckDispo={setCheckDispo} checkDispo={checkDispo}/>
      </div>
      <div className='disponibility'>
        
        <h3>Durée du rendez-vous</h3>
          <div id='delay'>
            <p id='timeRdv'>25 min</p>
          </div>
        <div className='hoursAppointments'>
          <h4>Quelle heure vous convient le mieux ?</h4>
          <p id='fuseau'>UTC +02:00 Heure normale d'Europe centrale (Europe)</p>
          
          {/* {refresh ? <Hours hours={hours} refresh={refresh} checkDispo={checkDispo} person={person} setCheckDispo={setCheckDispo} day={day} hourSelected={hourSelected} setHourSelected={setHourSelected} mapcheck={mapcheck} setMapcheck={setMapcheck}/> : 
          <Hours hours={hours} refresh={refresh} checkDispo={checkDispo} person={person} setCheckDispo={setCheckDispo} day={day} hourSelected={hourSelected} setHourSelected={setHourSelected} mapcheck={mapcheck} setMapcheck={setMapcheck}/> } */}
          <Hours hours={hours} refresh={refresh} checkDispo={checkDispo} person={person} setCheckDispo={setCheckDispo} day={day} hourSelected={hourSelected} setHourSelected={setHourSelected} mapcheck={mapcheck} setMapcheck={setMapcheck}/>
           
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
