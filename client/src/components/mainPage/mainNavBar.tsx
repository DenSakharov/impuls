// Кожевников СЮ страница навигационной панели

import  React, { useEffect }  from 'react';
import './../../globals.css';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import About from '../about/about';
import { Dialog } from '@mui/material';
import data from '../editPopup/data';
import ProjectDialog from './muiDialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container} from '@mui/material';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import BreadcrumbNew from "./breadcrumb";
import MuiSidebarMessage from './muiSidebarMessage';
import Button from '@mui/material/Button';


const user = {
  name: 'Иванов Иван',
  email: 'ii@rosatom.ru',
  imageUrl:
    '../../img/male_user_50px.png',
}

const navigation = [
  { name: 'Дашборд', href: '/main', current: true },
  { name: 'Поиск', href: '/searchpage', current: false },
  { name: 'Отчеты', href: '/report', current: false },
]
const serviceNavigation = [
  { name: 'Проекты и задачи', href: '/project' },
  { name: 'История согласований', href: '/TableData' },
  { name: 'Текстовый редактор', href: '/documents' },
  { name: 'Импорт/Экспорт', href: '/integration' },
  { name: 'Администрирование', href: '/admin' },
]
const userNavigation = [
  { name: 'Профиль', href: '/userProfile' },
  // { name: 'О проекте', href: '/About' },
  { name: 'Выйти', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function MainNavBar({changeState} : any) {
    // const [popupData, setPopupData] = React.useState(data.object);
    const [projectData, setProjectData] = React.useState(data.tree[0]);
    const [formOpen, setFormOpen] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(false)

    // openSBMessage
    const [SBMessage, setSBMessage] = React.useState(false);
        const openSBMessage = () => setSBMessage(true);
        const closeSBMessage = () => setSBMessage(false);

    const handleCloseForm = () => {
    setFormOpen(false);
    }
    // const handleOpenForm = () => {
    // setFormOpen(true);
    // }

    // Выбор проекта
    const changeProps = (value : any) => {
      setProjectData(value)
      changeState(value)
      handleCloseForm()
    }

    if(localStorage.getItem('token') == null) {
      window.open('/', "_self")
      return (<div></div>)
    }

    return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-[#147298]">
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
                      <Box sx={{ flexGrow: 0, backgroundColor: '#147298'}}>
                        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 300}}>
                           <Typography variant="h5" component="div" color="common.white"> IMS IMPULSE </Typography>
                        </Container>
                      </Box>

                    </div>
                    <ProjectDialog formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/>                    
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
                       
                       {/* Выпадающее меню Сервисы */}
                       <Menu as="div" className="relative ml-3">
                        <div className="rounded-md flex items-baseline space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white">
                          <Menu.Button className="relative rounded-md px-3 py-2 text-sm font-medium">
                          <a href="/" target="" rel="noreferrer"> Сервисы </a>
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

                       {/* Ссылка на старую страницу */}
                       {/* <a href="/mainPage" target="" rel="noreferrer">old MainPage</a> */}
                      </div>
                    </div>
                    {/* End Вывод меню */}  
                  </div>
                  
                  {/* Выпадающее меню Profile */}
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">

                      {/* Выпадающее меню  MuiSidebarMessage*/}
                      <MuiSidebarMessage />
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
                  {/* END Выпадающее меню Profile */}

                  {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
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
      </div>
      
      {/* header начало */}
      <header className="bg-white shadow">
        <div className="h-[4dvh] bg-gray-100">
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
    </>
  );  
}
  export default MainNavBar;
