import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



// const config = {
//     apiKey: ,
//     authDomain: secrets.authDomain,
//     projectId: secrets.projectId,
//     storageBucket: secrets.storageBucket,
//     messagingSenderId: secrets.messagingSenderId,
//     appId: secrets.appId,
//     measurementId: secrets.measurementId
// };

const config ={
    apiKey: "AIzaSyAK7pxYHqK6jheDwVLs97USxB0qz0_3Z-Q",
    authDomain: "shop-app-620fe.firebaseapp.com",
    projectId: "shop-app-620fe",
    storageBucket: "shop-app-620fe.appspot.com",
    messagingSenderId: "157366671482",
    appId: "1:157366671482:web:e0cf93293c67e09d61c3c3",
    measurementId: "G-43TFWVXDB5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth)
        return;
    
    // console.log('user ',userAuth.uid);

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error){
            console.log('error occured while creating the user ',error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);
console.log( );
//export auth and firestore for use in project 
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google Sign In
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

// provider.setCustomParameters({
//     'login_hint': 'user@example.com'
//   });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;
