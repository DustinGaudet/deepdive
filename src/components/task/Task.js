import React, { Component } from 'react'
import './Task.scss'
import { contextMenu } from 'react-contexify'
import TaskContextMenu from '../task-context-menu/TaskContextMenu'

class Task extends Component {
  state = {
    timer: 0
  }

  handleSingleOrDoubleClick = (e) => {

    e.preventDefault()
    if (e.target === e.currentTarget && this.props.task.parent === 1) {
      this.setState({timer: 1})

      console.log(this.state.timer)    
  
      if (this.state.timer) {
        this.props.handleDoubleClickTask()
        // clearTimeout(timer)
        clearTimeout(this.state.timer)
        this.setState({timer: 0})
        console.log(this.state.timer)
      } else {
        this.props.handleSingleClickTask(this.props.task)
        const intervalId = setTimeout(() => {
          clearTimeout(this.state.timer)
          this.setState({timer: 0})
        }, 200)
        this.setState({timer: intervalId})
      }
    }
  }

  handleContextMenu = (e, menuId) => {
    e.preventDefault()
    contextMenu.show({
      id: "menu_id_" + menuId,
      event: e,
    });
  }
          

  render () {
    const {task, handleClick, deleteTask} = this.props
    const completionState = this.props.task.completed ? 'completed' : 'incomplete'
    
    return (
      <>
        <li onContextMenu={(e) => this.handleContextMenu(e, task.id)} className={'task ' + completionState} onClick={this.handleSingleOrDoubleClick}>
          <span className={'checkbox ' + completionState} onClick={(e) => handleClick(e, task)}></span>{task.name}
        </li>
        <TaskContextMenu task={task} 
                        deleteTask={deleteTask} />
      </>
    )
  }
}

export default Task
