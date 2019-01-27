import React, { Component } from 'react';
// import logo from '../logo.svg';
import './App.scss';
import NewTaskInput from '../new-task-input/NewTaskInput';
import TaskList from '../tasklist/TaskList';
import TaskListPanel from '../tasklist-panel/TaskListPanel';
import dummyState from '../../dummyState.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = dummyState;
  }

  enterPressWrap = (e, callback) => {
    if (e.key === "Enter") {
      console.log("test");
      e.preventDefault();
      callback();
    }
  }
  
  addTask = (e, name, parent) => {
    this.enterPressWrap(e, () => {      
      const id = this.state.newTaskId;
      const newTask = { id, name, parent, completed: false};
      const newTaskId = id + 1;
      this.setState({newTaskId, tasks: [newTask].concat(this.state.tasks)})
      e.target.value = "";
    });
  };

  // this will shuffle order of tasks until a more elegant solution is found.
  // is also unnecessarily expensive as it filters the entire task list twice
  // consider utilizing a functional library? Or just pertinent functions?
  handleCheckboxClick = (e, id) => {
    e.preventDefault();
    const task = this.getTaskById(id)[0];
    const updatedTask = {...task, completed: !task.completed};
    const otherTasks = this.state.tasks.filter(x => x.id !== id);
    this.setState({tasks: [updatedTask].concat(otherTasks)})
  };

  getTaskById = id => this.state.tasks.filter(x => x.id === id);

  render() {
    const {state, addTask} = this;
    const {tasks, activeTaskId} = state;
    const activeTask = this.getTaskById(state.activeTaskId)[0];
    return (
      <div className="App">
        <div className="task-panels">
          <div className="tasks-panel">
            <h2>{state.taskListName}</h2>
            <TaskListPanel>
              <NewTaskInput handleEnterPress={addTask} parentId="1" />
              <TaskList handleClick={this.handleCheckboxClick} tasks={tasks} parentId="1" completed={false} />
              <TaskList handleClick={this.handleCheckboxClick} tasks={tasks} parentId="1" completed={true} />
            </TaskListPanel>
          </div>
          <div className="task-panel">
            <input className="task-name checkbox" defaultValue={activeTask.name} />
            <input placeholder="Set due date" defaultValue={activeTask.due} />
            <div className="container-subtask">
              <TaskList handleClick={this.handleCheckboxClick} tasks={tasks} parentId={activeTaskId} />
              <NewTaskInput handleEnterPress={addTask} parentId={activeTaskId} />
            </div>
            <textarea className="add-note" placeholder="Add a note..." defaultValue={activeTask.note} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
