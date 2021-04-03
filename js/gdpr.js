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

    const acceptFn = event => {
        saveToStorage(storageType);
        consentPopup.classList.add("hidden");
        dataLayer.push({'event': 'accepted'});
    }

    acceptBtn.addEventListener("click", acceptFn);

    if(shouldShowConsent()) {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 500);
    }else{
        dataLayer.push({'event': 'accepted'});
    }
};