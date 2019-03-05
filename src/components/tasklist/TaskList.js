import React, {Component} from 'react'
import './TaskList.scss'
import Task from '../task/Task'
import {ItemTypes} from '../../Constants'
import {DropTarget} from 'react-dnd'

class TaskList extends Component {
  render(){
    const {parentId, 
          completed, 
          hidden, 
          handleClick, 
          handleSingleClickTask, 
          handleDoubleClickTask, 
          deleteTask, 
          id, 
          moveTask} = this.props
    // const {moveTask} = this
    let tasks = this.props.tasks.filter(x => x.parent === parentId)
    let hiddenClass = ''
  
    if (typeof completed !== 'undefined') {
      tasks = tasks.filter(x => x.completed === completed)
    } 
  
    if (typeof hidden !== 'undefined') {
      hiddenClass = hidden ? 'hidden' : ''
    }
  
    tasks = tasks.map((task, i) => { 
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
    
    return this.props.connectDropTarget(
      <ol className={'task-list ' + hiddenClass}>
        { tasks }
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