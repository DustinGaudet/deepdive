import React from 'react';
import './TaskListPanel.scss';

const TaskListPanel = props => {
  return (
    <div className="tasks-manager">
      { props.children }
    </div>
  );
}

export default TaskListPanel;
