import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonInput, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { arrowBackCircle, basketOutline } from 'ionicons/icons';
import { useState } from 'react';
import { db } from '../firebaseConfig'; 
import { doc, setDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const NewItemPage: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();

  const handleCreateItem = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('You must be logged in to create an item.');
      return;
    }

    const userId = user.uid;
    const listId = "default"; // Replace with logic to select or create a list

    const finalCategory = selectedCategory;

    if (!itemName.trim() || !finalCategory) {
      alert('Please provide both an item name and a category.');
      return;
    }

    try {
      // Firestore reference to the user's list and items
      const itemId = Date.now().toString(); // Generate unique item ID
      const itemRef = doc(db, `users/${userId}/lists/${listId}/items/${itemId}`);
      
      // Save item in Firestore
      await setDoc(itemRef, {
        name: itemName,
        category: finalCategory,
        createdAt: new Date()
      });

      alert('Item created successfully!');
      setItemName(''); // Resets the form
      setSelectedCategory('');
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to create item.');
    }
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
      
      <IonContent className="ion-text-center" fullscreen>
        <div className="home-content">
          <h1><strong>Create new item</strong></h1>
          <IonInput 
            placeholder="Enter text"  
            fill="outline" 
            value={itemName} 
            onIonChange={(e: any) => setItemName(e.target.value)} 
          />
          <IonItem>
            <IonSelect 
              label="Select Category" 
              placeholder="Categories"   
              value={selectedCategory} 
              onIonChange={(e: any) => setSelectedCategory(e.target.value)}>
              <IonSelectOption value="food">Foods</IonSelectOption>
              <IonSelectOption value="drink">Drinks</IonSelectOption>
              <IonSelectOption value="games">Games</IonSelectOption>
              <IonSelectOption value="clothes">Clothes</IonSelectOption>
              <IonSelectOption value="electronics">Electronics</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton expand="block" color={'success'} onClick={handleCreateItem}>Create New Item</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewItemPage;
