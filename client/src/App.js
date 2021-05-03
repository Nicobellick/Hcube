import {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import Information from './components/Information';
import axios from 'axios'
import 'react-calendar/dist/Calendar.css'
import './App.css';

function App() {
  const [person, setPerson] = useState('')
  const [value, setValue] = useState(new Date())
  const [horaire, setHoraire] = useState([])
  const formatDate = {  year: 'numeric', month: 'numeric', day: 'numeric' };
  // Hours depending time of appointment ( 25min / RDV)
  const hours = ["11h", "11h25", "11h50", "12h15", "14h25", "14h50", "15h15", "15h40", "16h05", "16h30"]
  const [checkDispo, setCheckDispo] = useState('')
  
// Select date on calendar
const changeDate = (e) => {
  setValue(e)
}

useEffect(() => {
  axios.get('http://localhost:4242/posts')
  .then((res) => setHoraire(res.data))
  .then(console.log(horaire))
}, [])


// 1/  On créer automatiquement une date si elle n'existe pas,ca la crée , puis on revois TIME au complet 
// 1/  Si la date existe on map [hours]

const postRdv = () => {
  // UPDATE sur bdd et supprimer dans array le rdv qui est pris par le Client
  // Puis faire un POST sur RDVS en créant un nouveau "RDVPRIS" avec DATE + HOUR + NAME
  let info = 
    {
      date : value.toLocaleDateString('fr-FR', formatDate),
      time : hours
  }
  axios.post('http://localhost:4242/posts', info)
  .then(res => console.log(res))
  .catch(err => console.log(err))
}



/*** LORSQUE LON VALIDE  */
// Supprimer l'horaire choisi de la date Selectionner .
// UPDATE
// PUIS on l'ajouter au client -> POST sur la table du client

// Request BDD, if day exist on BDD return true, else false
const checkDayBdd = () => {
  // Name collection database
  let nameBdd = value.toLocaleDateString('fr-FR', formatDate)
  // Check if already exist
  axios.get('http://localhost:4242/posts')
  .then(res => setCheckDispo(res.data))
  checkDispo.map(dispo => {
    if(dispo.date === nameBdd){
      console.log('this date already exist')
      const availableHours = dispo.hour
      console.log(availableHours)
    }else console.log('Doesnt exist')
  })
  
}
// If false, db.createCollection(nameBDD), if true, check hours available


  return (
    <div className="App">
      <div className='nameCalendar'>
        <Information setPerson={setPerson}/>
        <Calendar id='calendar' onChange={changeDate} value={value} onClickDay={checkDayBdd} />
        <button onClick={postRdv}>Envoyer mon rdv</button>
      </div>
      <div className='disponibility'>
        <h1>Date selectionne : {value.toLocaleDateString('fr-FR', formatDate)}</h1>
        <p>L'année est : {value.toLocaleDateString('fr-FR', {year: 'numeric'})}</p>
        <p>Le mois est : {value.toLocaleDateString('fr-FR', {month: 'long'})}</p>
        <p>Le jour est : {value.toLocaleDateString('fr-FR', {day: 'numeric'})}</p>
        <p>Votre nom est : {person}</p>
        
      </div>
    </div>
  );
}

export default App;
