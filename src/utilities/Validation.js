export default class Validation {

    static userRegister(username, password, password_confirmation) {
        const errors = [];
        
        if (username.length < 3) {
            errors.push(['name', "error.name.too_short"])
        }

        if (username.length > 16) {
            errors.push(['name', "error.name.too_long"])
        }

        if (password.length < 8) {
            errors.push(['password', "error.password.too_short"])
        }

        if (password !== password_confirmation) {
            errors.push(['password', "error.password.confirmation"])
        }

        if (errors.length > 0) {
            return errors;
        }  

        return true;
    }

    static sendTouit(name, message) {
        const errors = [];

        if (name.length < 3) {
            errors.push(['name', "error.name.too_short"])
        }

        if (name.length > 16) {
            errors.push(['name', "error.name.too_long"])
        }

        if (message.length < 3) {
            errors.push(['message', "error.message.too_short"])
        } 

        if (message.length > 256) {
            errors.push(['message', "error.message.too_long"])
        } 

        if (errors.length > 0) {
            return errors;
        }

        return true;
    }

    static sendComment(name, message) {
        const errors = [];

        if (name.length < 3) {
            errors.push(['name', "error.name.too_short"])
        }

        if (name.length > 16) {
            errors.push(['name', "error.name.too_long"])
        }

        if (message.length < 3) {
            errors.push(['message', "error.message.too_short"])
        } 

        if (message.length > 256) {
            errors.push(['message', "error.message.too_long"])
        } 

        if (errors.length > 0) {
            return errors;
        }

        return true;
    }

    static sendReaction(symbol, symbols) {
        const errors = [];
        if (symbols.every(s => s !== symbol)) {
            errors.push(['symbole', "error.reaction.unauthorized"])
        }

        if (errors.length > 0) {
            return errors;
        }

        return true;
    }
}