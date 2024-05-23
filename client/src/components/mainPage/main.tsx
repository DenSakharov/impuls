import  React  from 'react';
import './../../globals.css';
import {Container} from '@mui/system';
import { Dialog } from '@mui/material';
import BreadcrumbNew from "./breadcrumb";
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import data from '../editPopup/data';
import MuiPopup from '../muiPopup/muiPopup';
import SelectProjects from './selectProjects';
import MainFooter from './mainFooter';
import MuiNews from "./muiNews";
import MuiDashboard from "./muiDashboard";
import MuiStartpage from './muiStartpage';
import MuiFavourites from './muiFavourites';
import { Sidebar } from 'flowbite-react';
import { IconButton, Drawer } from '@mui/material';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { styled, useTheme } from '@mui/material/styles';


export const closeDialog = React.createContext<Function>(() => {
});
function Main({changeState} : any) {
    const [popupData, setPopupData] = React.useState(data.object);
    const [projectData, setProjectData] = React.useState(data.tree[0]);  
    const [formOpen, setFormOpen] = React.useState(false);  

    const handleCloseForm = () => {
      setFormOpen(false);
    }
    const handleOpenForm = () => {
      setFormOpen(true);
    }

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }  
      setOpen(false);
    };
    
    return (
      <>
      <closeDialog.Provider value={handleCloseForm}>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <div className="min-h-full">

        <main className="m-1">
        {/* <div className="flex flex-col items-center gap-8 "> */}
        <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
        <div className='container-app'>            

        {/* Start */} {/* FullPage панель !!!  */}
        <div className="hidden md:block">                      
                      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">                        
                        {/* Сайдбар с деревом объектов */}                        
                          <SelectProjects changeState={setProjectData}/>        
                          <MuiButTree/>
                          <MuiTree data={projectData} handleOpenForm={handleOpenForm} setPopupData={setPopupData}/>                   
                       </div>                      
        </div>                                  
        {/* End */}  
        
        {/* Start */} {/* Mobile панель ! */}
        <Disclosure as="nav" >          
        {({ open }) => (
            <>            
              <div className="-mr-2 flex md:hidden">
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                           <span className="absolute -inset-0.5" />
                           <span className="sr-only">Open main menu</span>
                           {open ? (
                             <ArrowLeftStartOnRectangleIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                             <MultipleStopIcon className="block h-6 w-6" aria-hidden="true" />
                            )}
              </Disclosure.Button>

              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">            
              {/* Сайдбар с деревом объектов */}            
                    <SelectProjects changeState={setProjectData}/>        
                    <MuiButTree/>
                    <MuiTree data={projectData} handleOpenForm={handleOpenForm} setPopupData={setPopupData}/>              
                 </div>
              </Disclosure.Panel>
            </>                     
        )}        
        </Disclosure>

        {/* Открытие карточки объекта  */}
        <Dialog maxWidth="lg" open={formOpen} onClose={() => {}}>
           <MuiPopup documentId={popupData.id}/>
        </Dialog>


{/* содержимое страницы Дашборд */}
        <div className="content">   

          {/* Заголовок для дашборда */}
          <div id="mainHeader">
			      <div className="content-text-block">
              <h2 className="text-3xl font-bold tracking-tight text-gray-100">Рабочий стол</h2>
			      </div>
          </div>

          {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Стартовая страница</h2> */}
           <div className="flex flex-wrap items-center gap-8 ">
            <Container fixed>
              <MuiStartpage />
            </Container>
           </div>

           {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Новости</h2> */}
           <div className="flex flex-wrap items-center gap-8 ">
            <Container fixed>
              {/* <MuiNews></MuiNews> */}
            </Container>
           </div>

           {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ключевые показатели</h2> */}
           <div className="flex flex-wrap items-center gap-8 ">
            <Container fixed>
              {/* <MuiDashboard></MuiDashboard> */}
            </Container>
           </div>

           {/* <Typography variant="h4" gutterBottom>Избранное</Typography> */}
           {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Избранное</h2> */}
           <div className="flex flex-wrap items-center gap-8 ">
           <Container fixed>              
              <MuiFavourites ></MuiFavourites > 
               {/* TODO переделать, что было одинаково c SatrtPage */}
            </Container>
          </div>
          </div>
        </div>
        </div>  
        </main>


        {/* footer страницы */}
        <MainFooter/>
      </div>
      </closeDialog.Provider>
    </>

    );
  }
  export default Main;
