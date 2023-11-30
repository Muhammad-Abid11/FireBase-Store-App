import { auth, onAuthStateChanged, Signout, getUser, renderAds } from "./src/config/firebase.js";

let logged_In;
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        console.log(user);
        console.log("login kr pehly index");
    } else {
        console.log("user in dashboard", user.email)
        // window.location = '../../index.html'

        const userNames = await getUser(user.uid)
        // console.log("name ajao bhai-->", userNames, user.uid)
        if (user.email) {//agar login true too logout show krdo
            var link = document.getElementById("loginBtns");
            link.innerHTML = "Logout";
            logged_In = true
            var userName = document.getElementById("userName"); //user k name 
            userName.innerHTML = userNames.name
        }
    }
});

window.Login = function () {
    var link = document.getElementById("loginBtns");
    if (link.innerHTML === "Login" && !logged_In) {
        window.location.href = "./src/login/login.html"
        link.innerHTML = "Logout";
    } else {
        Logout();
        link.innerHTML = "Login";
        userName.innerHTML = "Store ABC"

    }
}
window.Logout = function () {
    Signout()
    window.location = './index.html'

}


// var count = 0
async function getData() {

    const products = await renderAds()
    console.log("data-->", products);
    // console.log(products[count])
    // down render products
    // ------hide loader and display content
    setTimeout(() => {
        var loader = document.getElementById("loader");
        loader.className = "hide"
        var content = document.getElementById("content");
        content.className = " "
    }, 2000)
    for (let i = 0; i < products.length; i++) {

        var main = document.getElementById("main")
        //upper main ko target krliya
        var divCard = document.createElement("div")
        divCard.className = "card"

        divCard.onclick = function () {
            // yhn humne query param"?""  use kiya hai 
            //? k bad "productid" ye 1 variable hai jis me  
            window.location.href = "./src/product_details/details.html?productid=" + products[i].id
        }
        //upper ab card k liye div bana hai or ishi me sb ab hongy

        // ab image/description bana kr k divCard k sath connect krna hai
        // ---------------down image
        var imgElement = document.createElement("img")
        imgElement.setAttribute("id", "cardImage")
        imgElement.style = "width:100%"
        imgElement.src = products[i].image
        // console.log(imgElement)
        divCard.append(imgElement)
        // ---------------

        // ab div banao jhn details hongi
        var divContainer = document.createElement("div")
        divContainer.className = "container"
        var h4 = document.createElement("h4");
        h4.setAttribute("id", "title");
        h4.innerHTML = products[i].title
        // console.log(h4)

        var descriptionElement = document.createElement("p");
        descriptionElement.setAttribute("id", "description");
        descriptionElement.innerHTML = products[i].description
        // console.log(descriptionElement)

        var priceElement = document.createElement("p");
        priceElement.setAttribute("id", "price");
        priceElement.innerHTML = products[i].amount + "$";
        // console.log(priceElement)

        // create addCartBtn
        var addCartBtn = document.createElement("button");
        addCartBtn.innerHTML = "Add to Cart"
        addCartBtn.className = "addBtn"

        // divContainer me heading price or description add kro
        divContainer.append(h4)
        // divContainer.append(descriptionElement)
        divContainer.append(priceElement)
        // console.log(divContainer)

        // ab image(upper connect hai)/description bana kr k divCard k sath connect krna hai
        divContainer.append(addCartBtn)
        divCard.append(divContainer);
        // console.log(divCard)

        main.append(divCard) //now connect with main div
    }

}
getData()