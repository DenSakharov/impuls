// Кожевников СЮ
import React from "react";
import { useState } from "react";
// import { Sidebar } from "flowbite-react";
// import { BiBuoy } from "react-icons/bi";
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import SearchIcon from "@mui/icons-material/Search";
import { Container, InputAdornment, TextField, Card, Typography, IconButton, List, Chip, Accordion, ListItem, Alert, Input, Drawer, Divider } from '@mui/material';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';

import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
//import { ListItemSuffix } from "@material-tailwind/react";
 
export function MuiSidebar() {

  const [open, setOpen] = React.useState(0);

  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <IconButton onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-6 w-6 stroke-2" />
        ) : (
          <Bars3Icon className="h-6 w-6 stroke-2" />
        )}
      </IconButton>

      <Drawer anchor={'right'} open={isDrawerOpen} onClose={closeDrawer}>
        <Card sx={{ maxWidth: 300 }}>
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Настройки
            </Typography>
          </div>
          
          <div className="p-2">
            <TextField id="search" type="search" label="Search" value={searchTerm} 
            onChange={handleChange} sx={{ width: 290 }} InputProps={{
              endAdornment: (
                 <InputAdornment position="end">
                 <SearchIcon />  
                 </InputAdornment> 
                 ), 
            }}
            />  
          </div>        
         {/* разделитель */}
         <Divider />

         <List>
            <ListItem>              
              Основные                              
            </ListItem> 
            
            <ListItem>              
              Фильтр
            </ListItem>

            <ListItem>              
             Вид
            </ListItem>

            {/* разделитель */}
            <Divider /> 

            <ListItem>
            Доступ
              <ListItem>
                <UsersIcon className="h-4 w-4" />
              </ListItem>             
            </ListItem>
         </List>   

        {/* информационное окно    */}
          <Alert
            // open={openAlert}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Доступные обновления
            </Typography>
            <Typography variant='subtitle2' className="font-normal opacity-80">
              Доступны новые измения в моделе данных, рекомендуется обновить объекты и другие компоненты проекта.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                // as="a"
                // href="#"
                variant="subtitle2"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Отменить
              </Typography>
              <Typography
                // as="a"
                // href="#"
                variant="subtitle2"
                className="font-medium"
              >
                Обновить
              </Typography>
            </div>
          </Alert>


        </Card>
      </Drawer>
    </>
  );
}

export default MuiSidebar;