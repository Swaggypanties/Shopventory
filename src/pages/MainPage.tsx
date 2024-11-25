import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { basketOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const MainPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonTitle> <IonIcon icon={basketOutline}  size='large'/>Shopventory </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center" fullscreen>
        <div className="home-content">
          <h1><strong>Welcome to Shopventory!</strong></h1>
          <IonIcon icon={basketOutline} className="large-icon"  />
          <h6><strong>What do you want to do?</strong></h6>
          
          <div className='button-container'>
            <IonButton expand="block"  color={'success'}>Create List</IonButton>
            <IonButton expand="block"  color={'success'}>View List</IonButton>
          </div>
        </div>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default MainPage;