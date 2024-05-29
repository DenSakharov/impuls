import React, { useEffect, useState } from 'react';
import './../../globals.css';
//import "./styles/menu_styles.css";
import "./stylesMainPage.css";
import {Container} from '@mui/system';
import {Dialog} from '@mui/material';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import MuiPopup from '../muiPopup/muiPopup';
import SelectProjects from './selectProjects';
import MainFooter from './mainFooter';
import MuiNews from "./muiNews";
import MuiDashboard from "./muiDashboard";
import {MuiStartpage} from './muiStartpage';
import MuiFavourites from './favorites/muiFavourites';
import { Disclosure} from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { styled, useTheme } from '@mui/material/styles';
import MuiAllProjects from '../mainPage/projects/muiAllProjects';
import { tProjectAttributes, tObjectAttributes, tDocumentAttributes } from '#/dtos';
import useProjects from '../../hooks/useProjects';
import useTree from '../../hooks/useTree';

export const closeDialog = React.createContext<Function>(() => {});

function Main({ changeState }: any) {
    const [popupData, setPopupData] = useState<tDocumentAttributes | null>(null);
    const {projects} = useProjects();
    const [project, setProject] = useState<tProjectAttributes | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const {tree, getTree} = useTree(project?.projectId);
    
    useEffect(() => {
        if(projects?.length > 0) {
            setProject(projects[0]);
        }
    }, [projects])
    const handleCloseForm = () => {
      if (window.location.pathname === '/main') {
        setFormOpen(false);
      } else {
        window.open('/main', '_self')
      }
    };
    const handleOpenForm = () => {
        setFormOpen(true);
    };

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
    const [isAuth, setIsAuth] = useState(false)

    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));

    const handleselectproject = (value) => {
      console.log(value);
      setProject(value);
    }


    return (
    <>
    <closeDialog.Provider value={handleCloseForm}>
       <meta name='viewport' content='width=device-width, initial-scale=1'/>
       <div className="min-h-full">
        <main className="m-1">
            {/* <div className="flex flex-col items-center gap-8 "> */}
           <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
            <div className='flex container-app'>

            {/* Start */} {/* FullPage панель !!!  */}
            <div className="hidden md:block">
              <div className="space-y-1 px-2 pb-3 pt-0 sm:px-3"  style={{ width: 300 }}>
              {/* Сайдбар с деревом объектов */}
                {projects.length > 0 && <SelectProjects changeState={setProject} projects={projects} />}
                <MuiButTree projectId={project?.projectId} updateTree={getTree}/>
                <MuiTree projectId={project?.projectId} updateTree={getTree} data={tree} handleOpenForm={handleOpenForm}
                                                   setPopupData={setPopupData}/>
              </div>
            </div>            
            {/* End */}

            {/* Start */} {/* Mobile панель ! */}
            
            <Disclosure as="nav">
                    {({open}) => (
                                        <>
                                            <div className="mr-1 md:hidden">
                                                <Disclosure.Button
                                                    className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"                                                   
                                                >
                                                    <span className="absolute -inset-1.5"/>
                                                    <span className="sr-only">Open main menu</span>
                                                    {open ? (
                                                        <ArrowLeftStartOnRectangleIcon className="block h-6 w-6" aria-hidden="true"/>
                                                    ) : (
                                                        <MultipleStopIcon className="block h-6 w-6" aria-hidden="true"/>
                                                    )}
                                                </Disclosure.Button>
                                            </div>

                                            <Disclosure.Panel className="md:hidden">
                                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                                    {/* Сайдбар с деревом объектов */}
                                                    {projects.length > 0 &&<SelectProjects changeState={setProject} projects={projects}/>}
                                                    <MuiButTree projectId={project?.projectId} updateTree={getTree}/>
                                                    <MuiTree projectId={project?.projectId} updateTree={getTree} data={tree} handleOpenForm={handleOpenForm}
                                                             setPopupData={setPopupData}/>
                                                </div>
                                            </Disclosure.Panel>
                                            
                                        </>
                    )}
            </Disclosure>
            

            {/* Открытие карточки объекта  */}
            <Dialog maxWidth="lg" open={formOpen} onClose={handleCloseForm}>
                <MuiPopup documentId={popupData?.docId} />
            </Dialog>

          {/* содержимое страницы Дашборд */}
          <div className="content ">
          {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Стартовая страница</h2> */}          
           <div className="flex-wrap items-center gap-8 ">
            {/* Заголовок для дашборда */}
             <div id="mainHeader">
               <div className="content-text-block">
                   <h2 className="text-3xl font-bold tracking-tight text-gray-100">Рабочий стол</h2>
               </div>
            </div>         

            <Container fixed>
              <MuiStartpage chengedproject={handleselectproject} />
            </Container>
           </div>

          {/* <div className="flex flex-wrap items-center gap-8 ">
            <Container fixed>
              <MuiAllProjects />
            </Container>
           </div> */}

           {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Новости</h2> */}
           <div className="hidden md:block">
            <Container fixed>
              <MuiNews></MuiNews>
            </Container>
           </div>

           {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ключевые показатели</h2> */}
           <div className="hidden md:block">
            <Container fixed>
              <MuiDashboard></MuiDashboard>
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