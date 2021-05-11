import {useEffect, useState} from 'react'
import axios from 'axios'
import './Hours.css'

const Hours = (prevProps) => {
    const {setHourSelected, hours, person, hourSelected, checkDispo, setCheckDispo, day, setMapcheck, mapcheck } = prevProps
    const [hoursOfDay, setHoursOfDay] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4242/posts')
        .then((res) => setCheckDispo(res.data))
        .then(setMapcheck(checkDispo.map((e) => e.date)))
        .then(setHoursOfDay(checkDispo.map((e) => e.hour)))
        .then(console.log(hoursOfDay))
        .then(console.log('mapcheck'+mapcheck))
        // .then(setVerif(mapcheck.filter((single) => single === day)))
        // console.log(`Verif : ${verif}`)
       
      }, [day])

      const updateBdd = () => {


        // MAJ hours after client selected RDV
        let newArray = []
        newArray = hours.filter(item => item !== hourSelected)
        console.log(newArray)
        

        //   axios.put(`http://localhost:4242/posts/update/${day}`)
      }

      const confirmRdv = () => {
            console.log(hourSelected)
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
                alert('RDV create in BDD !')
            }
       }
    
    // const update = (day, hour) => {
    //     axios.put('http://localhost:4242/posts', )
    // }


    const checkDayBddValidation = (e) => {
        const selected = e.target.value
        setHourSelected(selected)
      }

      return(
          <div>
              <div className='hoursAvailable'>
              {checkDispo.map((dispo) => 
            {if(dispo.date === day){
             let list = dispo.hour.map((avail, i) => (<button onClick={checkDayBddValidation} className='listOfHours' value={avail} key={i} >{avail}</button>))  
             return(<div className='listHours'>{list}</div>)
            }else return(null)
          }
            
          )}
            </div>
            <button type='submit' onClick={confirmRdv}>Send RDV to database</button>
            <button type='submit' onClick={updateBdd}>Consolelog</button>
          </div>
      )


}

export default Hours