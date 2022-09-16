import React from 'react';

class Register extends React.Component  {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name:'',
		}
	}

	onEmailChanges = (event) => {
		this.setState({email:event.target.value})
	}
	onNameChanges = (event) => {
		this.setState({name:event.target.value})
	}

	onPasswordChanges = (event) => {
		this.setState({password:event.target.value})
	};

	onSubmitSignin = () => {
		fetch('https://nameless-lake-46715.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify ({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name,
			})
		})
		.then(response => response.json())
		.then(console.log())
		.then(user => {
			    console.log(this.state.user);

        if(user.id) {
        	console.log('gothere')
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
	}

	render() {
		return(
			<article className="br3 shadow-5 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
				<main className="pa4 black-80">
				   <div className="measure ">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input onChange={this.onNameChanges} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"></input>
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input onChange={this.onEmailChanges} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"></input>
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input onChange={this.onPasswordChanges} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"></input>
					      </div>
					    </fieldset>
					    <div className="">
					      <input onClick={this.onSubmitSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"></input>
					    </div>
				   </div>
				</main>
			</article>
		);
	}
	
}




export default Register;