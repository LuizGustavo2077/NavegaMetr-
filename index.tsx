import React from 'react';
import { createRoot } from 'react-dom/client';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Destination from './pages/Destination';
import History from './pages/History';
import Support from './pages/Support';
import './theme/variables.css';

/* Basic Ionic CSS (you can keep defaults) */
import '@ionic/react/css/core.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/destination" element={<Destination/>} />
          <Route path="/history" element={<History/>} />
          <Route path="/support" element={<Support/>} />
        </Routes>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

createRoot(document.getElementById('root')!).render(<App />);
