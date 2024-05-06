
import  React  from 'react';
import './../../globals.css';
// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import About from '../about/about';
// import Contacts from '../about/contacts_teem';
import { Dialog } from '@mui/material';
import Favorites from "./favorites";
import BreadcrumbNew from "./breadcrumb";
import Knowbase from "./knowbase";
import Todos from "./todos";
//import { Button, ButtonGroup, Divider,MenuItem } from '@mui/material';
// import Typography from '@mui/material/Typography';
//import MuiMenu from './muiMenu';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import data from '../editPopup/data';
// import { Dialog } from '@mui/material';
import MuiPopup from '../muiPopup/muiPopup';
// import { Container } from '@mui/system';
// import Grid from '@mui/system/Unstable_Grid';
//import styled from '@mui/system/styled';
// import Box from '@mui/system/Box';
// import ProjectDialog from './muiDialog';
import SelectProjects from './selectProjects';
// import MainNavBar from './mainNavBar';
import MainFooter from './mainFooter';

// import MainSidebar from "./sidebar";
// import Report from "./report";

// const ImpulseButton = styled(Button)({
//   boxShadow: 'none',
//   textTransform: 'none',
//   fontSize: 10,
//   padding: '6px 12px',
//   border: '1.5px solid',
//   lineHeight: 1.5,
//   backgroundColor: '#075985',
//   borderColor: '#0070AC',
//   fontFamily: [
//     '-apple-system',
//     'BlinkMacSystemFont',
//     '"Segoe UI"',
//     'Roboto',
//     '"Helvetica Neue"',
//     'Arial',
//     'sans-serif',
//     '"Apple Color Emoji"',
//     '"Segoe UI Emoji"',
//     '"Segoe UI Symbol"',
//   ].join(','),
//   '&:hover': {
//     backgroundColor: '#075985',
//     borderColor: '#0489D1',
//     boxShadow: 'none',
//   },
//   '&:active': {
//     boxShadow: 'none',
//     backgroundColor: '#075985',
//     borderColor: '#FCFCFC',
//   },
//   '&:focus': {
//     boxShadow: '0 0 0 0.1rem rgba(7,89,163,.5)',
//   },
// });


// const service = {
//   name: 'serv',
//   email: 'ii@rosatom.ru',
//   imageUrl: '../../img/settings2_32px.png',
// }

// const user = {
//   name: 'Иванов Иван',
//   email: 'ii@rosatom.ru',
//   imageUrl:
//     '../../img/male_user_50px.png',
// }

// const navigation = [
//   { name: 'Дашборд', href: '/main', current: true },
//   { name: 'Поиск', href: '/find', current: false },
//   { name: 'Отчеты', href: '/report', current: false },
// ]
// const serviceNavigation = [
//   { name: 'Проекты и задачи', href: '/projects' },
//   { name: 'История согласований', href: '/TableData' },
//   { name: 'Импорт/Экспорт', href: '#' },
//   { name: 'Текстовый редактор', href: '/documents' },
// ]
// const userNavigation = [
//   { name: 'Профиль', href: '/userProfile' },
//   { name: 'О проекте', href: '/About' },
//   { name: 'Выйти', href: '/' },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

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
    
    // Выбор проекта
    // const changeProps = (value : any) => {
    //   setProjectData(value)
    //   changeState(value)
    //   handleCloseForm()
    // }

    return (
      <>
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <div className="min-h-full">
        {/* <MainNavBar /> */}

        <header className="bg-white shadow">
        <div className="h-[3dvh] bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
             <div className="flex h-10 items-center justify-between">
              <div className="flex items-center">
               <div className="flex-shrink-0">
                 {/* структура вложенности объектов модели данных */}
                  <BreadcrumbNew />
               </div>
              </div>
             </div>
            </div>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */}
          </div>
        </div>
        </header>

        <main className="m-1">

        {/* <div className="flex flex-col items-center gap-8 "> */}
        <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
        <div className='container-app'>

        {/* Сайдбар с деревом объектов */}
        <div className="aside">
            <SelectProjects changeState={setProjectData}/>
            <MuiButTree/>
   	        <MuiTree data={projectData} handleOpenForm={handleOpenForm} setPopupData={setPopupData}/>
  	    </div>

        {/* <MainSidebar/> */}
        <div className="content">       
        
        {/* Открытие карточки объекта  */}
        <Dialog  maxWidth="lg" open={formOpen} onClose={handleCloseForm}>
          <MuiPopup {...popupData}/>
        </Dialog>

          {/* Заголовок для дашборда */}
          <div id="mainHeader">
			      <div className="content-text-block">
              <h2 className="text-3xl font-bold tracking-tight text-gray-100">Дашборд</h2>
			      </div>
          </div>
           <h2 className="text-3xl font-bold tracking-tight text-gray-900">Новости</h2>
           <div className="flex flex-wrap items-center gap-8 ">
            <div> 1 </div>
            <div> 2 </div>
            <div> 3 </div>
           </div>

           <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ключевые показатели</h2>
           <div className="flex flex-wrap items-center gap-8 ">
            <div> 1 </div>
            <div> 2 </div>
            <div> 3 </div>
           </div>

           <h2 className="text-3xl font-bold tracking-tight text-gray-900">Избранное</h2>
           <div className="flex flex-wrap items-center gap-8 ">
            <div> <Favorites /> </div>
            <div> <Knowbase /> </div>
            <div> <Todos /> </div>
          </div>
          </div>
        </div>
        </div>  
        </main>

        {/* footer страницы */}
        <MainFooter/>

      </div>
    </>

    );
  }
  export default Main;
