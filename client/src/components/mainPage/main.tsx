import  React  from 'react';
import './../../globals.css';

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import About from '../about/about';
import Contacts from '../about/contacts_teem';
import { Dialog } from '@mui/material';
import Favorites from "./favorites";
import BreadcrumbNew from "./breadcrumb";
import Knowbase from "./knowbase";
import Todos from "./todos";
import { Button, ButtonGroup, Divider,MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import MuiMenu from './muiMenu';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import data from '../editPopup/data';
// import { Dialog } from '@mui/material';
import MuiPopup from '../muiPopup/muiPopup';
import { Container } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import Box from '@mui/system/Box';
import ProjectDialog from './muiDialog';


// import MainSidebar from "./sidebar";
// import Report from "./report";

const ImpulseButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 10,
  padding: '6px 12px',
  border: '1.5px solid',
  lineHeight: 1.5,
  backgroundColor: '#075985',
  borderColor: '#0070AC',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#075985',
    borderColor: '#0489D1',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#075985',
    borderColor: '#FCFCFC',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.1rem rgba(7,89,163,.5)',
  },
});

const service = {
  name: 'serv',
  email: 'ii@rosatom.ru',
  imageUrl: '../../img/settings2_32px.png',
}

const user = {
  name: 'Иванов Иван',
  email: 'ii@rosatom.ru',
  imageUrl:
    '../../img/male_user_50px.png',
}

const navigation = [
  { name: 'Дашборд', href: '/main', current: true },
  { name: 'Поиск', href: '/find', current: false },
  { name: 'Отчеты', href: '/report', current: false },
]
const serviceNavigation = [
  { name: 'Проекты и задачи', href: '/projects' },
  { name: 'История согласований', href: '/TableData' },
  { name: 'Импорт/Экспорт', href: '#' },
  { name: 'Текстовый редактор', href: '/documents' },
]
const userNavigation = [
  { name: 'Профиль', href: '/userProfile' },
  { name: 'О проекте', href: '/About' },
  { name: 'Выйти', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
    const changeProps = (value : any) => {
      setProjectData(value)
      changeState(value)
      handleCloseForm()
    }

    return (
      <>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-sky-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16"
                        src="./img/logo.png"
                        alt="IMS Impulse"
                      />
                    </div>
                    {/* Выбор проекта */}
                    <div className="flex-shrink-0">
                      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 300}}>
                         <Typography variant="subtitle1" component="div" sx={{maxHeight: 30,color: 'white'}} > IMS IMPULSE </Typography>
                         <ImpulseButton size="small" variant="outlined" onClick={handleOpenForm} sx={{maxHeight: 30,color: 'white'}} > {projectData.name} </ImpulseButton>
                       </Container>
                      </div>   
                    {/* End Выбор проекта */}

                    {/* Вывод меню */}
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))
                        } 
                    {/* End Вывод меню */}                    
                    
                    {/* Service dropdown */}
                       

                       <ProjectDialog formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/>
                       
                      <Menu as="div" className="relative ml-3">
                        <div className="rounded-md flex items-baseline space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white">
                          <Menu.Button className="relative rounded-md px-3 py-2 text-sm font-medium">
                           <a > Сервисы </a>
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {serviceNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>                      
                      <a href="/mainpage" target="" rel="noreferrer">old MainPage</a> 
                      </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />                       
                      </button>
                {/* Profile dropdown */}

                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                    <Dialog  maxWidth="lg" open={formOpen} onClose={handleCloseForm}>
                                      <About />
                                    </Dialog>

                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                {/* END Profile dropdown */}

                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                </Disclosure.Button>
                </div>
                </div>
                </div>
               <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))} 
                <div className="mt-3 space-y-1 px-2">
                    {serviceNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                </div>
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>

                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
               </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/* END Mobile menu button */}

        <header className="bg-white shadow">
        <BreadcrumbNew />
        <div className="h-[2dvh] bg-gray-100">
         {/* <div className="flex flex-col items-center gap-8 "> */}
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            {/* Your content */}
          </div>
         {/* </div> */}
        </div>
        </header>
   
        <main className="m-1">
          {/* <div className="flex flex-col items-center gap-8 "> */}
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

        <div className='container-app'>
        {/* Сайдбар с деревом объектов */}
        {/* <MainSidebar/> */}
        <div className="aside">
            <MuiButTree/>
   	        <MuiTree data={projectData} handleOpenForm={handleOpenForm} setPopupData={setPopupData}/>
  	    </div>

        <div className="content">

          {/* Заголовок для дашборда */}
          <div id="mainHeader">
			      <div className="content-text-block">
              <h2 className="text-3xl font-bold tracking-tight text-gray-100">Дашборд</h2>
			      </div>
          </div>

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
          


        <footer id="content">
          {/* Your content */}
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
           <div id='foot'>
              <p> <About/> | <Contacts/> </p>
              <p id="copyright"><a href="#" target="" rel="noreferrer">© Impulse Team 2024</a></p>
          </div>
          </div>
          </footer>
      </div>
    </>

    );
  }
  export default Main;