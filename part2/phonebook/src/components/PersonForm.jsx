
const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.function}>
        {props.data.map((value, i) => (
            <div key={i}>
            {props.texts[i]}: <input value={value} onChange={props.handlers[i]} />
            </div>
        ))}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm