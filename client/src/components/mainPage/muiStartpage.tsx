// Кожевников СЮ раздел стартовая страница для главной страницы

import React, { useEffect } from 'react';
import { Card, Typography, Box } from '@mui/material';
import SelectProjectsNew from './selectProjectsNew';
import AddProjects from './projects/muiAddProjects';
import data from '../editPopup/data';


export const MuiStartpage = ({chengedproject}) => {

    // const [popupData, setPopupData] = React.useState(data.object);
    const [projectData, setProjectData] = React.useState("No-project"); //React.useState(data.tree[0]);

    useEffect(() => {
      // console.log(projectData)
      chengedproject(projectData)
    }
    ,[projectData]
  )

    // const [formOpen, setFormOpen] = React.useState(false);  

    // const handleCloseForm = () => {
    // setFormOpen(false);
    // }
    // const handleOpenForm = () => {
    // setFormOpen(true);
    // }

    return (
        <Card sx={{ padding: '10px', margin: '10px' }}>
            <Typography variant="h5" gutterBottom sx={{ flexGrow: 1, textAlign: "center"}}>Стартовая страница</Typography>
            <Box>
             <div className="flex flex-wrap items-center gap-8 ">
               <div className="max-w-7xl py-1 sm:px-6 lg:px-6">
                  <Typography variant="h6" color="colorPrimary" gutterBottom> Открыть </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    <SelectProjectsNew changeState={setProjectData}/>
                  </Typography>
                  {/* <Typography color="textSecondary" gutterBottom> Настроить </Typography> */}
               </div>
               <div className="max-w-7xl py-1 sm:px-6 lg:px-8">
                  <Typography variant="h6" color="colorPrimary" gutterBottom> Создать </Typography>
                  <Typography color="textSecondary" gutterBottom>
                      <AddProjects />
                  </Typography>
                  {/* <Typography color="textSecondary" gutterBottom> Все проекты </Typography> */}
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

// export default MuiStartpage;
