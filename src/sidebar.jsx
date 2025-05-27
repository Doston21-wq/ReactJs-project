import React, { useContext } from 'react'
import { useGlobalContext } from './context'
import { FaTimes } from 'react-icons/fa'

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useGlobalContext()

  return (
    <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
      <div className='sidebar-header'>
      <h1>Sidebar</h1>
  
        <button onClick={closeSidebar} className='close-btn'>
          <FaTimes />
        </button> 
      </div>
      
    </aside>
  )
}

export default Sidebar
