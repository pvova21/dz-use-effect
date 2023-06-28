import React, { useState } from 'react';
import './App.css';
import List from './components/List';
import Details from './components/Details';

export default function App() {
  const url = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/';
  const [currentId, setCurrentId] = useState();

  const handleClick = (id) => {
    if (currentId !== id) {
      setCurrentId(id);
    }
  }

  return (
    <>
      <List url={url} onClickItem={handleClick} />
      {currentId && <Details url={url} dataId={currentId}/>}
    </>
  );
}
