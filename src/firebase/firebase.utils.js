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
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId:  process.env.REACT_APP_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:  process.env.REACT_APP_APP_ID,
    measurementId:  process.env.REACT_APP_MESUREMENT_ID
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
