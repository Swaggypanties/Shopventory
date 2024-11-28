import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { arrowBackCircle, basketOutline } from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';

const ShopListDetailsPage: React.FC = () => {
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

      <IonContent>
      <IonTitle>{listId}</IonTitle>
        <h1>{listId}</h1>
        {/* Tässä näytetään valitun listan itemit */}
      </IonContent>
    </IonPage>
  );
};

export default ShopListDetailsPage;
