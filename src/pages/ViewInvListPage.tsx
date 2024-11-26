import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonLabel, IonSearchbar } from '@ionic/react';
import { arrowBackCircle, basketOutline, construct, fastFood, gameController, shirt } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const ViewInvListPage: React.FC = () => {
  
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
        <h1>Inventory Lists</h1>
      <IonSearchbar></IonSearchbar>

      <IonList>
        <IonItem>
          <IonIcon aria-hidden="true" color='success' icon={construct} slot="start"></IonIcon>
          <IonLabel>Warehouse</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon aria-hidden="true" color='success' icon={fastFood} slot="start"></IonIcon>
          <IonLabel>Kitchen</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon aria-hidden="true" color='success' icon={shirt} slot="start"></IonIcon>
          <IonLabel>Clothes</IonLabel>
        </IonItem>        
        <IonItem>
          <IonIcon aria-hidden="true" color='success' icon={gameController} slot="start"></IonIcon>
          <IonLabel>Games</IonLabel>
        </IonItem>
      </IonList>

      <IonButton routerLink='/NewListPage' color={'success'}>Create New List</IonButton>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default ViewInvListPage;