
const Filter = (props) => {
    return (
    <div>
      filter shown with: <input value={props.search} onChange={props.handler} />
    </div>)

}

export default Filter