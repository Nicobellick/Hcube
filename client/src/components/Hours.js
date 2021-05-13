import {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Hours.css'

const Hours = (prevProps) => {
    const {setHourSelected, hours, person, hourSelected, checkDispo, setCheckDispo, day } = prevProps
    const history = useHistory()
    
    useEffect(() => {
        axios.get('http://localhost:4242/posts')
        .then((res) => setCheckDispo(res.data))
        // eslint-disable-next-line
      }, [day])

      const confirmRdv = () => {
            if(person.length === 0){
                alert('Veuillez entrer votre nom')
            } else if(hourSelected === ''){
                alert('Veuillez selectionner une heure')
            } else {
                let info = 
                {
                  date : day,
                  hour : hourSelected,
                  person : person
                }
                axios.post('http://localhost:4242/rdvs', info)
                .then(res => console.log(res))
                .catch(err => console.log(err))
                

                // MAJ hours after client selected RDV
                let newArray = []
                newArray = hours.filter(item => item !== hourSelected)
                axios.put(`http://localhost:4242/posts/update/${day}`, newArray)
                .then(history.push('/confirm'))
                
                
            }
       }
    
    const checkDayBddValidation = (e) => {
        const selected = e.target.value
        setHourSelected(selected)
      }

      return(
          <div>
              <div className='hoursAvailable'>

              {checkDispo.map((dispo, i) => 
            {if(dispo.date === day){
                let list = dispo.hour.map((avail, i) => (<button onClick={checkDayBddValidation} className='listOfHours' value={avail} key={i} >{avail}</button>))  
                return(<div className='listHours' key={i}>{list}</div> )
            }else return null
          }

          ) }
            </div>
                <div className='confirm'>
                {hourSelected !== '' ?
                    <button id='confirmButton'type='submit' onClick={confirmRdv}>Valider le rendez-vous</button>
                    :  null
                }
                </div>


          </div>
      )


}

export default Hours