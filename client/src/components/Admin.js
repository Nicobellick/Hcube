import axios from 'axios'
import {useEffect, useState} from 'react'
import Calendar from 'react-calendar'
import './Admin.css'


const Admin = () => {

    const [rdv, setRdv] = useState([]) // Entire BDD
    const [dayChoose, setDayChoose] = useState(new Date())
    const [day, setDay] = useState('')


    useEffect(() => {
        axios.get('http://localhost:4242/rdvs')
        .then((res) => setRdv(res.data))
        setDay(dayChoose.toLocaleDateString('fr-FR', {day: 'numeric'}) + '-' + dayChoose.toLocaleDateString('fr-FR', {month: 'numeric'}) + '-' + dayChoose.toLocaleDateString('fr-FR', {year: 'numeric'}))
    }, [dayChoose])

    const changeDate = (e) => {
        setDayChoose(e) 
      }


    // console.log(sort)
      
    return(
        <div className='all'>
            <Calendar onClickDay={changeDate}></Calendar>
            <h2>Rendez vous du {day} uniquement :</h2>
            {rdv.map((dispo) => 
            {if(dispo.date === day){
                  
                return(<div className='listRdv'>A <strong>{dispo.hour}</strong> avec <strong>{dispo.person}</strong></div> )
            }else return null
          }
         
          ) }
            <h2>Tout vos prochains rendez-vous</h2>
            {rdv.map((dispo, i) => 
            
            {
             return(<div className='listRdv'>
                      <li>Le <strong>{dispo.date}</strong> a <strong>{dispo.hour}</strong> avec {dispo.person}</li>  
                    </div>) 
          }  
          )}
         
        </div>
    )
}

export default Admin