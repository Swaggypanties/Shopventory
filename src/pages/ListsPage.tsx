import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
  } from '@ionic/react';
  import { arrowBackCircle, basketOutline, cartOutline, cubeOutline } from 'ionicons/icons';
  import { useHistory } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { db } from '../firebaseConfig';
  import { collection, query, getDocs } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  
  const ListsPage: React.FC = () => {
    const history = useHistory();
    const [lists, setLists] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      async function fetchLists() {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (!user) {
          alert('User not logged in!');
          return;
        }
  
        const userId = user.uid;
  
        try {
          const listsRef = collection(db, `users/${userId}/lists`);
          const q = query(listsRef);
          const querySnapshot = await getDocs(q);
  
          const fetchedLists = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLists(fetchedLists);
        } catch (error) {
          console.error('Error fetching lists:', error);
        }
      }
  
      fetchLists();
    }, []);
  
    const openList = (listId: string, type: string) => {
      if (type === 'shopping') {
        history.push(`/list/${listId}`);
      } else if (type === 'inventory') {
        history.push(`/invlist/${listId}`);
      }
    };
  
    const filteredLists = lists.filter((list) =>
      list.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color={'success'}>
            <IonButton slot="start" fill="clear" style={{ width: 'auto', height: 'auto' }}>
              <IonIcon icon={basketOutline} color="dark" size="large" />
            </IonButton>
            <IonTitle className="ion-text-center">SHOPVENTORY</IonTitle>
            <IonButton
              routerLink="/MainPage"
              fill="clear"
              slot="end"
              style={{ width: 'auto', height: 'auto' }}
            >
              <IonIcon color="dark" size="large" icon={arrowBackCircle} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-text-center" fullscreen>
          <h1>Your Lists</h1>
          <IonSearchbar
            value={searchTerm}
            onIonInput={(e: any) => setSearchTerm(e.target.value)}
            placeholder="Search lists..."
          ></IonSearchbar>
  
            <IonList>
            {filteredLists.map((list) => (
                <IonItem key={list.id} button onClick={() => openList(list.id, list.type)}>
                <IonIcon
                    aria-hidden="true"
                    color="success"
                    icon={list.type === 'shopping' ? cartOutline : cubeOutline}
                    slot="start"
                />
                <IonLabel>{list.name}</IonLabel>
                </IonItem>
            ))}
            </IonList>

  
          <IonButton routerLink="/NewListPage" color="success">
            Create New List
          </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default ListsPage;
  