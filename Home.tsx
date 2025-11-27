import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../services/auth';
import { TTS } from '../services/tts';

const Home: React.FC = () => {
  const nav = useNavigate();
  const logout = async () => {
    await Auth.logout();
    TTS.speak('Você saiu da sua conta');
    nav('/');
  };
  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>NavegaMetrô</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <h2>Bem-vindo ao NavegaMetrô</h2>
        <p>Use os botões abaixo para iniciar uma navegação acessível por voz.</p>
        <IonButton expand="block" onClick={()=>nav('/destination')}>Selecionar destino</IonButton>
        <IonButton expand="block" onClick={()=>nav('/history')}>Histórico de viagens</IonButton>
        <IonButton expand="block" onClick={()=>nav('/support')}>Contatar Suporte</IonButton>
        <IonButton expand="block" color="medium" onClick={logout}>Sair</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
