import React from 'react'
import './Task.scss'

const Task = ({task, handleClick}) => {
  const completionState = task.completionState ? 'completed' : 'incomplete'
  return (
    <li className='task'>
      <span className={'checkbox ' + completionState} onClick={(e) => handleClick(e, task)}></span>{task.name}
    </li>
  )
}

export default Task
