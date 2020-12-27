## Notes
*Please do not supply your name or email address in this document. We're doing our best to remain unbiased.*
*Dear reader, this document is better read with caffeine in your system*
### Date
December 26, 2020
### Location of deployed application
If applicable, please provide the url where we can find and interact with your running application.
[Weather-Application](https://thinkific-weather-app.herokuapp.com/)

### Time spent
Time Frontend: ~ 6 - 7 hr
Time Backend: ~ 8 hr
Deployment: ~ 2.5 - 3 hr
### Assumptions / Questions
Use this section to tell us about any assumptions that you made when creating your solution.
1. Used Open Weather API to get weather data (cannot guarantee third party APIs to always be reliable)
2. Assumed that optional additional arguments would be allowed on the frontend such as country and units (default is Kelvin)
3. Would City Name be enough to get accurate results from the API? (City Id
would be the most optimal parameter to consume as it is unique. Whereas with this implementation there are cases where the same city name is within the same country leading to ambiguous results.) Refer to (#16 in shortcuts / compromises / not include in solution that should have.)
1. What data do I Return? The entire response was not needed so many keys were filtered from the API response. 
For the purposes of this project I assumed that 'city name',country, temperature, and a description would be sufficient
(if there is a case where more information e.g humidity is required then that can easily be added)
5. Question that came when building the frontend would be How should I manage the state? within each component, redux, or hooks. Since the application was relatively small I opted to store state within each component however if this were to be
expanded upon then it would be wise to think about implementing a state management solution especially as the files get more bloated like register.js, signin.js and app.js so we would use e.g redux
1. Question that came up for building the backend was what database to use to implement authentication. I opted to use PostgreSQL. Currently the project only has a users table so at the moment MongoDB with mongoose models would likely have been a better choice as a user could just be represented as a document object (since there are no table relations in our PG database (no relations)). However, if this application were to be expanded upon e.g like adding a profile for each user, favorite cities of a user, commenting about the weather in a specific city or storing a user's recently queried weather then PostgreSQL would provide the table relations necessary to make that happen. 

### Shortcuts / Compromises made / What did you not include in your solution that you want us to know about?
If applicable. Did you do something that you feel could have been done better in a real-world application? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
1. Did not add a migration file for the created PG table. In the future if there were more tables, working in a dev team or having more table relations then adding migration files would be a must since we need to provide a consistent schema for each person's local environment and an easy way to rollback migration files. We could also alternatively containerize our application using something like Docker. This way our application would be run independent of our local environment's packages, database, caching, and versions. There is less setup involved for each developer that joins this project if it's containerized.
2. The app.js file and components are starting to get bloated, if it was expanded any further I would create a redux store
and manage state through this (actions, middlewares reducers, state of application ). If certain computation is being done over and over causing components to re-render when they don't need to be, I would look into using redux selectors to memoize the computed values. 
3. If this application expands to more pages or more components per page we would look into lazy loading components
4. Did not have time include responsive front end design (could have been achieved through media queries, Flexbox)
5. Did not include testing but Testing should have definitely been implemented (frontend tests could be done through
Enzyme / Jest, backend testing could be done with Jest if looking for an all in one solution, if looking for more flexibility w/ tests could use a combination of Mocha, Chai assertions, and Sinon )
6. In my current implementation after 2 hours a user's JWT Token expires and to get a valid access token they need to 
sign in and re-authenticate again to access the protected API routes and there is no way to blacklist a JWT Token with my implementation. A way to get around this would be to implement refresh tokens and set the refresh token to a longer expiry than the access token and store refresh token on server side (could be represented as a UUID and store with the associated user). Storing the token this way would also allow fast revoking for blacklisted users. Would also need to create a route to invalidate a refresh token as these can be stolen and used to generate new access tokens. 
7. Did not create an Error Boundary component but in a real-life application this would be necessary to prevent users from seeing the default react error page.
8. Would like to have added a warm and cool background theme depending on the temperature returned by the API. Currently have icon images that display depending on the icon value from the api (Note: did not handle the case where an icon image is not in the asset folder (e.g if api adds more image icons we would see the default react error page)). 
9. Did not have time but could have definitely added more styling. E.g error text displayed without any styling.
10. Would like to have added a cache (in this case just a table in PostgreSQL for a user's recent weather queries and display that in the case the 3rd party API errors out (OpenWeatherAPI is updated every hour so we would likely have a display of the weather from a certain time ago using a timestamp. Would also need to set when to remove cached weather results)) 
11. In my implementation there was no database connection retry logic, whereas in a real-life application we should never assume a DB connection is perfect.
12. Would have made components smaller in a real-life application for example making a custom button component if we want to use it across different pages in the app. 
13. Didn't use proper git work-flow during development (branch for feature PR, CI tool tests, code review, and merge) 
14. Didn't create a models folder for backend logic such as querying e.g controllers/authentication/signin.js has a query that can be abstracted away from that file as well as should have abstracted validating JWT logic to it's own function. 
15. Only caught error response and sent the error response text to the frontend if there was an error from the Open Weather API. Instead should have created error handlers depending on the error status response the Open Weather API gives (401, 404, and 429).
16. In my backend implementation to query the OpenWeatherApi I only used city and country. Looking back if I had more time I would add in the 'state' field as well for an extra filtering layer. This would still give ambiguous results since the Open Weather API only returns us a single result from our query if we use these parameters. Even if we filter by state there can be multiple cities with the same name in the same state (e.g 5 'Springfields' in Wisconsin, USA )
Two solutions that comes to mind here is if we need to include city name we use city, state, country, and the assumption is generally people check the weather for the city they are located in so by default on the homepage we could display the user's city's weather. To do this we could get the user's IP address e.g 'request-ip' from npm. From there we could use e.g IPStack API to determine the geo coordinates of the user and use the latitude and longitude returned from IPStack to query the Open Weather API By geographic coordinates resulting in a query for the user's city. In the case they don't want to see their city's weather we could call the open weather api with city, state, and country.
We could also alternatively store the city Id and associated information (lat, lon, city name) in our PG database. When a user queries for a e.g city, country we would get a list of the city names in the country and then we can use the ID's returned from PG for Open Weather Maps feature to call for several cities in one API call using multiple ID parameters and return to the frontend the information we need after we filter unused fields from their response.
17.  Didn't want to spend a lot of extra time with css so some of the styling used in the app was the same styles from some of my older projects e.g the Form Component
18.  Should have created an API folder in the backend for the weather route to abstract that portion away from the file. 
### Stretch goals attempted
If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.
I attempted all of the stretch goals. 
Q: What went well? 
Integrating the OpenWeatherAPI was fun however, initially I only added a city parameter and there then there was no way to get the same city name from a different country so added in a city parameter which improved the results however there are still cases where the result is ambiguous (creating a better solution described in #16 above). 
Adding Authentication with token validation took a little extra time to make sure token was being set and removed properly
Added in a relatively basic UI that isn't responsive and has little styling. 
Deploying took some time as I had to go through the Heroku docs extensively. I separately deployed the frontend and backend of my application and made sure they talked to each other correctly.

### Instructions to run assignment locally
N/A Deployed on Heroku @ [Weather-Application](https://thinkific-weather-app.herokuapp.com/)

### Other information about your submission that you feel it's important that we know if applicable.
### Tech Stack 
Node JS Runtime Environment w/ Express framework
Pros: fast (uses googles V8 engine to compile JS code to machine code), single-threaded async I/O operations (non-blocking)
Express makes it easy to define Rest Routes, integrate middlewares, module application caching, and spin up a server rather quickly. Also chose because I was most comfortable with this on the backend. 
Cons: Node Does not support multi-threaded programming hence why it's less effective in large scale applications,
the Node.js API sometimes processes updates that are not backward compatible (so you need to update your code to adhere to the new version of the Node.js API)

PostgreSQL ( relational Database ): Not the best the choice in tech stack made here for the current time being. (i.e Since only storing users currently Mongo would work better as it is better for document storage and there are actually no relationships present in the D.B and for the purposes of this small app if I used mongo here then I could just insert the data directly as it is schema-less. Whereas I had to define the schema for the users table when using PostgreSQL)

React Frontend: A lot of pros here (own team working on create-react-app, and webpack for module bundling), Virtual DOM (light weight version of the real dom), 1 way data flow of components, everything is a component so we only re-render parts of the application page that changes (not the whole page)  Client Side Rendering (create-react-app) benefits (after the initial page load, rest of the requests will be faster, in comparison to Server Side Rendering like react Next.js.) Not actually requesting a new page when go click a link (routing handled internally by JS so you save server requests). Cons Client Side Rendering does not have as good SEO as Server side rendered apps (Web crawlers have difficulty seeing what a page is about since with CSR only sees a div with Id of app, by the time a web crawler takes a snapshot for SEO the items on the page might not have rendered.)

### Your feedback on this technical challenge
This challenge could have been interpreted in many ways hence why I added a lot of my thought process above. 
Something like this could take as little as 30 min or as long as you want it to take depending on what you want in the app.
It was fun, providing relatively ambiguous tasks is very in line with the day to day of most developers. Since there isn't a right solution it also lets Thinkific see what the candidate likes or spends the bulk of their time in (front or back or devops) when creating this application and how they think. A good way to understand the strengths and weaknesses a candidate has and what can be improved upon. 