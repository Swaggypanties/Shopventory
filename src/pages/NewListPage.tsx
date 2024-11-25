import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { basketOutline } from 'ionicons/icons';
import { listOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const NewListPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonTitle> <IonIcon icon={basketOutline}  size='large'/>Shopventory </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center" fullscreen>
        <div className="home-content">
          <h1><strong>Create new list?</strong></h1>
          <IonIcon icon={listOutline} className="large-icon"  />
          
          
          <div className='button-container'>
            <IonButton expand="block" routerLink='/MainPage' color={'success'}>Return</IonButton>

          </div>
        </div>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default NewListPage;