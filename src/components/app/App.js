import React, { Component } from 'react'
import 'react-contexify/dist/ReactContexify.min.css'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// import logo from '../logo.svg'
import './App.scss'
import NewTaskInput from '../new-task-input/NewTaskInput'
import TaskList from '../tasklist/TaskList'
import TaskListPanel from '../tasklist-panel/TaskListPanel'
import TaskPanel from '../task-panel/TaskPanel'
import dummyState from '../../dummyState.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = dummyState
  }

  enterPressWrap = (e, callback) => {
    if (e.key === "Enter") {
      e.preventDefault()
      callback()
    }
  }

  // this is messy, should untangle later
  handleNewTaskSubmit = (e, name, parent, callback) => {
    this.addTask(e, name, parent)
    this.enterPressWrap(e, callback)
  }

  // addTask should be more basic and not contain the enterPressWrap
  addTask = (e, name, parent) => {
    this.enterPressWrap(e, () => {      
      const id = this.state.newTaskId
      const newTask = { id, name, parent, completed: false, createdDate: new Date()}
      const newTaskId = id + 1
      this.setState({newTaskId, tasks: [newTask].concat(this.state.tasks)})
    })
  }

  deleteTask = (taskId) => this.setState((prevState) => ({tasks: prevState.tasks.filter(x => x.id !== taskId)}))

  updateTask = (id, newTask) => this.setState((prevState) => ({tasks: prevState.tasks.map((x) => x.id === id ? newTask : x)}) )

  updateTaskName = (e) => {
    const id = this.state.activeTaskId
    const oldTask = this.getTaskById(id)
    this.updateTask(id, {...oldTask, name: e.target.value})
  }

  handleCheckboxClick = (e, task) => {
    e.preventDefault()
    const completedDateTime = (!task.completed) ? new Date() : ''
    this.updateTask(task.id, {...task, completed: !task.completed, completedDateTime})
  }

  handleSingleClickTask = (task) => {
    this.setState({activeTaskId: task.id})
  }

  handleDoubleClickTask = () => {
    this.setState({detailsOpen: true})
  }

  closeTaskPanel = () => {
    this.setState({detailsOpen: false})
  }

  getTaskById = id => this.state.tasks.filter(x => x.id === id)[0]

  toggleCompletedList = () => this.setState({hideCompletedTasks: !this.state.hideCompletedTasks})

  render() {
    const {state, 
          handleNewTaskSubmit, 
          handleCheckboxClick, 
          handleSingleClickTask, 
          handleDoubleClickTask, 
          closeTaskPanel, 
          updateTaskName, 
          enterPressWrap,
          deleteTask} = this
    const {tasks, activeTaskId} = state
    var taskPanel
    if (activeTaskId) {
      const activeTask = this.getTaskById(state.activeTaskId)
      const taskCreatedCompleted = activeTask && activeTask.completed ? "Completed " : "Created "
      const createCompleteDate = activeTask.completed ? activeTask.completedDateTime : activeTask.createdDate  
      taskPanel = <TaskPanel {...{activeTask,
                                  updateTaskName,
                                  handleCheckboxClick,
                                  tasks,
                                  deleteTask,
                                  handleNewTaskSubmit,
                                  activeTaskId,
                                  closeTaskPanel,
                                  taskCreatedCompleted,
                                  createCompleteDate}} />
    }
    const detailsOpen = state.detailsOpen ? "details-open" : "details-closed"

    return (
      <div className="App">
        <div className={"task-panels " + detailsOpen}>
          <div className="tasks-panel">
            <h2>{state.taskListName}</h2>
            <TaskListPanel>
              <NewTaskInput handleEnterPress={handleNewTaskSubmit} parentId={1} />
              <TaskList handleClick={handleCheckboxClick} 
                        {...{handleSingleClickTask, handleDoubleClickTask}} 
                        tasks={tasks} 
                        parentId={1} 
                        completed={false} 
                        deleteTask={deleteTask} />
              <button onClick={this.toggleCompletedList} >Show / Hide Completed tasks</button>
              <TaskList hidden={state.hideCompletedTasks} 
                        handleClick={handleCheckboxClick} 
                        {...{handleSingleClickTask, handleDoubleClickTask}}
                        tasks={tasks} 
                        parentId={1} 
                        completed={true} 
                        deleteTask={deleteTask} />
            </TaskListPanel>
          </div>
          {taskPanel}
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
