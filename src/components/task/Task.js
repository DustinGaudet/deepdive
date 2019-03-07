import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import './Task.scss'
import { contextMenu } from 'react-contexify'
import TaskContextMenu from '../task-context-menu/TaskContextMenu'
import { DragSource, DropTarget } from 'react-dnd'
import {ItemTypes} from '../../Constants'

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
    const {task, handleClick, deleteTask, isDragging, connectDragSource, connectDropTarget} = this.props
    const opacity = isDragging ? 0 : 1
    const completionState = task.completed ? 'completed' : 'incomplete'
    const onContextMenu = (e) => this.handleContextMenu(e, task.id)
    const onClick = (e) => handleClick(e, task)
    const {handleSingleOrDoubleClick} = this

    const liPropsObj = {
      className: 'task ' + completionState,
      style: { opacity },
      onClick: handleSingleOrDoubleClick,
      onContextMenu,
    }
    
    const spanPropsObj = {
      className: 'checkbox ' + completionState,
      onClick
    }

    return (
      <>
        {connectDragSource(connectDropTarget(
          <li {...liPropsObj}>
            <span {...spanPropsObj}></span>
            {task.name}
          </li>
        ))}
        <TaskContextMenu {...{task, deleteTask}} />                 
      </>
    )
  }
}

const taskSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      task: props.task
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if(dropResult && dropResult.listId !== item.listId) {
      // props.removeTask(item.index)
    }
  }
}

const taskTarget = {
  hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index
    const sourceListId = monitor.getItem().listId	
    console.log(dragIndex, hoverIndex)

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		if ( props.listId === sourceListId ) {
			props.moveTask(dragIndex, hoverIndex, props.shouldReorder)

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex
		}		
	}
}

const dropTarget = DropTarget(ItemTypes.TASK, taskTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Task)

export default DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(dropTarget)
