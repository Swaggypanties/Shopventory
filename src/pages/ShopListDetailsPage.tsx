import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import { arrowBackCircle, basketOutline, closeCircle } from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import './ShopListDetailsPage.css';

const ShopListDetailsPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const history = useHistory();

  const [shoppingList, setShoppingList] = useState([
    { id: 1, name: 'Orange', quantity: 1, purchased: false },
    { id: 2, name: 'Kiwi', quantity: 3, purchased: false },
    { id: 3, name: 'Apple', quantity: 1, purchased: true },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  const togglePurchased = (id: number) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  const addItem = () => {
    if (newItemName.trim() !== '') {
      setShoppingList([
        ...shoppingList,
        {
          id: Date.now(),
          name: newItemName,
          quantity: newItemQuantity,
          purchased: false,
        },
      ]);
      setNewItemName('');
      setNewItemQuantity(1);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButton slot="start" fill="clear" style={{ width: 'auto', height: 'auto' }}>
            <IonIcon icon={basketOutline} color="dark" size="large" />
          </IonButton>
          <IonTitle className="ion-text-center">SHOPVENTORY</IonTitle>
          <IonButton
            onClick={() => history.goBack()}
            fill="clear"
            slot="end"
            style={{ width: 'auto', height: 'auto' }}
          >
            <IonIcon color="dark" size="large" icon={arrowBackCircle} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonTitle>
          <h1 className="title-header">{listId}</h1>
        </IonTitle>

        {/* Uuden tuotteen lisääminen */}
        <IonItem>
          <IonInput
            placeholder="Item name"
            value={newItemName}
            onIonChange={(e) => setNewItemName(e.detail.value!)}
          />
          <IonInput className='quantity-input'
            type="number"
            placeholder="Quantity"
            value={newItemQuantity}
            onIonChange={(e) => setNewItemQuantity(parseInt(e.detail.value!, 10))}
          />
          <IonButton onClick={addItem} color="success">
            Add Item
          </IonButton>
        </IonItem>

        {/* Tuotelista */}
        <IonList>
          {shoppingList.map((item) => (
            <IonItem key={item.id}>
              <IonLabel
                className={item.purchased ? 'item-purchased' : ''}
                onClick={() => togglePurchased(item.id)}
              >
                {item.name}
              </IonLabel>
              <IonInput
                type="number"
                value={item.quantity}
                onIonChange={(e) =>
                  updateQuantity(item.id, parseInt(e.detail.value!, 10))
                }
                className="quantity-input"
                slot="end"
              />
              <IonIcon
                icon={closeCircle}
                color="dark"
                slot="end"
                className="delete-icon"
                onClick={() => deleteItem(item.id)}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ShopListDetailsPage;
