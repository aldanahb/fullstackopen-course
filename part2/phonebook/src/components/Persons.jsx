import PersonData from './PersonData'

const Persons = (props) => {

    return(
        <div>
            {(props.personsSearch.map(person => 
            <PersonData 
                key={person.id} 
                name={person.name} 
                number={person.number} 
                deletePerson={() => props.deletePerson(person)}/>))}
        </div>
    )
}

export default Persons