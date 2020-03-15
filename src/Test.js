import React from 'react'
import useMouse from 'react-hook-mouse'
 
const displayCoordinates = (mouse) => mouse.position ? mouse.position.page.x : ""
 
const displayFlag = flag => flag ? 'Yes' : 'No'
 
const ComponentWithMouse = () => {
  const mouse = useMouse()
 
  return (
    <ul>
      <li>
        Mouse position in viewport:
        {displayCoordinates(mouse)}
      </li>
    </ul>
  )
}

export default ComponentWithMouse