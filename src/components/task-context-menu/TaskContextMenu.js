import React from 'react'
import { Menu, Item, Separator, Submenu} from 'react-contexify'

const onClick = ({ event, props }) => console.log(event,props);

const TaskContextMenu = ({id}) => (
  <Menu id={'menu_id_' + id}>
     <Item onClick={onClick}>Lorem {id}</Item>
     <Item onClick={onClick}>Ipsum</Item>
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
