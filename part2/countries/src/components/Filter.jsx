
const Filter = (props) => {
    return (
    <div>
      find countries: <input value={props.search} onChange={props.handler}/>
    </div>)
}

export default Filter