const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((partx) => (
        <Part key={partx.name} name={partx.name} exercises={partx.exercises} />
      ))}
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.subtotals.reduce((acc, x) => acc + x)}</p>
    </>
  )
}

const Exercises3to5 = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total subtotals={course.parts.map((x) => x.exercises)} />
    </div>
  )
}

export default Exercises3to5
