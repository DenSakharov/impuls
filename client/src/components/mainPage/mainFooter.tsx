import  React  from 'react';
import './../../globals.css';
import About from '../about/about';
import Contacts from '../about/contacts_teem';
//import { Button, ButtonGroup, Divider,MenuItem } from '@mui/material';

function MainFooter() {
    return (
      <>
        <footer id="content">
          {/* Your content */}
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
           <div id='foot'>
                <p>  <About/> | <Contacts/> </p>
                    <p id="copyright">
                    <a href="/" target="" rel="noreferrer">© Impulse Team 2024</a>
                </p>
            </div>
          </div>
          </footer>
    </>
    );
  }
  export default MainFooter;
