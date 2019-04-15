import React from 'react'

const Navbar = props => {
  return(
    <ul>
      <li onClick={props.handleLogout}>Logout</li>
    </ul>
  )
}

export default Navbar
