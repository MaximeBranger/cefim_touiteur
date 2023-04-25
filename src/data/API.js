export default class API {

    static apiURL = "";
    
    static async getAllTouits(ts, onSuccess, onError) {
        await fetch(API.apiURL+"/list?ts="+ts, {
            method: "GET"
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }
    
    static async getOneTouit(id, onSuccess, onError) {
        await fetch(API.apiURL+"/get?id="+id, {
            method: "GET"
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async getTrendTouits(count, onSuccess, onError) {
        await fetch(API.apiURL+"/likes/top?count="+count, {
            method: "GET"
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async getKeywords(onSuccess, onError) {
        await fetch(API.apiURL+"/trending", {
            method: "GET"
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async getInfluencers(count, onSuccess, onError) {
        await fetch(API.apiURL+"/influencers?count="+count, {
            method: "GET"
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async addLike(id, onSuccess, onError) {
        await fetch(API.apiURL+"/likes/send", {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "message_id="+id, 
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }
    
    static async removeLike(id, onSuccess, onError) {
        await fetch(API.apiURL+"/likes/remove", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "message_id="+id, 
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async sendTouit(name, message, onSuccess, onError) {
        await fetch(API.apiURL+"/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "name="+name+"&message="+message, 
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async sendTouitAuth(token, message, onSuccess, onError) {
        await fetch(API.apiURL+"/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer "+token
            },
            body: "message="+message, 
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async getComments(id, onSuccess, onError) {
        await fetch(API.apiURL+"/comments/list?message_id="+id, {
            method: "GET"
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }
    
    static async sendComment(id, name, message, onSuccess, onError) {
        await fetch(API.apiURL+"/comments/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "message_id="+id+"&name="+name+"&comment="+message, 
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async getAvailableReactions(onSuccess, onError) {
        await fetch(API.apiURL+"/reactions/allowed", {
            method: "GET"
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }
  
    static async addReaction(id, symbol, onSuccess, onError) {
        await fetch(API.apiURL+"/reactions/add", {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "message_id="+id+"&symbol="+symbol, 
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    } 

    static async userCreate(username, password, onSuccess, onError) {
        await fetch(API.apiURL+"/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "username="+username+"&password="+password, 
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }

    static async userLogin(username, password, onSuccess, onError) {
        await fetch(API.apiURL+"/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "username="+username+"&password="+password, 
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }
        
    static async getUserInformation(token, onSuccess, onError) {
        await fetch(API.apiURL+"/user/me", {
            method: "GET",
            headers: {
              "Authorization": "Bearer "+token
            }
        })
        .then(
            response => response.json()
        )
        .then(
            response => onSuccess(response)
        )
        .catch(
            error => onError(error)
        );
    }
}