const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(({name, exercises, id}) =>
        <Part key={id} name={name} exercises={exercises} />
      )}
    </div>
  )
}

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Total = ({parts}) => {
  console.log(parts)
  const total = parts.reduce((acc, part) => {
    console.log(acc)
    return acc + part.exercises
  }, 0)

  return (
    <p>Number of exercises {total}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course
