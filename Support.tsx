import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { Geo } from '../services/geo';
import { TTS } from '../services/tts';

const Support: React.FC = () => {
  const contactSupport = async () => {
    TTS.speak('Solicitando suporte. Enviando sua localização.');
    try {
      const pos = await Geo.getCurrentPosition();
      // Neste scaffold, apenas mostramos as coords — em produção enviar via API.
      alert(`Localização enviada ao suporte: lat ${pos.lat}, lng ${pos.lng}`);
      TTS.speak('Localização enviada. Um funcionário será acionado.');
    } catch (e) {
      alert('Não foi possível obter localização: ' + e);
      TTS.speak('Não foi possível obter localização');
    }
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Suporte</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <p>Caso precise de ajuda, o aplicativo pode enviar sua localização para o centro de atendimento do metrô.</p>
        <IonButton expand="block" onClick={contactSupport}>Contatar suporte (enviar localização)</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Support;
