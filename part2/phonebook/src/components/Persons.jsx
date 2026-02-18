import PersonData from './PersonData'

const Persons = (props) => {
    return(
        <div>
            {props.all 
            ? (props.persons.map((person,i) => <PersonData key={i} name={person.name} number={person.number}/>)) 
            : (props.personsSearch.map((person,i) => <PersonData key={i} name={person.name} number={person.number}/>))}
        </div>
    )

}

export default Persons