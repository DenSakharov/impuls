import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const MuiStartpage: React.FC = () => {
    return (
        <Card sx={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h5" gutterBottom>Стартовая страница</Typography>            
            <Box>
             <div className="flex flex-wrap items-center gap-8 ">
               <div className="max-w-7xl py-1 sm:px-6 lg:px-6">                
                  <Typography variant="h6" color="colorPrimary" gutterBottom> Открыть </Typography>
                  <Typography color="textSecondary" gutterBottom> Открыть существующий проект </Typography>                  
                  <Typography color="textSecondary" gutterBottom> Настройки подключения </Typography>
               </div>
               <div className="max-w-7xl py-1 sm:px-6 lg:px-8">
                  <Typography variant="h6" color="colorPrimary" gutterBottom> Создать </Typography>
                  <Typography color="textSecondary" gutterBottom> Создать новый проект </Typography>
                  <Typography color="textSecondary" gutterBottom> Управление проектами </Typography>
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
