import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useGlobalContext } from './context';
import { FaPlus } from "react-icons/fa";
function Home() {
  const { OpenModal, OpenSidebar } = useGlobalContext();

  return (
    <main>
      <button onClick={OpenSidebar} className='show-toggle'>
        <FaBars />
      </button>
      <button onClick={OpenModal} className='btn add'>Task qushish <FaPlus /></button>
    </main>
  );
}

export default Home;
