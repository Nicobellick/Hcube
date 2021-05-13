import { useEffect } from 'react'
import { useHistory } from 'react-router'
import logo from '../img/succes.png'
import './Addrdv.css'

const Addrdv = () => {
    const history = useHistory()
    useEffect(() => {
      const timer = setTimeout(() => {
            history.push('/')
        }, 3000);
        return() => clearTimeout(timer)
    })

    return(
        <div className='successRdv'>
            <h1>Votre rendez vous à bien été enregistré !</h1><img src={logo} alt='green logo with a litle V inside'></img>
            <p>Vous allez etre automatiquement redirigé vers la page d'accueil..</p>
            
        </div>
    )
}

export default Addrdv