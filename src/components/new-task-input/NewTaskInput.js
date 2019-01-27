import React from 'react';
import './NewTaskInput.scss';

const NewTaskInput = props => {
  return (
    <input className="task-add" 
           placeholder="+ Add a task..." 
           onKeyPress={(e) => props.handleEnterPress(e, e.target.value, props.parentId)} />
  );
}

export default NewTaskInput;
