import React, { Component } from 'react';
// import logo from '../logo.svg';
import './App.scss';

class App extends Component {
  // add more task details to tasks in state
  state = {
    taskListName: "my new list",
    tasks: [
      { 
        name: "Turn into React components", 
        subtasks: [{name: "be a good person"}, {name: "be a better person"}, {name: "be the best person"}], 
        due: "Jan. 21",
        note: "This is a cool note yup woohoo."
      },
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

  // add a new task
  createTask = (e, name) => this.setState({tasks: [{name: name, subtasks: [], due: "", note: ""}].concat(this.state.tasks)});

  // reroute submission
  handleTaskSubmit = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log(e.target.value);
    this.createTask(e, e.target.value);
    }
  }

  // check a task off as done, changes state and checkbox display

  // right click to delete a task

  // toggle "completed tasks" list

  // open detail panel if not open

  // close detail panel on click, if open

  // edit task name in real time

  // add a subtask

  // two-way binds an input or text area to its property in state

  // clicking a task selects it (note detail panel should display selected task)

  // drag and drop to reorder tasks

  // capture the task creation date / time and store for display in detail panel

  // This can become a "Task" component - tasks list will flow in through parent props
  makeTaskEl = (task, i) => <li key={"task-" + i}><span className="checkbox"></span>{task.name}</li>;

  // This will go into the TaskList component and will use the "Task" component
  renderTaskList = tasks => <ol className="task-list">{ tasks.map( this.makeTaskEl ) }</ol>;

  render() {

    const {renderTaskList, handleTaskSubmit, state} = this;
    const {tasks, taskListName, activeTaskId} = state;

    return (
      <div className="App">
        {/* This can become a "TaskPanels component" */}
        <div className="task-panels">
          {/* This can become a "TasklistPanel" component */}
          <div className="tasks-panel">
            <h2>{taskListName}</h2>
            <div className="tasks-manager">
              <input id="task-add" onKeyPress={handleTaskSubmit} placeholder="+ Add a task..."  />
              {/* This can become a "TaskList" component */}
              {renderTaskList(tasks)}
            </div>
          </div>
          {/* this can become a "TaskDetailPanel" component" */}
          <div className="task-panel">
            {/* determine whether inputs that save while typing should be moved to separate components */}
            {/* on these components' rerender, need to pass them their data in props and explicitly set their value with js (Not with a value attr)  */}
            <input className="task-name checkbox" defaultValue={tasks[activeTaskId].name} />
            <input placeholder="Set due date" defaultValue={tasks[activeTaskId].due} />
            <div className="container-subtask">
              {/* This can also be a TaskList component */}
              {renderTaskList(tasks[activeTaskId].subtasks)}
              <input className="add-subtask" placeholder="+ Add a subtask" />
            </div>
            {/* would be nice to make a reusable auto-resize component */}
            <textarea className="add-note" placeholder="Add a note..." value={tasks[activeTaskId].note} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
