import { useState, useEffect } from "react";
import "./App.css";
import Movie from "./Movie";
import Pagenav from "./Pagenav";
import Navbar from "./components/Navbar";
import Errorpic from "./404.png";
import Signup from "./components/Signup/Signup";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Favourites from "./components/Favourites";

const discover_api =
	"https://api.themoviedb.org/3/discover/movie?api_key=58c9e30662728a9636cf251d1280f970&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";
function App() {
	// STATES
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState("");
	const [api, setApi] = useState(discover_api);
	const [genre, setGenre] = useState("Genre");
	const [loggedIn, setLoggedin] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(api + "&page=" + page, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			// credentials: "include",
		})
			.then((resp) => resp.json())
			.then(function (data) {
				// console.log("res ", data.results);
				setMovies(data.results);
				// SCROLL TO TOP
				window.scrollTo(0, 0);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [page, api]);

	const loginORsignup = (url, userName, password) => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userName,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			// credentials: "include",
		})
			.then((r) => {
				if (r.ok) {
					return { success: true };
				} else {
					return r.json();
				}
			})
			.then((r) => {
				if (r.success === true) {
					setLoggedin(true);
				} else {
					setError(r.error);
				}
			});
	};

	const signinHandler = (userName, password) => {
		loginORsignup("http://localhost:8080/login", userName, password);
	};

	const signupHandler = (userName, password) => {
		loginORsignup("http://localhost:8080/signup", userName, password);
	};

	return loggedIn ? (
		<Router>
			<Switch>
				<Route path="/favourites">
					<Favourites />
				</Route>
				<Route path="/">
					<div className="App">
						<Navbar
							setPage={setPage}
							setQuery={setQuery}
							setApi={setApi}
							// content={content}
							// setContent={setContent}
							query={query}
							discover_api={discover_api}
							genre={genre}
							setGenre={setGenre}
						/>
						<div className="Appbody">
							{movies.length > 0 ? (
								<div>
									<div className="container">
										{movies.map((movie) => {
											return (
												<div className="movie_card">
													<Movie
														poster_path={movie.poster_path}
														title={movie.title}
														rating={movie.vote_average}
														overview={movie.overview}
														year={movie.release_date.slice(0, 4)}
														genres={movie.genre_ids}
													/>
												</div>
											);
										})}
									</div>
									<div className="footer">
										<Pagenav page={page} setPage={setPage} />
									</div>
								</div>
							) : (
								<div className="errorpage">
									<h2 className="notFound">Sorry. No Results found</h2>
									<img className="err" src={Errorpic} alt="" />
								</div>
							)}
						</div>
					</div>
				</Route>
			</Switch>
		</Router>
	) : (
		// <div className="registration">
		<Signup
			signinHandler={signinHandler}
			signupHandler={signupHandler}
			error={error}
		/>
		// </div>
	);
}

export default App;
