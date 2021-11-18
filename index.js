import fetch from "node-fetch"
import crypto from "crypto"

class Moon {
    constructor(token) {
        this.token = token
    }
    createSession(email) {
        return fetch('https://api.moonauth.com/v1/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token,
            },
            body: JSON.stringify({
                email: email,
            }),
        }).then(response => {
            const secret = crypto.randomBytes(32).toString('hex')
            document.cookie = `__moon_ec=${secret}; secure; httponly;`
        })
    }
        // Create secure encryption secret
    }
    getSession(lookup) {
        return fetch('https://api.moonauth.com/v1/lookup', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token,
            },
            body: JSON.stringify({
                lookup: lookup,
            }),
        })
    }
    verifySession() {
        return fetch('https://api.moonauth.com/v1/session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token,
            },
        })
    }
    deleteSession(lookup) {
        return fetch('https://api.moonauth.com/v1/session', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token,
            },
            body: JSON.stringify({
                lookup: lookup,
            }),
        })
    }
}

const m = new Moon('A')

m.createSession('gralka.dominik@gmail.com').then(res => {
    console.log(res)
})