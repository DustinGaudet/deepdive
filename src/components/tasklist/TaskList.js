import React from 'react'
import { MenuProvider } from 'react-contexify'
import './TaskList.scss'
import Task from '../task/Task'
import TaskContextMenu from '../task-context-menu/TaskContextMenu'

const TaskList = ({tasks, parentId, completed, hidden, handleClick, handleSingleClickTask, handleDoubleClickTask}) => {
  
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
      <>
        <MenuProvider key={task.id} id={"menu_id_" + task.id}>
          <Task key={task.id} 
                task={task}
                handleClick={handleClick}
                handleSingleClickTask={handleSingleClickTask} 
                handleDoubleClickTask={handleDoubleClickTask} />
        </MenuProvider>
        <TaskContextMenu id={task.id} />
      </>
    )
  })
  
  return (
    <ol className={'task-list ' + hiddenClass}>
      { tasks }
    </ol>
  )
}

export default TaskList
