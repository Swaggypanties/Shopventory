import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { basketOutline } from 'ionicons/icons';
import { logoDropbox } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const ViewInvListPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonTitle> <IonIcon icon={basketOutline}  size='large'/>Shopventory </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center" fullscreen>
        <div className="home-content">
          <h1><strong>Inventory</strong></h1>
          <IonIcon icon={logoDropbox} className="large-icon"  />
          
          
          <div className='button-container'>
            <IonButton expand="block" routerLink='/MainPage' color={'success'}>Return</IonButton>

          </div>
        </div>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default ViewInvListPage;