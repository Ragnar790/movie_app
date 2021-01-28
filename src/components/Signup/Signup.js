import React, { useState } from "react";
import "./style.css";

function Signup({ signinHandler, signupHandler, error }) {
	const [userName, setUsername] = useState(undefined);
	const [password, setPassword] = useState(undefined);

	const togglePW = () => {
		const pw = document.getElementById("pw");
		if (pw.type === "password") {
			pw.type = "text";
		} else {
			pw.type = "password";
		}
	};
	return (
		<div className="signupcontainer">
			<input
				type="text"
				placeholder="Enter Username"
				value={userName}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				id="pw"
				type="password"
				placeholder="Enter Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div>
				<input type="checkbox" onClick={togglePW} />
				<span className="togglepw">Toggle Password</span>
			</div>
			{error ? <div className="err">{error}</div> : null}
			<button
				className="signIn"
				onClick={() => signinHandler(userName, password)}
			>
				Sign In
			</button>
			<button
				className="signUp"
				onClick={() => signupHandler(userName, password)}
			>
				Sign Up
			</button>
		</div>
	);
}

export default Signup;
