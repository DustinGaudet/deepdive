import React, {Component} from 'react'
import './TaskList.scss'
import Task from '../task/Task'
import {ItemTypes} from '../../Constants'
import {DropTarget} from 'react-dnd'

class TaskList extends Component {

  renderTasks = ({handleClick, handleSingleClickTask, handleDoubleClickTask, deleteTask, id, moveTask, tasks, shouldReorder}) => {
    return tasks.map((task, i) => { 
      return (
        <Task key={task.id} 
              index={i}
              listId={id}
              {...{task, 
                moveTask,
                handleClick, 
                handleSingleClickTask, 
                handleDoubleClickTask, 
                deleteTask}} />
      )
    })
  }

  render(){
    let hiddenClass = ''
  
    if (typeof this.props.hidden !== 'undefined') {
      hiddenClass = this.props.hidden ? 'hidden' : ''
    }
    
    return this.props.connectDropTarget(
      <ol className={'task-list ' + hiddenClass}>
        { this.renderTasks(this.props) }
      </ol>
    )
  }
}

const taskTarget = {
  drop(props, monitor, component) {
    const {id} = props
    return {
      listId: id
    }
  }
}

export default DropTarget(ItemTypes.TASK, taskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))(TaskList)