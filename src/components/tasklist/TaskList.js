import React from 'react'
import './TaskList.scss'
import Task from '../task/Task'

const TaskList = ({tasks, parentId, completed, hidden, handleClick, handleSingleClickTask, handleDoubleClickTask, deleteTask}) => {
  
  tasks = tasks.filter(x => x.parent === parentId)
  var hiddenClass = ''

  if (typeof completed !== 'undefined') {
    tasks = tasks.filter(x => x.completed === completed)
  } 

  if (typeof hidden !== 'undefined') {
    hiddenClass = hidden ? 'hidden' : ''
  }

  tasks = tasks.map((task) => { 
    return (
      <Task key={task.id} 
            task={task}
            handleSingleClickTask={handleSingleClickTask} 
            handleDoubleClickTask={handleDoubleClickTask} 
            deleteTask={deleteTask} />
    )
  })
  
  return (
    <ol className={'task-list ' + hiddenClass}>
      { tasks }
    </ol>
  )
}

export default TaskList
