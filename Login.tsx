import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { Auth } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { Speech } from '../services/speech';
import { TTS } from '../services/tts';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      await Auth.login(email.trim(), password);
      TTS.speak('Login realizado com sucesso');
      nav('/home');
    } catch (e:any) {
      alert(e.message || 'Erro');
      TTS.speak('Erro no login');
    }
  };

  const startVoice = () => {
    Speech.startRecognition((txt) => {
      setEmail(txt);
      TTS.speak('E-mail reconhecido: ' + txt);
    });
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>NavegaMetrô - Login</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonItem><IonLabel position="stacked">Email</IonLabel><IonInput value={email} onIonChange={e=>setEmail((e.target as any).value)} /></IonItem>
        <IonButton expand="block" onClick={startVoice}>Ditar email (voz)</IonButton>
        <IonItem><IonLabel position="stacked">Senha</IonLabel><IonInput type="password" value={password} onIonChange={e=>setPassword((e.target as any).value)} /></IonItem>
        <IonButton expand="block" onClick={handleLogin}>Entrar</IonButton>
        <IonButton expand="block" fill="clear" onClick={()=>nav('/register')}>Criar conta</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
