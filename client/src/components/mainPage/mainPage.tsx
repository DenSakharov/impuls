import React from 'react';
import './stylesMainPage.css';
import MuiMenu from './muiMenu';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import About from '../about/about';
import Contacts from '../about/contacts_teem';

// import data from '../editPopup/data';

import { Dialog } from '@mui/material';
import Favorites from "./favorites";
import BreadcrumbNew from "./breadcrumb";
import Knowbase from "./knowbase";
import Todos from "./todos";
// import MainSidebar from "./sidebar";
// import Report from "./report";


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

function MainPage() {
    const [formOpen, setFormOpen] = React.useState(false);
  
    const handleCloseForm = () => {
    setFormOpen(false);
    }
  const handleOpenForm = () => {
  setFormOpen(true);
    }


  return (
<div className="mainApp mainApp-push-bottom">

<MuiMenu changeState={setProjectData}/>

<Dialog  maxWidth="lg" open={formOpen} onClose={handleCloseForm}>
  <MuiPopup {...popupData}/>
</Dialog>
<div className ="clear"/>

<main className='section'>
  <div className='container-app'>

    <div className="aside">
      <MuiButTree/>
   	  <MuiTree data={projectData} handleOpenForm={handleOpenForm} setPopupData={setPopupData}/>
  	</div>

	  <div className="content">
      <div id="containerHeader">

      <div id="mainHeader">
			  <div className="content-text-block">
   			  <span> Рабочий стол </span>
			  </div>
    	</div>
       <Container fixed>
        <Box sx={{ bgcolor: '#F5F5F5', height: '10vh' }} >
        <div className="container-news">
        <h1 className="text-3xl font-bold underline"> Новости </h1>
         <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
          </Item>
        </Grid>
      </Grid>
    </Box>
       	    </div>
        </Box>
      </Container>

       <Container fixed>
        <Box sx={{ bgcolor: '#FFFFFF', height: '70vh' }} >
        <h1 className="text-3xl font-bold underline"> Ключевые показатели  </h1>
          <div className="container-kpi1">
           </div>
        </Box>
      </Container>

      <Container fixed>
        <Box sx={{ bgcolor: '#F5F5F5', height: '10vh'}} >
        <div className="container-proj">
        <h1 className="text-3xl font-bold underline"> Информация проекта</h1>
   	  </div>
        </Box>
      </Container>
    </div>
	</div>
  </div>
</main>

<div className ="clear"/>

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
  export default MainPage;

