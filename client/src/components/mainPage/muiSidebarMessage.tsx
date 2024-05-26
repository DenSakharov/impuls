// Кожевников СЮ сайдбар для вывода всех уведомлений пользователю

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
  BellIcon,
} from '@heroicons/react/24/outline';
//import { ListItemSuffix } from "@material-tailwind/react";
 
export function MuiSidebarMessage() {

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
      {/* <IconButton onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-6 w-6 stroke-2" />
        ) : (
          <Bars3Icon className="h-6 w-6 stroke-2" />
        )}
      </IconButton> */}

      <button
        onClick={openDrawer}
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Drawer anchor={'right'} open={isDrawerOpen} onClose={closeDrawer}>
        <Card sx={{ maxWidth: 300 }}>
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography variant="h5" color="blue-gray">
               История сообщений
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
             Все сообщения
            </ListItem>

            {/* разделитель */}
            <Divider />

         </List>

        </Card>
      </Drawer>
    </>
  );
}

export default MuiSidebarMessage;