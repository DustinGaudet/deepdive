import React, { Component } from 'react'
import './Task.scss'

class Task extends Component {
  state = {
    timer: 0
  }

  handleSingleOrDoubleClick = (e) => {

    e.preventDefault()

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

  render () {
    const {task, handleClick} = this.props
    const completionState = this.props.task.completionState ? 'completed' : 'incomplete'
    
    return (
      <li className='task' onClick={this.handleSingleOrDoubleClick}>
        <span className={'checkbox ' + completionState} onClick={(e) => handleClick(e, task)}></span>{task.name}
      </li>
    )
  }
}

export default Task
