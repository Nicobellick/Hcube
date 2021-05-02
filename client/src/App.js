import {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import Information from './components/Information';
import axios from 'axios'
import 'react-calendar/dist/Calendar.css'
import './App.css';

function App() {
  const [person, setPerson] = useState('')
  const [value, setValue] = useState(new Date())
  const [time, setTime] = useState('')
  const [horaire, setHoraire] = useState([])
  const [affichage, setAffichage] = useState(false)
  const formatDate = {  year: 'numeric', month: 'long', day: 'numeric' };
  // Hours depending time of appointment ( 25min / RDV)
  const hours = ["11h", "11h25", "11h50", "12h15", "14h25", "14h50", "15h15", "15h40", "16h05", "16h30"]
  
  

const changeDate = (e) => {
  setValue(e)
}
const timing = (e) => {
  setTime(e.target.value)
}
const disponibility = () => {
  
  axios.get('http://localhost:4242/posts')
  .then(res => setHoraire(res.data))
  .then(console.log(horaire))
  .then(setAffichage(true))  

  const dispoAvailable = hours.filter(e => horaire.includes(e) )
  console.log(dispoAvailable)
}
useEffect(() => {
  axios.get('http://localhost:4242/posts')
  .then((res) => setHoraire(res.data))
}, [])
const postRdv = () => {
  let info = 
    {
      person: person,
      date : value,
      time : time
  }
  axios.post('http://localhost:4242/posts', info)
}

  return (
    <div className="App">
      <div className='nameCalendar'>
        <Information setPerson={setPerson}/>
        <Calendar id='calendar' onChange={changeDate} value={value} />
        <button onClick={postRdv}>Envoyer mon rdv</button>
      </div>
      <div className='disponibility'>
        <h1>Date selectionne : {value.toLocaleDateString('fr-FR', formatDate)}</h1>
        <p>L'année est : {value.toLocaleDateString('fr-FR', {year: 'numeric'})}</p>
        <p>Le mois est : {value.toLocaleDateString('fr-FR', {month: 'long'})}</p>
        <p>Le jour est : {value.toLocaleDateString('fr-FR', {day: 'numeric'})}</p>
        <p>Votre nom est : {person}</p>
        <button onClick={disponibility}>Verifier les disponibilités</button>
        <div>
          {affichage ? horaire.map(horair => 
             (
              <li>
                {horair.time}
              </li>
            ))
           : <div>'Donnée en attente'</div>}
        </div>
        <textarea onChange={timing}></textarea>
      </div>
    </div>
  );
}

export default App;
