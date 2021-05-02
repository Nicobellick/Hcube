import {useState, useEffect} from 'react'
import axios from 'axios'

const Information = (prevProps) => {
    const setPerson = prevProps.setPerson
    
    const namePerson = (e) => {
        setPerson(e.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:4242/posts')
        .then((res) => console.log(res.data))

    }, [])
    return(
        <div>
            <h1>Votre nom :</h1>
            <textarea onChange={namePerson}></textarea>
            
        </div>
    )
}
export default Information