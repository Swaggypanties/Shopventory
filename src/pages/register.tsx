import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput } from '@ionic/react';
import React, { useState } from 'react';
import { loginUser } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { toast } from '../toast'
import { registerUser } from '../firebaseConfig';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    async function register() {
        if (password !== cpassword) {
            return toast('Passwords do not match');
        }
        if (username.trim() === '' || password.trim() === '') {
            return toast('Username and password are required');
        }

        const res = await registerUser(username, password);
        if (res) {
            toast('You have registered successfully!')
        }

    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput placeholder="Username"
                    onIonChange={(e: any) => setUsername(e.target.value)} />
                <IonInput
                    type='password'
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)} />

                <IonInput
                    type='password'
                    placeholder="Confirm Password"
                    onIonChange={(e: any) => setCPassword(e.target.value)} />


                <IonButton onClick={register} color={'success'}>Register</IonButton>

                <p> Already have an account? <Link to="/login">Login</Link> </p>

            </IonContent>
        </IonPage>
    );
}

export default Register;