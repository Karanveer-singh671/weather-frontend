import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Form from "./components/Form/Form";
import "./App.css";
import routeTypes from "./Types/routeTypes";
import WeatherCard from "./components/Weather/Weather";
import { signinApi, fetchWeatherApi } from "./api/api";
import { getToken, removeToken } from "./utils/utils";

const initialState = {
	city: "",
	country: "",
	units: "",
	route: routeTypes.signin,
	isSignedIn: false,
	weather: {},
	errors: "",
	show: false,
};
class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}
	componentDidMount() {
		const token = getToken();
		if (token) {
			signinApi(token)
				.then((data) => {
					this.onRouteChange(routeTypes.home);
				})
				.catch((err) => console.log(err));
		}
	}
	resetFields = () => {
		this.setState({ weather: "" });
		this.setState({ show: false });
		this.setState({ errors: "" });
	};
	onInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	onButtonSubmit = () => {
		this.resetFields();
		const token = getToken();
		const { city, country, units } = this.state;
		if (!city) {
			this.setState({ errors: "Please enter a City" });
			return;
		}
		fetchWeatherApi(token, city, country, units)
			.then((weather) => {
				if (weather) {
					this.setState({ weather, show: true });
				} else {
					this.setState({
						errors: "There was an Error getting the Requested City",
					});
				}
			})
			.catch((err) =>
				this.setState({
					errors: "There was an Error getting the Requested City",
				})
			);
	};
	/** react-router-dom would be better for routing than this */
	onRouteChange = (route) => {
		if (route === routeTypes.signout) {
			/** delete token */
			removeToken()
			this.setState(initialState);
		} else if (route === routeTypes.home) {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route });
	};

	render() {
		const {
			isSignedIn,
			route,
			city,
			country,
			units,
			errors,
			weather,
			show,
		} = this.state;
		return (
			<div className="App">
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{route === routeTypes.home ? (
					<div>
						<Form
							onInputChange={this.onInputChange}
							city={city}
							country={country}
							units={units}
						/>
						<button
							className="w-15 grow f4 link ph3 pv2 dib white bg-light-purple"
							onClick={this.onButtonSubmit}
						>
							Search
						</button>
						{errors ? <div>{errors}</div> : null}
						{show ? <WeatherCard weatherData={weather} units={units} /> : null}
					</div>
				) : route === routeTypes.signin ? (
					<Signin onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
