import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { StorageService } from '../services/storage';
import { Auth } from '../services/auth';
import { TTS } from '../services/tts';

const History: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);
  useEffect(()=> {
    const u = Auth.current();
    if (!u) { setTrips([]); return; }
    const arr = StorageService.getTripsForUser(u.email);
    setTrips(arr);
  }, []);

  const readTrip = (t:any) => {
    TTS.speak(`Rota para ${t.destination}, realizada em ${new Date(t.timestamp).toLocaleString()}`);
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Histórico de viagens</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {trips.length === 0 && <p>Nenhuma viagem registrada.</p>}
          {trips.map(trip => (
            <IonItem key={trip.id}>
              <IonLabel>
                <h3>{trip.destination}</h3>
                <p>{new Date(trip.timestamp).toLocaleString()}</p>
              </IonLabel>
              <IonButton onClick={()=>readTrip(trip)}>Ouvir</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default History;
