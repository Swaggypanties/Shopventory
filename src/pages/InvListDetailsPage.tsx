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
  } from '@ionic/react';
  import { arrowBackCircle, basketOutline, closeCircle, addCircle, removeCircle } from 'ionicons/icons';
  import { useParams, useHistory } from 'react-router-dom';
  import React, { useState } from 'react';
  
  const InvListDetailsPage: React.FC = () => {
    const { listId } = useParams<{ listId: string }>();
    const history = useHistory();
  
    const [inventoryList, setInventoryList] = useState([
      { id: 1, name: 'Sports games', quantity: 3 },
      { id: 2, name: 'Puzzles', quantity: 1 },
      { id: 3, name: 'Sandbox', quantity: 1 },
    ]);
  
    const updateQuantity = (id: number, delta: number) => {
      setInventoryList(
        inventoryList.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
      );
    };
  
    const deleteItem = (id: number) => {
      setInventoryList(inventoryList.filter((item) => item.id !== id));
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
            {inventoryList.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>{item.name}</IonLabel>
                <IonButton fill="clear" onClick={() => updateQuantity(item.id, -1)}>
                  <IonIcon icon={removeCircle} color='success' />
                </IonButton>
                <IonLabel>{item.quantity}</IonLabel>
                <IonButton fill="clear" onClick={() => updateQuantity(item.id, 1)}>
                  <IonIcon icon={addCircle} color='success' />
                </IonButton>
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
  