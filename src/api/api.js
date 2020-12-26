export const fetchWeatherApi = async (token, city, country, units) => {
	return await fetch(
		`http://localhost:5000/weather?city=${encodeURIComponent(
			city
		)}&country=${encodeURIComponent(country)}&units=${encodeURIComponent(
			units
		)}`,
		{
			method: "get",
			headers: { "Content-Type": "application/json", Authorization: token },
		}
	)
		.then((response) => response.json())
		.catch((err) => console.log(err));
};
export const signinApi = async (token) => {
	return await fetch("http://localhost:5000/signin", {
		method: "post",
		headers: { "Content-Type": "application/json", Authorization: token },
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export const initialSignInApi = async (email, password) => {
	return await fetch("http://localhost:5000/signin", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			password,
		}),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};
export const initialRegisterApi = async (email, password, name) => {
	return await fetch("http://localhost:5000/register", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			password,
			name,
		}),
	})
		.then((response) => response.json())
};
