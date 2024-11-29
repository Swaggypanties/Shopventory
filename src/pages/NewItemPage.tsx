import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonInput, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
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
            <h1><strong>Create new item</strong></h1>
            <IonInput fill="outline" placeholder="Enter text"></IonInput>
            <IonItem>
            <IonSelect label="Select Category" placeholder="Categories">
              <IonSelectOption value="fruits">Fruits</IonSelectOption>
              <IonSelectOption value="games">Games</IonSelectOption>
              <IonSelectOption value="clothes">Clothes</IonSelectOption>
            </IonSelect>
            </IonItem>
            <IonInput placeholder="Add New Category"></IonInput>
            <IonButton expand="block" color={'success'}>Create New Item</IonButton>
          </div>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default NewItemPage;