import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = 'http://172.18.0.162:9000'

        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }
    login(username, password) {
        const programid = 149;
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                programid,
            })
        }).then(res => {

            if (res.accessapp === true) {
               
                this.setToken(res.token)
                // this.setAccess(res.accessmenu)
                localStorage.setItem('accessmenu', JSON.stringify(res.accessmenu))
                localStorage.setItem('access', (res.access))

                return Promise.resolve(res);
            } else {
                return Promise.resolve(res);
            }
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            //console.log(decoded);
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('id_token');
                localStorage.removeItem('access');
                localStorage.removeItem('accessmenu');
                return true;
            }
            else {

                return false;
            }
        }
        catch (err) {
            return false;
        }
    }

    getAccess() {
        // Retrieves the user token from localStorage

        if (typeof localStorage.getItem('accessmenu') == "object") {

            return 0
        } else {

            return localStorage.getItem('accessmenu')
        }

    }

    getAccessadmin() {
        // Retrieves the user token from localStorage

        if (typeof localStorage.getItem('access') == "object") {

            return 0
        } else {

            return localStorage.getItem('access')
        }

    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('access');
        localStorage.removeItem('accessmenu');
    }

    getProfile() {
        //return decode(this.getToken());
        //console.log(this.getToken());
        try {
            var Pro = null;
            var Pro = decode(this.getToken());
            return Pro
            // valid token format
        } catch (error) {
            // invalid token format
            console.log(error);
        }


    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }
    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}