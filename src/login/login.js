import { login, onAuthStateChanged, auth } from "../config/firebase.js";
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        window.location = '../../index.html'
    } else {
        console.log("login kr pehly ");
    }
});

window.onLogin = function () {
    const allInputs = document.getElementsByTagName("input");
    const email = allInputs[0].value;
    const password = allInputs[1].value;

    const data = {
        email,
        password
    }
    login(data)
}
