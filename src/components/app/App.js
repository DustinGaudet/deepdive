import React, { Component } from 'react'
import 'react-contexify/dist/ReactContexify.min.css';
// import logo from '../logo.svg'
import './App.scss'
import NewTaskInput from '../new-task-input/NewTaskInput'
import TaskList from '../tasklist/TaskList'
import TaskListPanel from '../tasklist-panel/TaskListPanel'
import TextArea from '../text-area/TextArea'
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
          enterPressWrap} = this
    const {tasks, activeTaskId} = state
    const activeTask = this.getTaskById(state.activeTaskId)
    const detailsOpen = state.detailsOpen ? "details-open" : "details-closed"
    const taskCreatedCompleted = activeTask.completed ? "Completed " : "Created "
    const createCompleteDate = activeTask.completed ? activeTask.completedDateTime : activeTask.createdDate

    return (
      <div className="App">
        <div className={"task-panels " + detailsOpen}>
          <div className="tasks-panel">
            <h2>{state.taskListName}</h2>
            <TaskListPanel>
              <NewTaskInput handleEnterPress={handleNewTaskSubmit} parentId={1} />
              <TaskList handleClick={handleCheckboxClick} 
                        handleSingleClickTask={handleSingleClickTask} 
                        handleDoubleClickTask={handleDoubleClickTask} 
                        tasks={tasks} 
                        parentId={1} 
                        completed={false} />
              <button onClick={this.toggleCompletedList} >Show / Hide Completed tasks</button>
              <TaskList hidden={state.hideCompletedTasks} 
                        handleClick={handleCheckboxClick} 
                        handleSingleClickTask={handleSingleClickTask} 
                        handleDoubleClickTask={handleDoubleClickTask} 
                        tasks={tasks} 
                        parentId={1} 
                        completed={true} />
            </TaskListPanel>
          </div>
          <div className="task-panel">
            <input value={activeTask.name} 
                   onBlur={updateTaskName}
                   onChange={updateTaskName}
                   className="task-name checkbox" />
            <div className="details">  
              <input placeholder="Set due date" defaultValue={activeTask.due} />
              <div className="container-subtask">
                <TaskList handleClick={handleCheckboxClick} 
                          tasks={tasks} 
                          parentId={activeTaskId} />
                <NewTaskInput handleEnterPress={handleNewTaskSubmit} 
                              parentId={activeTaskId} />
              </div>
              <TextArea className="add-note" placeholder="Add a note..." defaultValue={activeTask.note} />
            </div>
            <div><p><button onClick={closeTaskPanel}>></button> {taskCreatedCompleted + createCompleteDate}</p></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
