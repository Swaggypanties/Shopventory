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
  IonAlert,
} from '@ionic/react';
import { arrowBackCircle, basketOutline, cartOutline, cubeOutline, trashOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const ListsPage: React.FC = () => {
  const history = useHistory();
  const [lists, setLists] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

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

  const handleDelete = async (listId: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('User not logged in!');
      return;
    }

    const userId = user.uid;

    try {
      const listDocRef = doc(db, `users/${userId}/lists/${listId}`);
      await deleteDoc(listDocRef);

      // Update local state
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      alert('List deleted successfully!');
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1>Your Lists</h1>
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e: any) => setSearchTerm(e.target.value)}
          placeholder="Search lists..."
        ></IonSearchbar>

        <IonList>
          {filteredLists.map((list) => (
            <IonItem key={list.id} button>
              <IonIcon
                aria-hidden="true"
                color="success"
                icon={list.type === 'shopping' ? cartOutline : cubeOutline}
                slot="start"
              />
              <IonLabel onClick={() => openList(list.id, list.type)}>{list.name}</IonLabel>
              <IonIcon
                aria-hidden="true"
                color="danger"
                icon={trashOutline}
                slot="end"
                onClick={() => {
                  setSelectedListId(list.id);
                  setShowAlert(true);
                }}
              />
            </IonItem>
          ))}
        </IonList>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Delete List'}
          message={'Are you sure you want to delete this list?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                setSelectedListId(null);
              },
            },
            {
              text: 'Delete',
              handler: () => {
                if (selectedListId) handleDelete(selectedListId);
              },
            },
          ]}
        />

        <IonButton routerLink="/NewListPage" color="success">
          Create New List
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ListsPage;
