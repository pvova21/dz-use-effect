import React, { useState, useEffect } from 'react';

export default function Details(props) {
  const {url, dataId } = props;
  const [details, setDetails] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${dataId}.json`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log('Details.js: ', data);
        setDetails(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataId, url]);

  return (
    <>
      {isLoading && <div className='loading_progress'>
        <progress/>
      </div>}
      {details && <div id={details.id} className="details">
        <img alt='avatar_image' src={details.avatar} />
        <p className="name">{details.name}</p>
        <p>City: {details.details.city}</p>
        <p>Company: {details.details.company}</p>
        <p>Position: {details.details.position}</p>
      </div>}
    </>
  );
}
