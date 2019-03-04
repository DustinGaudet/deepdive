import React from 'react'
import TaskList from '../tasklist/TaskList'
import NewTaskInput from '../new-task-input/NewTaskInput'
import TextArea from '../text-area/TextArea'

const TaskPanel = ({activeTask, 
                    updateTaskName, 
                    handleCheckboxClick, 
                    tasks, 
                    deleteTask, 
                    handleNewTaskSubmit, 
                    activeTaskId, 
                    closeTaskPanel, 
                    taskCreatedCompleted, 
                    createCompleteDate}) => (
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
                  parentId={activeTaskId} 
                  deleteTask={deleteTask} />
        <NewTaskInput handleEnterPress={handleNewTaskSubmit} 
                      parentId={activeTaskId} />
      </div>
      <TextArea className="add-note" placeholder="Add a note..." defaultValue={activeTask.note} />
    </div>
    <div><p><button onClick={closeTaskPanel}>></button> {taskCreatedCompleted + createCompleteDate}</p></div>
  </div>
)

export default TaskPanel
