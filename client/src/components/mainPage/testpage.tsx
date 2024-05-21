
import React from 'react';
import './stylesMainPage.css';
import MuiMenu from './muiMenu';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import About from '../about/about';
import Contacts from '../about/contacts_teem';
import data from '../editPopup/data';
import {Dialog} from '@mui/material';

import MuiPopup from '../muiPopup/muiPopup';
import {Container} from '@mui/system';
import MuiNews from "./muiNews";
import MuiDashboard from "./muiDashboard";

<<<<<<< HEAD

=======
export const closeDialog = React.createContext<Function>(() => {
});
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6

export default function Testpage() {
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
<<<<<<< HEAD
        
=======
        <closeDialog.Provider value={handleCloseForm}>
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
            <div className="mainApp mainApp-push-bottom">

                <MuiMenu changeState={setProjectData}/>

                <Dialog maxWidth="lg" open={formOpen} onClose={handleCloseForm}>
                    <MuiPopup {...popupData}/>
                </Dialog>
                <div className="clear"/>

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
                                    <MuiNews></MuiNews>
                                </Container>

                                <Container fixed>
                                    <MuiDashboard></MuiDashboard>
                                </Container>

                            </div>
                        </div>
                    </div>
                </main>

                <div className="clear"/>

                <footer id="content">
                    <div id='foot'>
                        <p><About/> | <Contacts/></p>
                        <p id="copyright"><a href="/" target="_blank" rel="noreferrer">© Impulse Team 2024</a></p>
                    </div>
                </footer>
            </div>
<<<<<<< HEAD
=======
        </closeDialog.Provider>
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
    );
}
