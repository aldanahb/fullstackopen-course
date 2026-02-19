
const Message = ({message}) => {
    if(message === null) return null
    else return(<p>{message}</p>)
}

export default Message