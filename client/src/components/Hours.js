import {useEffect} from 'react'
import axios from 'axios'

const Hours = (prevProps) => {
    const {setHourSelected, checkDispo, setCheckDispo, day, mapcheck, setMapcheck } = prevProps

    useEffect(() => {
        axios.get('http://localhost:4242/posts')
        .then((res) => setCheckDispo(res.data))
        .then(setMapcheck(checkDispo.map((e) => e.date)))
        .then(console.log(mapcheck))
      }, [])

    
    const verif = mapcheck.filter((single) => single === day)
    console.log(verif)
    setTimeout(() => {
        if(verif.length === 0){
            console.log(day)
            console.log('Condition executer')
          }
    }, 1000)
        


    const checkDayBddValidation = (e) => {
        const selected = e.target.value
        setHourSelected(selected)
        console.log('selected : ' + selected)
      }
      return(
          <div>
              {checkDispo.map((dispo) => 
            {if(dispo.date === day){
             let list = dispo.hour.map((avail, i) => (<button onClick={checkDayBddValidation} value={avail} key={i} >{avail}</button>))  
             return(<div className='listHours'>{list}</div>)
            }else return(null)
          }
            
          )}
          </div>
      )


}

export default Hours