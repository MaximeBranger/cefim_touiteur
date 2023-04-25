export default class localStorageUtil {

    static isKeyExists(key) {
        return localStorage[key];
    }

    static isStoredInList(key, value) {
        return (localStorageUtil.getItem(key).includes(value) )
    }

    static getItem(key, def="") {
        if (localStorageUtil.isKeyExists(key)) {
            return JSON.parse(localStorage[key]);
        } else {
            return def;
        }
    }

    static addItemToList(key, value) {
        let localValues = localStorageUtil.getItem(key, []);
        if (!localStorageUtil.isStoredInList(key, value)) {
            localValues.push(value);
        }
        localStorage.setItem(key, JSON.stringify(localValues));
    }

    static addItem(key, value) {
        const localValues = value;
        localStorage.setItem(key, JSON.stringify(localValues));
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

    static removeItemFromList(key, value) {
        let localValues = localStorageUtil.getItem(key);
        localValues = localValues.filter(i => i !== value);
        localStorage.setItem(key, JSON.stringify(localValues));
    }

}