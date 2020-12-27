import React from "react";
import routeTypes from "../../Types/routeTypes";
const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<nav style={{ display: "flex", justifyContent: "flex-end" }}>
				<p
					onClick={() => onRouteChange(routeTypes.signout)}
					className="f3 link dim black underline pa3 pointer"
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<nav style={{ display: "flex", justifyContent: "flex-end" }}>
				<p
					onClick={() => onRouteChange(routeTypes.signin)}
					className="f3 link dim black underline pa3 pointer"
				>
					Sign In
				</p>
				<p
					onClick={() => onRouteChange(routeTypes.register)}
					className="f3 link dim black underline pa3 pointer"
				>
					Register
				</p>
			</nav>
		);
	}
};

export default Navigation;
