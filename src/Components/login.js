import React from 'react';
import { Redirect } from 'react-router';
import './login.css';


export class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            touched: {},
            formSubmitted: false,
            isCookie: false
        }
        this.submituserLoginForm = this.submituserLoginForm.bind(this);
    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,
        });
    }


    handleTouch(e) {
        let { touched } = this.state;
        if (e.target.name && touched[e.target.name] !== true) {
            touched[e.target.name] = true;
            this.setState({
                touched
            });
        }
    }

    setCookie(cname, cvalue) {
        return document.cookie = cname + "=" + cvalue + ";"
    }
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }
        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^(\w{8,50})$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphanumeric values between 8 to 50 characters";
            }
        }
        if (!fields["emailid"]) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
        }
        if (typeof fields["emailid"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailid"])) {
                formIsValid = false;
                errors["emailid"] = "*Please enter valid email-ID.";
            }
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/)) {
                formIsValid = false;
                errors["password"] = "*Password should have atlease one special character & numeric value between 8 to 50 characters";
            }
        }
        this.setState({
            errors: errors
        });
        if(formIsValid === true) {
            this.setCookie("login", JSON.stringify(this.state.fields))
        }
    }

    submituserLoginForm(e) {
        e.preventDefault();
        this.setState({
            formSubmitted: true,
        }, () => {
            if (this.validateForm()) {
                let fields = {};
                fields["username"] = "";
                fields["emailid"] = "";
                fields["password"] = "";
                this.setState({ fields: fields });
            }
            console.log(this.state)
        });
        
    }
    
    render() {
        if (this.state.formSubmitted === true && this.getCookie("login") && JSON.parse(this.getCookie("login"))) {
            return <Redirect to='/home' />
                    
        }
        return (
            <div className="main-container">
                <div className="login">
                    <h3>Login page</h3>
                    <form name="userLoginForm" onSubmit={this.submituserLoginForm}>
                        <label>User Name</label>
                        <input type="text" name="username" value={this.state.fields.username}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            this.state.formSubmitted || this.state.touched.username
                                ?
                                <div className="errorMsg">{this.state.errors.username}</div>
                                :
                                ''
                        }
                        <label>Email ID</label>
                        <input type="text" name="emailid" value={this.state.fields.emailid}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            this.state.formSubmitted || this.state.touched.emailid
                                ?
                                <div className="errorMsg">{this.state.errors.emailid}</div>
                                :
                                ''
                        }
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.fields.password}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            this.state.formSubmitted || this.state.touched.password
                                ?

                                <div className="errorMsg">{this.state.errors.password}</div>
                                :
                                ''
                        }
                        <input type="submit" className="button" value="Login"
                            disabled={
                                !this.state.fields.username || !this.state.fields.emailid || !this.state.fields.password ||
                                this.state.errors.password || this.state.errors.emailid || this.state.errors.username
                            } />
                    </form>
                </div>
            </div>
        );
    }
}