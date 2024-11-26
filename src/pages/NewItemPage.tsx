import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { arrowBackCircle, atOutline, basketOutline } from 'ionicons/icons';
import { pricetagOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';


const NewItemPage: React.FC = () => {
  
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
              routerLink="/MainPage" fill="clear" slot='end' style={{ width: 'auto' , height:'auto' }}>
              <IonIcon
              color='dark'
              size='large'
              icon={arrowBackCircle} 
              />
            </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center" fullscreen>
        <div className="home-content">
          <h1><strong>Create new item?</strong></h1>
          <IonIcon icon={pricetagOutline} className="large-icon"  />
          
          

        </div>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default NewItemPage;