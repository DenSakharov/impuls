// Кожевников СЮ страница популярных проектов на StartPage

import React from 'react';
import Box from '@mui/material/Box';
import { Button} from '@mui/material';


export default function ActiveProjects({changeState} : any) {
  return (

    <Box sx={{ flexGrow: 0}}>
        <div><Button variant="text" > АСУ ТП для АЭС МАРС1 </Button></div>
        <div><Button variant="text" > IMS Impulse</Button></div>
    </Box>
  );
}
