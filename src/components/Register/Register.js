import React from "react";
import { saveAuthTokenInSession } from "../../utils/utils";
import { initialRegisterApi } from "../../api/api";
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: "",
			errors: "",
		};
	}

	clearErrors = () => {
		this.setState({ errors: "" });
	};

	onInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	onSubmitSignIn = () => {
		this.clearErrors();
		const { email, password, name } = this.state;
		if (!email || !password || !name) {
			this.setState({ errors: "Please fill out all fields" });
		}
		initialRegisterApi(email, password, name)
			.then((data) => {
				if (data.token) {
					saveAuthTokenInSession(data.token);
					this.props.onRouteChange("home");
				} else {
					this.setState({
						errors: `${data.errors[0] ? data.errors[0].msg : ""}. ${
							data.errors[1] ? data.errors[1].msg : ""
						}`,
					});
				}
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { errors } = this.state;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">
									Name
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="text"
									name="name"
									id="name"
									onChange={this.onInputChange}
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email"
									id="email-address"
									onChange={this.onInputChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onInputChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={this.onSubmitSignIn}
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Register"
							/>
						</div>
						{errors ? <div>{errors}</div> : null}
					</div>
				</main>
			</article>
		);
	}
}

export default Register;
