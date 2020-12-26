import React from "react";
import "./Weather.css";
import {convertUnits} from "../../utils/utils";

const WeatherCard = ({ weatherData, units }) => {
	const {
		weather,
		main: { temp },
		sys: { country },
		name,
	} = weatherData;
  const { icon, description } = weather[0];
	units = convertUnits(units);
	return (
		<div className="weather">
      <img className="image" src={require(`../../assets/${icon}.png`)} alt="icon" />
			<div className="weather-text">
				<h1>
					{name}, {country}
				</h1>
				<h3>
					Temperature Outside : {temp} {units}
				</h3>
				<h3>Mainly {description}</h3>
			</div>
		</div>
	);
};

export default WeatherCard;
