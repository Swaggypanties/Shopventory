import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { arrowBackCircle, basketOutline } from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';

const InvListDetailsPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButton slot='start' fill='clear' style={{ width: 'auto' , height:'auto' }}>
            <IonIcon
              icon={basketOutline}
              color='dark'
              size='large'/>
          </IonButton>
          <IonTitle className="ion-text-center">
            SHOPVENTORY
          </IonTitle>
          <IonButton 
             onClick={() => history.goBack()} fill="clear" slot='end' style={{ width: 'auto' , height:'auto' }}>
            <IonIcon
              color='dark'
              size='large'
              icon={arrowBackCircle} 
              />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>{listId}</h1>
        <p>This is the details page for the {listId} inventory list.</p>
        {/* Lisää tähän inventaarion tarkemmat tiedot */}
      </IonContent>
    </IonPage>
  );
};

export default InvListDetailsPage;
