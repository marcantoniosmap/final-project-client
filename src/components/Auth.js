class Auth{
    constructor(){
        const tempToken = JSON.parse(localStorage.getItem("login"));
        if (localStorage.getItem("login")){
            this.authToken=tempToken.token;
            this.userId=tempToken.id;
            this.isAuthenticated=true;

        }else{
            this.authToken="";
            this.isAuthenticated=false;
            this.userId=""
        }
    }
    authenticate() {
        this.isAuthenticated = true;
    }
    signout() {
        this.isAuthenticated = false;
        localStorage.removeItem("login");
        this.authToken="";
        this.userId="";
    }
    getAuth() {
        return this.isAuthenticated;
    }
    getAuthToString(){
        return this.isAuthenticated ? "Logged in" : "Not logged in";
    }
    setToken(token){
        this.authToken=token;
        this.authenticate();
    }
    getAuthToken(){
        return this.authToken;
    }
    setUserId(id){
        this.userId=id;
    }
    getUserId(){
        return this.userId
    }
};
export default Auth;