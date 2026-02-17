
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
       <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part,i) =>
        <Part key={i} part={part}/>
       ) 
      }
    </div>
  )
}

const Total = ({parts}) => {

  return(
   <div>
      <p><strong>{"total of "} {parts.reduce((sum, part) => sum + part.exercises, 0)} {" exercises"}</strong></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default Course