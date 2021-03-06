import React from "react";
import { initialSignInApi } from "../../api/api";
import { saveAuthTokenInSession } from "../../utils/utils";
class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
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
		const { email, password } = this.state;
		initialSignInApi(email, password)
			.then((data) => {
				if (data.user && data.token) {
					saveAuthTokenInSession(data.token);
					this.props.onRouteChange("home");
				} else {
					this.setState({ errors: "Wrong Credentials" });
				}
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { onRouteChange } = this.props;
		const { errors } = this.state;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
								value="Sign in"
							/>
						</div>

						<div className="lh-copy mt3">
							<p
								onClick={() => onRouteChange("register")}
								className="f6 link dim black db pointer"
							>
								Register
							</p>
							{errors ? <div>{errors}</div> : null}
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Signin;
