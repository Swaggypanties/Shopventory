import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonRadioGroup, IonRadio, IonInput, IonItem, IonLabel } from '@ionic/react';
import { arrowBackCircle, basketOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

const NewListPage: React.FC = () => {
  const [listType, setListType] = useState('shopping');
  const [listName, setListName] = useState('');
  const history = useHistory();

  const createNewList = async () => {
    if (!listName.trim()) {
      alert('Please provide a list name');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('User not logged in!');
      return;
    }

    try {
      const userId = user.uid;
      const listsRef = collection(db, `users/${userId}/lists`);
      const newListRef = doc(listsRef);
      await setDoc(newListRef, {
        name: listName,
        type: listType,
        createdAt: new Date(),
      });
      alert('New list created successfully!');
      history.push('/ListsPage');
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButton slot='start' fill='clear' style={{ width: 'auto', height: 'auto' }}>
            <IonIcon icon={basketOutline} color='dark' size='large' />
          </IonButton>
          <IonTitle className="ion-text-center">SHOPVENTORY</IonTitle>
          <IonButton
            onClick={() => history.goBack()} // Korjattu back-toiminto
            fill='clear'
            slot='end'
            style={{ width: 'auto', height: 'auto' }}
          >
            <IonIcon color='dark' size='large' icon={arrowBackCircle} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center" fullscreen>
        <h1>Create New List</h1>
        <IonRadioGroup value={listType} onIonChange={(e) => setListType(e.detail.value)}>
          <IonItem>
            <IonRadio value="shopping" slot="start" />
            <IonLabel>Shopping</IonLabel>
          </IonItem>
          <IonItem>
            <IonRadio value="inventory" slot="start" />
            <IonLabel>Inventory</IonLabel>
          </IonItem>
        </IonRadioGroup>
        <IonItem>
          <IonInput
            placeholder="List name"
            value={listName}
            onIonInput={(e: any) => setListName(e.target.value)}
          />
        </IonItem>
        <IonButton onClick={createNewList} color="success">
          Create New List
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NewListPage;
