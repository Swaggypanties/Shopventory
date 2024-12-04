import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  arrowBackCircle,
  basketOutline,
  closeCircle,
  addCircle,
  removeCircle,
} from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
import './InvListDetailsPage.css';

const InvListDetailsPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const history = useHistory();

  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [listName, setListName] = useState('');

  useEffect(() => {
    async function fetchItems() {
      const user = getAuth().currentUser;
      if (!user) {
        alert('User not logged in!');
        return;
      }

      const listItemsRef = collection(db, `users/${user.uid}/lists/${listId}/items`);
      const querySnapshot = await getDocs(listItemsRef);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInventoryList(items);
    }

    async function fetchAvailableItems() {
      const user = getAuth().currentUser;
      if (!user) return;

      const defaultItemsRef = collection(db, `users/${user.uid}/lists/default/items`);
      const querySnapshot = await getDocs(defaultItemsRef);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAvailableItems(items);
    }

    async function fetchListName() {
      const user = getAuth().currentUser;
      if (!user) return;

      const listRef = doc(db, `users/${user.uid}/lists/${listId}`);
      const listDoc = await getDoc(listRef);

      if (listDoc.exists()) {
        setListName(listDoc.data()?.name || listId);
      } else {
        console.error('List not found');
        setListName(listId); // Fallback to ID if name is not found
      }
    }

    fetchItems();
    fetchAvailableItems();
    fetchListName();
  }, [listId]);

  const addItemToInventoryList = async () => {
    if (!selectedItem) {
      alert('Please select an item.');
      return;
    }

    const user = getAuth().currentUser;
    if (!user) {
      alert('User not logged in!');
      return;
    }

    const selectedItemData = availableItems.find((item) => item.id === selectedItem);
    if (!selectedItemData) {
      alert('Item not found.');
      return;
    }

    const listItemsRef = collection(db, `users/${user.uid}/lists/${listId}/items`);
    const newItemRef = doc(listItemsRef);

    try {
      await setDoc(newItemRef, {
        name: selectedItemData.name,
        category: selectedItemData.category,
        quantity: 1,
        createdAt: new Date(),
      });

      setInventoryList((prevList) => [
        ...prevList,
        { id: newItemRef.id, ...selectedItemData, quantity: 1 },
      ]);
      setSelectedItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setInventoryList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
    // Add logic to update quantity in Firestore
  };

  const deleteItem = (id: string) => {
    setInventoryList((prevList) => prevList.filter((item) => item.id !== id));
    // Add logic to delete from Firestore
  };

  return (
    <IonPage>
            <IonHeader>
  <IonToolbar color={'success'}>
    <IonButton
      onClick={() => history.goBack()} // Go back to the previous page
      fill="clear"
      slot="start"
      style={{ width: 'auto', height: 'auto' }}
    >
      <IonIcon color="dark" size="large" icon={arrowBackCircle} />
    </IonButton>
    <IonTitle className="ion-text-center">SHOPVENTORY</IonTitle>
    <IonButton
      routerLink="/MainPage"
      fill="clear"
      slot="end"
      style={{ width: 'auto', height: 'auto' }}
    >
      <IonIcon icon={basketOutline} color="dark" size="large" />
    </IonButton>
  </IonToolbar>
</IonHeader>

<IonContent>
  <IonTitle className="page-title">
    <h1>{listName}</h1>
  </IonTitle>

  <IonItem className="button-container">
  <IonSelect
    placeholder="Select Item"
    value={selectedItem}
    onIonChange={(e) => setSelectedItem(e.detail.value)}
  >
    {availableItems.map((item) => (
      <IonSelectOption key={item.id} value={item.id}>
        {item.name} ({item.category})
      </IonSelectOption>
    ))}
  </IonSelect>
  <div className="buttons">
    <IonButton onClick={addItemToInventoryList} color="success" className="action-button">
      Add Item
    </IonButton>
    <IonButton routerLink="/NewItemPage" color="success" className="action-button">
      +
    </IonButton>
  </div>
</IonItem>


  <IonList>
    {inventoryList.map((item) => (
      <IonItem key={item.id}>
        <IonLabel>{item.name}</IonLabel>
        <div className="item-controls">
          <IonButton fill="clear" onClick={() => updateQuantity(item.id, -1)}>
            <IonIcon icon={removeCircle} color="success" />
          </IonButton>
          <IonLabel>{item.quantity}</IonLabel>
          <IonButton fill="clear" onClick={() => updateQuantity(item.id, 1)}>
            <IonIcon icon={addCircle} color="success" />
          </IonButton>
        </div>
        <IonIcon
          icon={closeCircle}
          color="dark"
          slot="end"
          onClick={() => deleteItem(item.id)}
        />
      </IonItem>
    ))}
  </IonList>
</IonContent>

    </IonPage>
  );
};

export default InvListDetailsPage;
