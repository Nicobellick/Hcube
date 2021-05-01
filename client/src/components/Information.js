import {useState, useEffect} from 'react'
import axios from 'axios'

const Information = () => {
    const [person, setPerson] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4242/posts')
        .then((res) => console.log(res.data))

    }, [])
    return(
        <div>
            <p>{person ? person : 'En attente'}</p>
        </div>
    )
}
export default Information