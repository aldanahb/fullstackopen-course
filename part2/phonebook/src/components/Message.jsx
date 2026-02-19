
const ExitMessage = ({message}) => {

    if(message === null) {
        return null
    }
    else {
        const messageStyle = {
            'color': 'green',
            'background': '#9ed29e',
            'fontSize': 15,
            'borderStyle': 'solid',
            'borderRadius': 5,
            'padding': 10,
            'marginBottom': 10
        }

        return (<div style={messageStyle}> {message} </div>)
    }
}

const ErrorMessage = ({message}) => {

    if(message === null) {
        return null
    }
    else {
        const messageStyle = {
            'color': 'red',
            'background': '#e7adab',
            'fontSize': 15,
            'borderStyle': 'solid',
            'borderRadius': 5,
            'padding': 10,
            'marginBottom': 10
        }

        return (<div style={messageStyle}> {message} </div>)
    }

}

export { ExitMessage, ErrorMessage }