// Кожевников СЮ раздел стартовая страница для главной страницы

import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import SelectProjectsNew from './selectProjectsNew';
import AddProjects from './projects/muiAddProjects';
import { tProjectAttributes } from '#/dtos';

export type MuiStartpageProps = {
  projects: tProjectAttributes[],
  changeProject: (project: tProjectAttributes | null) => void
}
const MuiStartpage = ({projects, changeProject}: MuiStartpageProps) => {

    return (
        <Card sx={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h5" gutterBottom sx={{ flexGrow: 1, textAlign: "center"}}>Стартовая страница</Typography>
            <Box>
             <div className="flex flex-wrap items-center gap-8 ">
               <div className="max-w-7xl py-1 sm:px-6 lg:px-6">
                  <Typography variant="h6" color="colorPrimary" gutterBottom> Открыть </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {projects.length > 0 &&<SelectProjectsNew changeState={changeProject} projects={projects}/>}
                  </Typography>
               </div>
               <div className="max-w-7xl py-1 sm:px-6 lg:px-8">
                  <Typography variant="h6" color="colorPrimary" gutterBottom> Создать </Typography>
                  <Typography color="textSecondary" gutterBottom>
                      <AddProjects />
                  </Typography>
                  
                </div>
                <div className="max-w-7xl py-1 sm:px-6 lg:px-8">
                 <Typography variant="h6" color="colorPrimary" gutterBottom> Популярные </Typography>
                 <Typography color="textSecondary" gutterBottom> АСУ ТП для АЭС МАРС1 </Typography>
                 <Typography color="textSecondary" gutterBottom> Ледокол Иван Сусанин </Typography>
                </div>
             </div>
            </Box>
        </Card>
    );
};

export default MuiStartpage;
