export const convertUnits = (units) => {
	if (units.toLowerCase() === "metric") {
		units = "Celsius";
	} else if (units.toLowerCase() === "imperial") {
		units = "Fahrenheit";
	} else {
		units = "Kelvin";
	}
	return units;
};

export const getToken = () => {
	return window.sessionStorage.getItem("token");
};

export const saveAuthTokenInSession = (token) => {
	return window.sessionStorage.setItem("token", token);
};

export const removeToken = () => {
	return window.sessionStorage.removeItem("token");
};
