import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput } from '@ionic/react';
import React, { useState } from 'react';
import { loginUser } from '../firebaseConfig';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import { toast } from '../toast';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Initialize useHistory

    async function login() {
       const res = await loginUser(username, password);
       if (!res) {
           toast('Error logging in with your credentials');
       } else {
           toast('You have logged in!');
           history.push('/MainPage'); // Redirect to moviepage after successful login
       }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="Username"
                    onIonChange={(e: any) => setUsername(e.target.value)}
                />
                <IonInput
                    type="password"
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                />
                <IonButton onClick={login} color={'success'}>Login</IonButton>
                <p> Don't have an account yet? <Link to="/register">Register</Link> </p>
            </IonContent>
        </IonPage>
    );
};

export default Login;
