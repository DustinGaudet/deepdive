import React, { Component } from 'react'
// import logo from '../logo.svg'
import './App.scss'
import NewTaskInput from '../new-task-input/NewTaskInput'
import TaskList from '../tasklist/TaskList'
import TaskListPanel from '../tasklist-panel/TaskListPanel'
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
  
  addTask = (e, name, parent) => {
    this.enterPressWrap(e, () => {      
      const id = this.state.newTaskId
      const newTask = { id, name, parent, completed: false}
      const newTaskId = id + 1
      this.setState({newTaskId, tasks: [newTask].concat(this.state.tasks)})
      e.target.value = ""
    })
  }

  // handleCheckboxClick = (e, id) => {
  handleCheckboxClick = (e, task) => {
    e.preventDefault()
    this.setState({tasks: this.state.tasks.map(x => x.id !== task.id ? x : {...task, completed: !task.completed})})
  }

  getTaskById = id => this.state.tasks.filter(x => x.id === id)[0]

  toggleCompletedList = () => this.setState({hideCompletedTasks: !this.state.hideCompletedTasks})

  render() {
    const {state, addTask, handleCheckboxClick} = this
    const {tasks, activeTaskId} = state
    const activeTask = this.getTaskById(state.activeTaskId)

    return (
      <div className="App">
        <div className="task-panels">
          <div className="tasks-panel">
            <h2>{state.taskListName}</h2>
            <TaskListPanel>
              <NewTaskInput handleEnterPress={addTask} parentId={1} />
              <TaskList handleClick={handleCheckboxClick} tasks={tasks} parentId={1} completed={false} />
              <button onClick={this.toggleCompletedList} >Show / Hide Completed tasks</button>
              <TaskList hidden={state.hideCompletedTasks} handleClick={handleCheckboxClick} tasks={tasks} parentId={1} completed={true} />
            </TaskListPanel>
          </div>
          <div className="task-panel">
            <input className="task-name checkbox" defaultValue={activeTask.name} />
            <input placeholder="Set due date" defaultValue={activeTask.due} />
            <div className="container-subtask">
              <TaskList handleClick={handleCheckboxClick} tasks={tasks} parentId={activeTaskId} />
              <NewTaskInput handleEnterPress={addTask} parentId={activeTaskId} />
            </div>
            <textarea className="add-note" placeholder="Add a note..." defaultValue={activeTask.note} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
