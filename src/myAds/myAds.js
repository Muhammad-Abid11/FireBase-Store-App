import { auth, onAuthStateChanged, getMyAdsFromDb } from "../config/firebase.js"

onAuthStateChanged(auth, (user) => {
    if (user) {
        getMyAds()
    } else {
        // User is signed out
        // ...

        location.href = '../../login.html'
    }
})

async function getMyAds() {
    const uid = auth.currentUser.uid
    console.log('uid', uid)
    const container = document.getElementById('container')

    const ads = await getMyAdsFromDb(uid)

    for (var i = 0; i < ads.length; i++) {
        const ad = ads[i]

        const card = document.createElement('div')
        card.className = 'card'
        card.onclick = function () {
            location.href = '../detail/detail.html?adId=' + ad.id
        }

        const img = document.createElement('img')
        img.src = ad.image
        img.style.width = '100px'
        img.style.height = '100px'

        const title = document.createElement('h3')
        title.innerHTML = ad.title

        const amount = document.createElement('h4')
        amount.innerHTML = `Rs. ${ad.amount}`

        card.append(img)
        card.append(title)
        card.append(amount)

        container.append(card)
    }
}