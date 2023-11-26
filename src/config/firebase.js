import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

import { collection, addDoc, getDoc, getFirestore, doc, setDoc } from
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCgjnXV8W571cXPC3OuAiK_BBX0o2nvYlI",
    authDomain: "fir-store-b10.firebaseapp.com",
    projectId: "fir-store-b10",
    storageBucket: "fir-store-b10.appspot.com",
    messagingSenderId: "252132914537",
    appId: "1:252132914537:web:2d3cad2c487da67c5eb9f8",
    storageBucket: ''

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);


// signup start-----------------------------

async function signUp(data) {
    // console.log("user sign in firebase-->", data)
    const { email, name, password } = data
    // console.log("user sign in firebase-->", name, email, password)
    try {

        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = await userCredential.user;
        // console.log("user-->", user.uid)

        await setDoc(doc(db, "users", userCredential.user.uid), {
            name,
            email
        });

        alert("User Registered Successfully")
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error dekh bhai -->", errorMessage)
    }
}
// signup end-----------------------------
// login start-----------------------------

async function login(data) {
    const { email, password } = data

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("User Login SuccessFully")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error dekho-->", errorMessage)
        });
}

// login end-----------------------------
// signOut Start-----------------------------
function Signout() {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
// signOut end-----------------------------
// getUser start-----------------------------

async function getUser(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

// getUser end-----------------------------



export {
    signUp,
    login,
    onAuthStateChanged,
    auth,
    Signout,
    getUser,
    ref,
    uploadBytes,
    storage,
    addDoc,
    collection,
    db,
    getDownloadURL
}