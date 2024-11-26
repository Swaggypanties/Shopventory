import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonRadioGroup, IonRadio, IonInput, IonList, IonItem, IonSelect, IonText, IonSelectOption } from '@ionic/react';
import { arrowBackCircle, basketOutline, construct, shirt } from 'ionicons/icons';
import { listOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const NewListPage: React.FC = () => {
  
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

          <h1>Create New List</h1>
          <IonRadioGroup value="ListType">
            <IonRadio value="shopping" labelPlacement="start">Shopping</IonRadio>

            <IonRadio value="inventory" labelPlacement='start'>Inventory</IonRadio>

          </IonRadioGroup>

          <div className="ion-padding">
            <h3>List name</h3>
          <IonInput fill="outline" placeholder="Enter text"></IonInput>
          </div>

          <IonList>
            <IonItem>
              <IonSelect placeholder="Select Icon">
                <div slot="label">
                  Select Icon
                </div>
                <IonSelectOption value="apple">
                  <IonIcon color='success' icon={shirt}>
                  </IonIcon>
                </IonSelectOption>
                <IonSelectOption value="apple">
                  <IonIcon color='success' icon={shirt}>
                  </IonIcon>
                </IonSelectOption>
                <IonSelectOption value="apple">
                  <IonIcon color='success' icon={shirt}>
                  </IonIcon>
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
          <div className='button-container'>
            <IonButton expand="block" routerLink='/NewListPage' color={'success'}>Create New List</IonButton>
          </div>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default NewListPage;