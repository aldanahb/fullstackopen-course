import PersonData from './PersonData'

const Persons = (props) => {

    const personsToShow = props.all 
    ? props.persons 
    : props.personsSearch

    return(
        <div>
            {(personsToShow.map(person => 
            <PersonData 
                key={person.id} 
                name={person.name} 
                number={person.number} 
                deletePerson={() => props.deletePerson(person)}/>))}
        </div>
    )

}

export default Persons