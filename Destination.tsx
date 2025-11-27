import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react';
import { Speech } from '../services/speech';
import { TTS } from '../services/tts';
import { StorageService } from '../services/storage';
import { Auth } from '../services/auth';
import { Geo } from '../services/geo';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Destination: React.FC = () => {
  const [dest, setDest] = useState('');
  const nav = useNavigate();

  const startListen = () => {
    Speech.startRecognition((txt) => {
      setDest(txt);
      TTS.speak('Destino selecionado: ' + txt);
    });
  };

  const startTrip = async () => {
    if (!dest) { TTS.speak('Por favor, informe o destino'); return; }
    const user = Auth.current();
    const pos = await Geo.getCurrentPosition().catch(()=>null);
    const trip = {
      id: uuidv4(),
      userEmail: user?.email || 'anon',
      origin: 'posição atual',
      destination: dest,
      timestamp: Date.now(),
      coords: pos ? [pos] : []
    };
    StorageService.saveTrip(trip);
    TTS.speak('Iniciando navegação para ' + dest);
    // demonstração: simula instrução
    setTimeout(()=>TTS.speak('Aproxime-se da plataforma. Cuidado com os degraus.'), 3000);
    nav('/home');
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Escolher destino</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonItem><IonLabel position="stacked">Destino</IonLabel><IonInput value={dest} onIonChange={e=>setDest((e.target as any).value)} /></IonItem>
        <IonButton expand="block" onClick={startListen}>Ditar destino (voz)</IonButton>
        <IonButton expand="block" onClick={startTrip}>Iniciar trajeto</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Destination;
