const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
            .split(";")
            .map(cookie => cookie.split("="))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value}), {});
        return cookies[key];
    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value}`
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
        dataLayer.push({'event': 'accepted'});
    }
    const declineFn = event => {
        consentPopup.classList.add("hidden");
    }

    acceptBtn.addEventListener("click", acceptFn);
    declineBtn.addEventListener("click", declineFn);

    if(shouldShowConsent()) {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 100);
    }else{
        dataLayer.push({'event': 'accepted'});
    }
};