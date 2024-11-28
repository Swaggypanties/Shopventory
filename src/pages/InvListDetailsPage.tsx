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
    IonInput,
  } from '@ionic/react';
  import {
    arrowBackCircle,
    basketOutline,
    closeCircle,
    addCircle,
    removeCircle,
  } from 'ionicons/icons';
  import { useParams, useHistory } from 'react-router-dom';
  import React, { useState } from 'react';
  import './InvListDetailsPage.css';
  
  const InvListDetailsPage: React.FC = () => {
    const { listId } = useParams<{ listId: string }>();
    const history = useHistory();
  
    const [inventoryList, setInventoryList] = useState([
      { id: 1, name: 'Sports games', quantity: 3 },
      { id: 2, name: 'Puzzles', quantity: 1 },
      { id: 3, name: 'Sandbox', quantity: 1 },
    ]);
  
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);
  
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
  
    const addItem = () => {
      if (newItemName.trim() !== '') {
        setInventoryList([
          ...inventoryList,
          {
            id: Date.now(),
            name: newItemName,
            quantity: newItemQuantity,
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
            <IonInput
              type="number"
              placeholder="Quantity"
              value={newItemQuantity}
              onIonChange={(e) => setNewItemQuantity(parseInt(e.detail.value!, 10))}
              style={{ maxWidth: '70px', textAlign: 'center' }}
            />
            <IonButton onClick={addItem} color="success">
              Add Item
            </IonButton>
          </IonItem>
  
          {/* Inventaarion tuotelista */}
          <IonList>
            {inventoryList.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>{item.name}</IonLabel>
                <div className="item-controls">
                  <IonButton
                    fill="clear"
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{ padding: '0' }}
                  >
                    <IonIcon icon={removeCircle} color="success" />
                  </IonButton>
                  <IonLabel className="quantity-label">{item.quantity}</IonLabel>
                  <IonButton
                    fill="clear"
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{ padding: '0' }}
                  >
                    <IonIcon icon={addCircle} color="success" />
                  </IonButton>
                  <IonIcon
                    icon={closeCircle}
                    color="dark"
                    slot="end"
                    onClick={() => deleteItem(item.id)}
                    className="delete-icon"
                  />
                </div>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default InvListDetailsPage;
  