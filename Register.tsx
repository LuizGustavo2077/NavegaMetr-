import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { Auth } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { TTS } from '../services/tts';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleRegister = async () => {
    try {
      await Auth.register(email.trim(), password);
      TTS.speak('Cadastro realizado');
      nav('/home');
    } catch (e:any) {
      alert(e.message || 'Erro');
    }
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Cadastro</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonItem><IonLabel position="stacked">Email</IonLabel><IonInput value={email} onIonChange={e=>setEmail((e.target as any).value)} /></IonItem>
        <IonItem><IonLabel position="stacked">Senha</IonLabel><IonInput type="password" value={password} onIonChange={e=>setPassword((e.target as any).value)} /></IonItem>
        <IonButton expand="block" onClick={handleRegister}>Cadastrar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
