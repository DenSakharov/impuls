import React, { useContext, useEffect, useState } from 'react';
import './../../globals.css';
import "./stylesMainPage.css";
import {Container} from '@mui/system';
import {Dialog, IconButton} from '@mui/material';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import MuiPopup from '../muiPopup/muiPopup';
import SelectProjects from './selectProjects';
import MainFooter from './mainFooter';
import MuiNews from "./muiNews";
import MuiDashboard from "./muiDashboard";
import MuiStartpage from './muiStartpage';
import MuiFavourites from './favorites/muiFavourites';
import { Disclosure} from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { styled, useTheme } from '@mui/material/styles';
import MuiAllProjects from '../mainPage/projects/muiAllProjects';
import { tProjectAttributes, tDocumentAttributes } from '#/dtos';
import useProjects from '../../hooks/useProjects';
import useTree from '../../hooks/useTree';
import ResultAlert from '../muiPopup/resultAlert';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeSnackBar } from '../../store/store';
import Drawer from '@mui/material/Drawer';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';


export const closeDialog = React.createContext<Function>(() => {});


function Main({ changeState }: any) {
    const dispatch = useAppDispatch();
    const snackData = useAppSelector(state => state.snackBar);
    const [popupData, setPopupData] = useState<tDocumentAttributes | null>(null);
    const {projects} = useProjects();
    const [project, setProject] = useState<tProjectAttributes | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const {tree, getTree} = useTree(project?.projectId);
    
    useEffect(() => {
        if(projects?.length > 0) {
            //setProject(projects[0]);
            const id: string | null = localStorage.getItem("projectId");
            if(id) {
              setProject(projects.find((project) => project.projectId === id) || projects[0]);
            } else {
              handleselectproject(projects[0]);
            }
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

    // const DrawerHeader = styled('div')(({ theme }) => ({
    //   display: 'flex',
    //   alignItems: 'center',
    //   padding: theme.spacing(0, 1),
    //   // necessary for content to be below app bar
    //   ...theme.mixins.toolbar,
    //   justifyContent: 'flex-end',
    // }));

    const handleselectproject = (value: tProjectAttributes | null) => {
      value ? localStorage.setItem('projectId', value.projectId) : localStorage.removeItem('projectId');
      setProject(value);
    }

    if(localStorage.getItem('token') == null) {
      window.open('/', "_self")
      return (<div></div>)
    }

    return (
    <>
    <closeDialog.Provider value={handleCloseForm}>
      
       <meta name='viewport' content='width=device-width, initial-scale=1'/>
       <div className="min-h-full">
        <main className="m-1">
           <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
            <div className='flex container-app'>

            {/* FullPage панель !!!  */}
            <div className="hidden md:block">
              <div className="space-y-1 px-2 pb-3 pt-0 sm:px-3">
              {/* Сайдбар с деревом объектов */}
                {projects.length > 0 && <SelectProjects title={project?.name} changeState={handleselectproject} projects={projects} />}
                <MuiButTree projectId={project?.projectId} updateTree={getTree}/>
                <MuiTree projectId={project?.projectId} updateTree={getTree} data={tree} handleOpenForm={handleOpenForm}
                                                   setPopupData={setPopupData}/>
              </div>
            </div>
            {/* End */}

            {/* Mobile панель ! */}
            <IconButton 
            size="large"
            edge="start"
            color="primary"            
            aria-label="menu"
            sx={{backgroundColor:'#1f2937',fontSize:'small', color:'white', borderRadius:'50%',zIndex: 1, position:'fixed', ml:'auto', mr: 2, display:{sm: 'none', xs: 'flex'}}}
            onClick={() => openDrawer()}    
            >
            <AccountTreeOutlinedIcon/>
          </IconButton>
                 <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                   <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                   {/* Сайдбар с деревом объектов */}
                    {projects.length > 0 && <SelectProjects title={project?.name} changeState={handleselectproject} projects={projects}/>}
                    <MuiButTree projectId={project?.projectId}
                                updateTree={getTree}
                    />
                    <MuiTree projectId={project?.projectId}
                             updateTree={getTree} data={tree}
                             handleOpenForm={handleOpenForm}
                             setPopupData={setPopupData}
                    />
                   </div>
                 </Drawer>

          {/* Открытие карточки объекта  */}
          <Dialog maxWidth="lg" fullScreen={window.outerWidth > 700 ? false : true} open={formOpen} onClose={() => {}}>
                <MuiPopup documentId={popupData?.docId} />
          </Dialog>

          {/* содержимое страницы Дашборд */}
          <div className="content ">
           <div className="flex-wrap items-center gap-8 ">

            {/* Заголовок для дашборда */}
             <div id="mainHeader">
               <div className="content-text-block">
                   <h2 className="text-3xl font-bold tracking-tight text-gray-100">Рабочий стол</h2>
               </div>
            </div>

            {/* Стартовая страница */}
            <Container fixed>
              {/* <MuiStartpage chengedproject={handleselectproject} /> */}
              <MuiStartpage projects={projects} changeProject={handleselectproject} />
            </Container>
           </div>

            {/* Новости, только для fullpage */}
           <div className="hidden md:block">
            <Container fixed>
              <MuiNews></MuiNews>
            </Container>
           </div>

           {/* Ключевые показатели, только для fullpage */}
           <div className="hidden md:block">
            <Container fixed>
              <MuiDashboard></MuiDashboard>
            </Container>
           </div>

           {/* Избранное */}
           <div className="flex flex-wrap items-center gap-8 ">
           <Container fixed>
              <MuiFavourites ></MuiFavourites >
            </Container>
          </div>
          </div>
         </div>
        </div>
        </main>

        {/* footer страницы */}
        <MainFooter/>
       </div>
       <ResultAlert type={snackData.snackBar.type as 'info' | 'success' | 'warning' | 'error'} message={snackData.snackBar.message} showAlert={snackData.snackBar.showAlert} setShowAlert={() => dispatch(closeSnackBar())}/>
    </closeDialog.Provider>
    </>
    );
  }
  export default Main;