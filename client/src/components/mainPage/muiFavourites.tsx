import React from 'react';
import { Card, Typography, Box } from '@mui/material';

import Knowbase from "./knowbase";
import Todos from "./todos";
import Favorites from "./favorites";

const MuiFavourites: React.FC = () => {
    return (
        <Card sx={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h5" gutterBottom>Избранное</Typography>
            {/* <Typography>&nbsp;</Typography>             */}
            <Box>
             <div className="flex flex-wrap items-center gap-8 ">
                <Favorites />
                <Knowbase />
                <Todos />
             </div>
            </Box>
        </Card>
    );
};

export default MuiFavourites;
