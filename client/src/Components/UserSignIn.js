import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Form from './Form'

//Take credentials provided in form and submit to data base. Compare them using a helper method getUser in Data.js and authenticate if there is a match.
class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
      }
    render(){
        const {
            emailAddress,
            password,
            errors,
          } = this.state;
        return(
            <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Sign In"
                  elements={() => (
                    <React.Fragment>
                    <label>Email Address</label>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        value={emailAddress}
                        onChange={this.change}
                        placeholder="Email Address" />                       
                        <label>Password</label>  
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.change}
                        placeholder="Password" />
                    </React.Fragment>
                  )} />
                <p>Don't have a user account? Click here to <NavLink to="/signup">sign up!</NavLink></p>
            </div>
        </main>
        )
    }


    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }
  
    submit = () => {

      const { context } = this.props;
      const { emailAddress, password } = this.state;
  
      context.actions.signIn(emailAddress, password)
        .then((user) => {
          if (user === null) {
            this.setState(() => {
              return { errors: [ 'Sign-in was unsuccessful' ] };
            });
          } else {
            // this.setState(() => {
            //   return { password: password}
            // })
            this.props.history.push('/');
          }
        })
        .catch((error) => {
          console.error(error);
          this.props.history.push('/error');
        });
    }
  
    cancel = () => {
      this.props.history.push('/');
    }
  }

  export default withRouter(UserSignIn)