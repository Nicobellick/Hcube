import './Information.css'
const Information = (prevProps) => {
    const setPerson = prevProps.setPerson
    const namePerson = (e) => {
        setPerson(e.target.value)
    }
    return(
        <div className='infos'>
            <label htmlFor='name' id='labelName'>Veuillez saisir votre nom et prénom :</label><br/><br/>
            <input type='text' id='name' name='name' onChange={namePerson}></input>
            
        </div>
    )
}
export default Information