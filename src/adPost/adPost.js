
import { storage, auth, db, collection, addDoc, ref, uploadBytes, getDownloadURL } from "../config/firebase.js"
window.onSubmit = function () {
    const uid = auth.currentUser.uid //Authentication
    const allInputs = document.getElementsByTagName('input')
    const title = allInputs[0].value
    const description = allInputs[1].value
    const amount = allInputs[2].value
    const image = allInputs[3].files[0]

    const ad = {
        title,
        description,
        amount,
        image,
        uid
    }
    postAdToDb(ad)
}

async function postAdToDb(ad) {
    try {
        const storageRef = ref(storage, `ads/${ad.image.name}`); //picture k refrence create kro
        await uploadBytes(storageRef, ad.image) //or phir usy upload krdo
        const url = await getDownloadURL(storageRef) //us file k download kr k
        ad.image = url //image k jagah dal do 

        await addDoc(collection(db, "ads"), ad) //or firebase DataBase me uski link rakho
        alert('Data added successfully!')
    } catch (e) {
        alert(e.message)
    }

}
