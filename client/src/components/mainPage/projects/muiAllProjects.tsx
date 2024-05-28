import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import ListProjects from './listProjects';

const MuiAllProjectsModal = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const fetchData = () => {
     axios       
       .get(`http://${window.location.hostname}:3010/projects`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
       .then((response) => {
        setIsLoading(false);
        setNotes(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  } 

  return (
    <div>
      <h1>Список проектов</h1>
      {notes && <ListProjects data={notes} />}  
      {isError && <div>Error fetching data.</div>}
    </div>
  );
};
export default MuiAllProjectsModal;