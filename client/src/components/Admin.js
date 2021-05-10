import axios from 'axios'
import {useEffect, useState} from 'react'


const Admin = () => {

    const [rdv, setRdv] = useState([]) // Entire BDD

    useEffect(() => {
        checkRdv()

    })

    const checkRdv = () => {
        axios.get('http://localhost:4242/rdvs')
        .then((res) => setRdv(res.data))

    }


    return(
        <div>
            <h1>Vos prochains rendez-vous</h1>
            {rdv.map((dispo, i) => 
            {
             return(<div className='listRdv'>
                      <li>Le {dispo.date} a {dispo.hour} avec {dispo.person}</li>  
                    </div>) 
          }  
          )}
        </div>
    )
}

export default Admin