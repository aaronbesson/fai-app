export const WPLogin = (email, password) => {
    fetch('http://192.168.10.178/filterandindustrial/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then((response) => response.json())
    .then((res) => {
        this.setState({ loading: false });
        console.log(res);
        if(res.token) {
            this._onWPLoginSuccess.bind(this, [res.token])
        } else {
            this._onWPLoginFailure.bind(this, [res.message])
        }
    })
    .catch((error) => {
        console.error(error);
    });
}