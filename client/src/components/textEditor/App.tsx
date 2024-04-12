import React from 'react';
import './App.css';
import TextEditor from './TextEditor';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'


function App() {
  return (
    <div>
      <Router>
      <Routes>
            <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
            
            <Route path="/documents/:id" element ={<TextEditor />} />
            

        </Routes>
      </Router>
    </div>
  );
}

export default App;
