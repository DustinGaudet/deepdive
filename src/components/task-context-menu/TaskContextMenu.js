import React from 'react'
import { Menu, Item, Separator, Submenu} from 'react-contexify'

const onClick = ({ event, props }) => console.log(event,props);

const TaskContextMenu = ({task, deleteTask}) => (
  <Menu id={'menu_id_' + task.id}>
     <Item onClick={onClick}>Lorem {task.id}</Item>
     <Item onClick={() => deleteTask(task.id)}>Delete</Item>
     <Separator />
     <Item disabled>Dolor</Item>
     <Separator />
     <Submenu label="Foobar">
      <Item onClick={onClick}>Foo</Item>
      <Item onClick={onClick}>Bar</Item>
     </Submenu>
  </Menu>
)

export default TaskContextMenu
