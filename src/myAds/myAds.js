import { db, renderSingleAd, getUser, Signout, postAdToDb, auth, onAuthStateChanged, getMyAdsFromDb } from "../config/firebase.js"


let logged_In;
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        // console.log(user);
        // console.log("login kr pehly index");
        const myAds = document.getElementById("myAds")
        myAds.className = "hide"
        window.location = '../../index.html'

    } else {
        // console.log("user in dashboard", user.email)
        getMyAds()
        const userNames = await getUser(user.uid)
        // console.log("name ajao bhai-->", userNames, user.uid)
        if (user.email) {//agar login true too logout show krdo
            var link = document.getElementById("loginBtns");
            link.innerHTML = "Logout";
            logged_In = true
            var userName = document.getElementById("userName"); //user k name 
            userName.innerHTML = userNames.name
            const myAds = document.getElementById("myAds")
            myAds.className = " "
        }
    }
});


// modal start

const modal = document.getElementById('myModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');

openBtn.addEventListener('click', () => {
    if (auth.currentUser == null) {
        // alert("Please Login ")
        Swal.fire('Please Login!');

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


// modal end

window.Login = function () {
    var link = document.getElementById("loginBtns");
    if (link.innerHTML === "Login" && !logged_In) {
        window.location.href = "../login/login.html"
        link.innerHTML = "Logout";
    } else {
        Logout();
        link.innerHTML = "Login";
        userName.innerHTML = "Store ABC"
    }
}
window.Logout = function () {
    Signout()
    window.location.href = '../../index.html'
}


async function getMyAds() {
    const uid = auth.currentUser.uid
    console.log('uid', uid)
    const container = document.getElementById('container')
    const ads = await getMyAdsFromDb(uid)

    // const adId = location.search.split("=")[1]
    // const ad = await renderSingleAd(adId)
    // const user = await getUser(ad.uid)
    // console.log('ad posted user-->', user)
    // console.log('ad details-->', ad)

    setTimeout(() => {
        var loader = document.getElementById("loader");
        loader.className = "hide"
        var content = document.getElementById("content");
        content.className = " "
    }, 2000)
    for (var i = 0; i < ads.length; i++) {
        const ad = ads[i]

        const main = document.getElementById('main')

        var card = document.createElement("div")
        card.className = "card"

        var imgDiv = document.createElement("div")
        imgDiv.className = "img-container"
        var img = document.createElement("img")
        img.setAttribute("id", "cardImage")
        img.style = "width:100%"
        img.style = "height:300px"
        img.src = ad.image
        imgDiv.append(img)
        card.append(imgDiv)

        var divContainer = document.createElement("div")
        divContainer.className = "container"
        var title = document.createElement("h1");
        divContainer.style = "height:340px"
        title.setAttribute("id", "title");
        title.innerHTML = ad.title


        var amount = document.createElement("p");
        amount.setAttribute("id", "price");
        amount.innerHTML = "<b>Price = " + ad.amount + "$</b>";


        var descriptionElement = document.createElement("h3");
        descriptionElement.setAttribute("id", "description");
        descriptionElement.innerHTML = ad.description


        const contact = document.createElement('h3')
        contact.innerHTML = 'Contact Information'

        // const username = document.createElement('h4')
        // username.innerHTML = user.fullname || user.name

        const phoneNumber = document.createElement('p')
        // phoneNumber.innerHTML = user.phoneNumber || "Number not given  "


        divContainer.append(title)
        divContainer.append(descriptionElement)
        divContainer.append(amount)
        divContainer.append(contact)
        // divContainer.append(username)
        // divContainer.append(phoneNumber)
        // divContainer.append(addCartBtn)

        card.append(divContainer);

        main.append(card)
    }
}