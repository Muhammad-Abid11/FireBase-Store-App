import { signUp, onAuthStateChanged, auth } from "../config/firebase.js";
/* onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log(user);
        // window.location = '../login/login.html'

        console.log("login kr pehly register");
    } else {
        window.location = '../../index.html'
    }
});

 */
window.onSignup = function () {
    const allInputs = document.getElementsByTagName("input")
    const fullname = allInputs[0].value
    const email = allInputs[1].value
    const password = allInputs[2].value
    const confirmPassword = allInputs[3].value

    if (!fullname || !email || !password || !confirmPassword) {
        // alert("Please fill all the inputs!")
        Swal.fire("Please fill all the inputs!")
        return
    }
    if (fullname.length === 1) {
        // alert("enter your fullname atleast 2 letters")
        Swal.fire("enter your fullname atleast 2 letters")
        return
    }
    if (email.trim().indexOf(" ") !== -1) {
        // alert("No spaces allowed in address");
        Swal.fire("No spaces allowed in address");
        return;
    }
    if (email.indexOf("@") < 1 || email.indexOf("@") > email.length - 5) {
        // alert("Please correct email address");
        Swal.fire("Please correct email address");
        return;

    }
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;
    if (!(email.match(regex))) {
        // alert("Please correct email address");
        Swal.fire("Please correct email address");
        return

    }

    if (password !== confirmPassword) {
        // alert('Password is not matchable with confirm password!')
        Swal.fire('Password is not matchable with confirm password!')
        return
    }

    const data = {
        name: fullname,
        password: password,
        email: email
    }

    signUp(data)


    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].value = ''
    }

    // window.location.href = "../login/login.html"
}