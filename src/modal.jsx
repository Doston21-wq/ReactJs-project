import React, { useRef, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from './context'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import { MdModeEdit } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
const Modal = () => {
  const { isModalOpen, closeModal } = useGlobalContext()
    const titleRef = useRef(null)
  const descRef = useRef(null)
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(storedTasks)
  }, [isModalOpen]) 

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && isModalOpen) {
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isModalOpen])

  const handleSubmit = () => {
    const title = titleRef.current?.value.trim()
    const description = descRef.current?.value.trim()

    if (!title) {
      toast.error('Title kiritilmagan!')
      return
    }

    if (!description) {
      toast.warning('Description kiritilmagan!')
      return
    }

    const newTask = {
      id: Date.now(),
      title,
      description
    }

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || []
    const updatedTasks = [...existingTasks, newTask]
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTasks(updatedTasks) 

    toast.success('Vazifa saqlandi!')

    titleRef.current.value = ''
    descRef.current.value = ''

    closeModal()
  }
const handleDelete = (id) => {
  const updatedTasks = tasks.filter(task => task.id !== id);
  setTasks(updatedTasks);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  toast.success('O/chirildi ');
};




const filteredTasks = tasks.filter(task =>
  task.title.toLowerCase().includes(search.toLowerCase()) ||
  task.description.toLowerCase().includes(search.toLowerCase())
);


  return (
    <>
      <Toaster position="top-center" richColors />
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className='modal-overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='modal-container'
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Vazifa qo'shish</h3>
              <input 
                ref={titleRef}
                className='input-task'
                type="text"
                placeholder="Title"
                autoFocus
              />
              <textarea
                ref={descRef}
                className='input-textarea'
                placeholder="Description"
              />
              <button className='btn' onClick={handleSubmit}>
                Qo'shish
              </button>
              <button className='close-modal-btn' onClick={closeModal}>
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    
      <div className="table-container">
        <h2 className='h2'>Saqlangan Vazifalar</h2>
    <input 
    className='input-task inputt'
     type="search"
     placeholder='search...'
      value={search}
  onChange={(e) => setSearch(e.target.value)}
     /> 
        <table className="task-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>btns</th>
            </tr>
          </thead>
   <tbody>
  {filteredTasks.map((task, index) => (
    <tr key={task.id}>
      <td>{index + 1}</td>
      <td>{task.title}</td>    
      <td>{task.description}</td>
      <td className='tdd'>
        <button className='edit-btn btn'
        >
          <MdModeEdit />
        </button>
        <button
          className="edit-btn btn"
          onClick={() => handleDelete(task.id)}
        >
          <MdAutoDelete />
        </button>
      </td>
    </tr>
  ))}
</tbody>



        </table>
      </div>
    </>
  )
}

export default Modal
