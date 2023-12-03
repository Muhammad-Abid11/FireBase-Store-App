import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

import { getDocs, collection, addDoc, getDoc, getFirestore, doc, setDoc, query, where } from
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD9ObDXV4gHIfK6EH1V2rfPIZK2pMfh1sE",
    authDomain: "fir-store-b10-257cb.firebaseapp.com",
    projectId: "fir-store-b10-257cb",
    storageBucket: "fir-store-b10-257cb.appspot.com",
    messagingSenderId: "57831018633",
    appId: "1:57831018633:web:7ce8d1288647e9e6d63658",
    measurementId: "G-9LSGK8NEDZ"
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
// render allAds Start-----------------------------

async function renderAds() {
    const querySnapshot = await getDocs(collection(db, "ads"));
    const ads = []
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const ad = { id: doc.id, ...doc.data() } //new object with "id" and other "data" 
        ads.push(ad)
    });
    return ads

}
// render allAds end-----------------------------
// render singleAds start-----------------------------

async function renderSingleAd(adId) {

    const docRef = doc(db, "ads", adId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const ads = docSnap.data()
        return ads
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
// render singleAds end-----------------------------
// render PostADs start-----------------------------
async function postAdToDb(ad) {
    try {
        const storageRef = ref(storage, `ads/${ad.image.name}`);
        await uploadBytes(storageRef, ad.image)
        const url = await getDownloadURL(storageRef)
        ad.image = url

        const res = await addDoc(collection(db, "ads"), ad)
        alert('Data added successfully!')
    } catch (e) {
        alert(e.message)
    }

}
// render PostADs end-----------------------------
// render MyAds Start-----------------------------
async function getMyAdsFromDb(uid) {
    const adsRef = collection(db, "ads")
    const querySnapshot = await getDocs(query(adsRef, where("uid", "==", uid)))
    const ads = []
    querySnapshot.forEach((doc) => {
        const ad = { id: doc.id, ...doc.data() }

        ads.push(ad)
    });

    return ads
}

// render MyAds end-----------------------------

export {
    getMyAdsFromDb,
    postAdToDb,
    renderSingleAd,
    renderAds,
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