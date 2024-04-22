import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, Container, Divider, Menu, MenuItem } from '@mui/material';
import ProjectDialog from './muiDialog';
import data from '../editPopup/data';

export default function MainFormBar({changeState} : any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [formOpen, setFormOpen] = React.useState(false);
    const [projectData, setProjectData] = React.useState(data.tree[0]);
    const handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleCloseForm = () => {
          setFormOpen(false);
      }
    
      const handleOpenForm = () => {
          setFormOpen(true);
      }

      const changeProps = (value : any) => {
        setProjectData(value)
        changeState(value)
        handleCloseForm()
      }
  return (
    <Box sx={{ flexGrow: 0, backgroundColor: '#157298'}}>
      <AppBar position="static" sx={{backgroundColor: '#147298'}}>
        <Toolbar sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Box
                component="img"
                sx={{
                height: 150,
                width: 150,
                maxHeight: { xs: 50, md: 70 },
                maxWidth: { xs: 50, md: 70 },
                marginRight: '10px',
                }}
                alt="impuls"
                src="./img/logo.png"
            />
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 300}}>
                <Typography variant="h5" component="div" > IMS IMPULS </Typography>
                {/*@nujensait думаю стоит поместить вызов компонента на кнопку которая открывает список проектов на главное странице*/}
                <Button variant="text" onClick={handleOpenForm} sx={{maxHeight: 30,color: 'white'}} > {projectData.name} </Button>
            </Container>
            <Container sx={{display:'flex', alignItems: 'stretch', justifyContent: 'flex-end'}}>
              {/*Заменить группу кнопок на кнопку с выпадющим списком, либо по своему усмотрению @SergeyKozhevnikov*/}
                <ButtonGroup >
                    <Button variant='text' size='large' sx={{color: 'white'}}> Начало </Button>
                    <Button variant='text' size='large' sx={{color: 'white'}}> Мастер поиск </Button>
                    <Button variant='text' size='large' sx={{color: 'white'}}  onMouseOver={handleHover}> Сервисы </Button>
                        <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >       <MenuItem onClick={handleClose}>Проекты и задачи</MenuItem>
                                <MenuItem onClick={handleClose}>История согласований</MenuItem>
                                <MenuItem onClick={handleClose}>Импорт\Экспорт</MenuItem>
                                <MenuItem onClick={handleClose}>Текстовый редактор</MenuItem>
                        </Menu>
                    <Button variant='text' size='large'sx={{color: 'white'}}> Отчеты</Button>
                    <Button variant='text' size='large'sx={{color: 'white'}}> Настройки </Button>
                    <Divider color ='white' orientation="vertical" flexItem />
                    <Button variant='text' size='large'sx={{color: 'white'}} onClick={() => window.open('/userProfile', '_self')}>Профиль</Button>
                    <Button variant='text' size='large'sx={{color: 'white'}}>Выйти </Button>

                </ButtonGroup>
            </Container>
        </Toolbar>
      </AppBar>
      <ProjectDialog formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/>
    </Box>




  );
}