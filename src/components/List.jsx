import React, { useState, useEffect } from 'react';

export default function List(props) {
  const { url } = props;
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try { 
        const response = await fetch(`${url}users.json`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log('List.js: ', response);
        const data = await response.json();
        setList(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const handleClick = (id) => {
    setList(prevList => prevList.map((item) => {
      let activeItem = false;
      if (item.id === id) {
        activeItem = true;
      }
      return {
        id: item.id,
        name: item.name,
        active: activeItem,
      };
    }));
    props.onClickItem(id);
  };

  return (
    <>
      {isLoading && <p className="loading">Loading...</p>}
      <ul>
        {list.map((item) => <li key={item.id} onClick={() => handleClick(item.id)} className={item.active ? 'active' : ''}>
          {item.name}
        </li>)}
      </ul>
    </>
  );
}
