const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
            .split(";")
            .map(cookie => cookie.split("="))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value}), {});
        return cookies[key];
    },
    setItem: (key, value) => {
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000*36000;
        now.setTime(expireTime);
        document.cookie = `${key}=${value};max-age=63072000;path=/`;
    }
}

const storageType = cookieStorage;
const consentPropertyName = "abeat_consent";
const shouldShowConsent = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
    const consentPopup = document.getElementById("consent-popup");
    const acceptBtn = document.getElementById("suhlas-button");
    const declineBtn = document.getElementById("nesuhlas-button");

    const acceptFn = event => {
        saveToStorage(storageType);
        consentPopup.classList.add("hidden");
        fireEvents();
    }
    const declineFn = event => {
        consentPopup.classList.add("hidden");
    }

    function fireEvents() {
        dataLayer.push({'event': 'accepted'});

        if (window.location.href.includes("artbeat.sk/20")){
            dataLayer.push({'event': 'article'});
        }
    }

    acceptBtn.addEventListener("click", acceptFn);
    declineBtn.addEventListener("click", declineFn);

    if(shouldShowConsent()) {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 100);
    }else{
        fireEvents();
    }
};