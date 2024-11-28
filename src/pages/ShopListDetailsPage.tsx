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

const ShopListDetailsPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const history = useHistory();

  const [shoppingList, setShoppingList] = useState([
    { id: 1, name: 'Orange', quantity: 1, purchased: false },
    { id: 2, name: 'Kiwi', quantity: 3, purchased: false },
    { id: 3, name: 'Apple', quantity: 1, purchased: true },
  ]);

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
        <IonTitle><h1>{listId}</h1></IonTitle>
        <IonList>
          {shoppingList.map((item) => (
          <IonItem key={item.id}>
            <IonLabel
            style={{
              textDecoration: item.purchased ? 'line-through' : 'none',
            }}
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
          style={{
            maxWidth: '50px',
            textAlign: 'center',
          }}
          slot="end"
          />
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

export default ShopListDetailsPage;
