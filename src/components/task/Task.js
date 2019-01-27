import React from 'react';
import './Task.scss';

const Task = props => {
  let completionState = props.completionState ? "completed" : "incomplete";
  return (
    <li className="task">
      {/* <span onClick={props.handleClick(props.taskId)} className={"checkbox " + completionState}></span>{props.name} */}
      <span className={"checkbox " + completionState} onClick={(e) => props.handleClick(e, props.taskId )}></span>{props.name}
    </li>
  );
}

export default Task;
