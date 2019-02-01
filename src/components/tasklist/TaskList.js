import React from 'react'
import './TaskList.scss'
import Task from '../task/Task'

const TaskList = props => {
  
  var tasks = props.tasks.filter(x => x.parent === props.parentId)
  var hiddenClass = false

  if (props.hasOwnProperty('completed')) {
    tasks = tasks.filter(x => x.completed === props.completed)
  } 

  if (props.hasOwnProperty('hidden')) {
    hiddenClass = props.hidden ? 'hidden' : ''
  }

  tasks = tasks.map((task) => { 
    return (
      <Task key={task.id} 
            task={task}
            handleClick={props.handleClick} />
    )
  })
  
  return (
    <ol className={'task-list ' + hiddenClass}>
      { tasks }
    </ol>
  )
}

export default TaskList
