
const PersonData = (props) => {
  return (
    <li>
      {props.name} {props.number} {' '}
      <button type="button" onClick={props.deletePerson}> delete </button>
    </li>
  )
}

export default PersonData