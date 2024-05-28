// Кожевников СЮ компонет избранное для стартовой страницы

import React from 'react';
import { Card, Typography, Box } from '@mui/material';

import Knowbase from "./knowbase";
import Todos from "./todos";
import Favorites from "./favorites";

const MuiFavourites: React.FC = () => {
    return (

        <Card sx={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h5" gutterBottom sx={{ flexGrow: 1, textAlign: "center"}}>Избранное</Typography>
            <Box>
             <div className="flex flex-wrap items-center gap-8 ">
               <div className="max-w-7xl py-0 sm:px-0 lg:px-0">
               <Favorites />
               </div>
               <div className="max-w-7xl py-0 sm:px-0 lg:px-0">
               <Knowbase />
                </div>
                <div className="max-w-7xl py-0 sm:px-0 lg:px-0">
                <Todos />
                </div>
             </div>
            </Box>
        </Card>
        );
};

export default MuiFavourites;
