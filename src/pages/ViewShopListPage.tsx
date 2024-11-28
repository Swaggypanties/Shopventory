import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { arrowBackCircle, basketOutline, cart, gameController, gift } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const ViewShopListPage: React.FC = () => {
  const history = useHistory();

  const openList = (listId: string) => {
    history.push(`/list/${listId}`);
  };

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
        <h1>Shopping Lists</h1>
        <IonSearchbar></IonSearchbar>

        <IonList>
          <IonItem button onClick={() => openList('groceries')}>
            <IonIcon aria-hidden="true" color='success' icon={cart} slot="start"></IonIcon>
            <IonLabel>Groceries</IonLabel>
          </IonItem>
          <IonItem button onClick={() => openList('bathroom')}>
            <IonIcon aria-hidden="true" color='success' icon={cart} slot="start"></IonIcon>
            <IonLabel>Bathroom</IonLabel>
          </IonItem>
          <IonItem button onClick={() => openList('christmas')}>
            <IonIcon aria-hidden="true" color='success' icon={gift} slot="start"></IonIcon>
            <IonLabel>Christmas presents</IonLabel>
          </IonItem>        
          <IonItem button onClick={() => openList('games')}>
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

export default ViewShopListPage;
