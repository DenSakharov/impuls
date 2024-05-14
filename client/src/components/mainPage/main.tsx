import  React  from 'react';
import './../../globals.css';
import {Container} from '@mui/system';
import { Dialog} from '@mui/material';
import BreadcrumbNew from "./breadcrumb";
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import data from '../editPopup/data';
import MuiPopup from '../muiPopup/muiPopup';
import SelectProjects from './selectProjects';
import MainFooter from './mainFooter';
import MuiNews from "./muiNews";
import MuiDashboard from "./muiDashboard";
import MuiFavourites from "./muiFavourites";
import MuiStartpage from './muiStartpage';

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

    return (
      <>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <div className="min-h-full">
        {/* <MainNavBar /> */}

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

        <main className="m-1">

        {/* <div className="flex flex-col items-center gap-8 "> */}
        <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
        <div className='container-app'>

        {/* Сайдбар с деревом объектов */}
        <div className="max-w-64 hidden md:block">
            <SelectProjects changeState={setProjectData}/>        
            <MuiButTree/>
   	        <MuiTree data={projectData} handleOpenForm={handleOpenForm} setPopupData={setPopupData}/>
            
            {/* поиск компонент */}


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
              <MuiNews></MuiNews>
            </Container>
           </div>

           {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ключевые показатели</h2> */}
           <div className="flex flex-wrap items-center gap-8 ">
            <Container fixed>
              <MuiDashboard></MuiDashboard>
            </Container>
           </div>

           {/* <Typography variant="h4" gutterBottom>Избранное</Typography> */}
           {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900">Избранное</h2> */}
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
    </>

    );
  }
  export default Main;
