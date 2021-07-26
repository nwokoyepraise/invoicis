'use strict';

class user {
    constructor(email, password) {
        this.email = email;
        this.password = String(password);
    }

    check_data() {
        const valid_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //const valid_phone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        
        if (!valid_email.test(this.email) || this.password.length < 8) {return false;}
        return true;
    }
    check_password(){
        if (this.password.length < 8) {
            return false;
        }
        return true;
    }
}

module.exports = user;