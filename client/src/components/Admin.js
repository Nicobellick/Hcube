import axios from 'axios'
import {useEffect, useState} from 'react'
// import Calendar from 'react-calendar'


const Admin = () => {

    const [rdv, setRdv] = useState([]) // Entire BDD

    useEffect(() => {
        checkRdv()

    })

    const checkRdv = () => {
        axios.get('http://localhost:4242/rdvs')
        .then((res) => setRdv(res.data))

    }

    // const createDay = (day) => {
    //     // UPDATE sur bdd et supprimer dans array le rdv qui est pris par le Client
    //     // Puis faire un POST sur RDVS en créant un nouveau "RDVPRIS" avec DATE + HOUR + NAME
    //     let info = 
    //       {
    //         date : day,
    //         time : hours
    //     }
    //     axios.post('http://localhost:4242/posts', info)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    //     alert('Day create in BDD !')
    //   }


    return(
        <div>
            <h1>Vos prochains rendez-vous</h1>
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