// Кожевников СЮ Страница для расширенного поиска

import React, { useState, useEffect } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {DataGrid} from '@mui/x-data-grid';
import SearchResult from '../search/searchResult'
import axios, { AxiosError, AxiosResponse } from "axios";

function Searchpage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  <Card sx={{ padding: '20px', margin: '20px' }}>           
   <Box  style={{ textAlign: 'center' }}>    
      <Typography variant="h5"  gutterBottom> Расширенный поиск</Typography>
      <Container maxWidth="md" sx={{ mt: 5 }}>

      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}        
        onChange={handleChange}
        sx={{ width: 300 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        />
      </Container>     

      <Container maxWidth="md" sx={{ mt: 5 }}>

      <div className="flex-wrap items-center gap-8 ">
         {notes && <SearchResult data={notes} />}
         {isError && <div>Ошибка загрузки данных! Обратитесь в тех. поддержку</div>}
        </div>
      

      </Container>     

   </Box>
  </Card>
  );
}


export default Searchpage;