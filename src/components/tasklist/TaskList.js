import React from 'react';
import './TaskList.scss';
import Task from '../task/Task';

const TaskList = props => {
  const makeTaskEl = (task) => <Task key={task.id} completionState={task.completed} taskId={task.id} name={task.name} />;
  var tasks = props.tasks.filter(x => x.parent === props.parentId);

  if (props.hasOwnProperty("completed")) {
    tasks = tasks.filter(x => x.completed === props.completed)
  } 

  return (
    <ol className="task-list">
      { tasks.map( makeTaskEl ) }
    </ol>
  )
}

export default TaskList;
