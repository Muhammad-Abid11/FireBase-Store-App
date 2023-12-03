import {
    storage, auth, db, collection, addDoc, ref, uploadBytes,
    getDownloadURL, postAdToDb
} from "./src/config/firebase.js"



const modal = document.getElementById('myModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');

openBtn.addEventListener('click', () => {
    if (auth.currentUser == null) {
        alert("Please Login ")
    } else {
        modal.style.display = 'block';
    }
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log("submit working...")

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
    // console.log("ad k object-->", ad)
    postAdToDb(ad)

    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].value = ''
    }

})

