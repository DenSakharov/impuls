import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import ListHistory from './listHistory';
import Box from '@mui/material/Box';

function MuiHistoryList () {

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = () => {
     axios
       .get(`http://${window.location.hostname}:3010/history`,
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
      // <Box sx={{ flexGrow: 0 , padding:0, margin:0 }}>
        <div className="flex-wrap items-center gap-8 ">
         {notes && <ListHistory data={notes} />}
         {isError && <div>Ошибка загрузки данных! Обратитесь в тех. поддержку</div>}
        </div>
    //  </Box>
  );
};

export default MuiHistoryList;