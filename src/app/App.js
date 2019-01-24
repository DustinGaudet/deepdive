import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.scss';

class App extends Component {
  state = {
    tasks: [
      { name: "Turn into React components", subtasks: [{name: "be a good person"}, {name: "be a better person"}, {name: "be the best person"}] },
      { name: "Drag / drop reorder", subtasks: [{name: "be a good person"}] },
      { name: "Add tasks via input field", subtasks: [{name: "be a good person"}] },
      { name: "Right click handling", subtasks: [{name: "be a good person"}] },
      { name: "Delete via right click", subtasks: [{name: "be a good person"}] },
      { name: "Task editor panel", subtasks: [{name: "be a good person"}] },
      { name: "open edit panel on single click", subtasks: [{name: "be a good person"}] },
      { name: "close edit panel", subtasks: [{name: "be a good person"}] },
      { name: "change the open panel on task click", subtasks: [{name: "be a good person"}] },
      { name: "Edit title in panel on dblclk", subtasks: [{name: "be a good person"}] },
      { name: "Complete task on checkbox click", subtasks: [{name: "be a good person"}] },
      { name: "Add a toggle for completed list", subtasks: [{name: "be a good person"}] },
      { name: "Add completed list", subtasks: [{name: "be a good person"}] },
      { name: "Uncomplete task", subtasks: [{name: "be a good person"}] },
      { name: "Edit completed task", subtasks: [{name: "be a good person"}] },
    ],
    activeTaskId: 0
  };

  makeTaskEl = (task, i) => <li key={"task-" + i}><span className="checkbox"></span>{task.name}</li>;

  renderTaskList = tasks => <ol className="task-list">{ tasks.map( this.makeTaskEl ) }</ol>;

  render() {
    return (
      <div className="App">
        <div className="task-panels">
          <div className="tasks-panel">
            <h2>my new list</h2>
            <div className="tasks-manager">
              <input id="task-add" placeholder="+ Add a task..."  />
              {this.renderTaskList(this.state.tasks)}
            </div>
          </div>
          <div className="task-panel">
            <input className="task-name checkbox" value="Task name goes here" />
            <input placeholder="Set due date" />
            <input placeholder="Remind me" />
            <div className="container-subtask">
              {this.renderTaskList(this.state.tasks[this.state.activeTaskId].subtasks)}
              <input className="add-subtask" placeholder="+ Add a subtask" />
            </div>
            <textarea className="add-note" placeholder="Add a note..." />
            <input placeholder="Add a file" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
