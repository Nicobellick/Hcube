// import {useEffect} from 'react'
// import axios from 'axios'

const Information = (prevProps) => {
    const setPerson = prevProps.setPerson
    // const setCheckDispo = prevProps.setCheckDispo
    // const checkDispo = prevProps.checkDispo
    
    const namePerson = (e) => {
        setPerson(e.target.value)
    }

    // useEffect(() => {
    //     axios.get('http://localhost:4242/posts')
    //     .then((res) => setCheckDispo(res.data))
    //     .then(console.log(checkDispo))

    // }, [])
    return(
        <div>
            <h1>Votre nom :</h1>
            <textarea onChange={namePerson}></textarea>
            
        </div>
    )
}
export default Information