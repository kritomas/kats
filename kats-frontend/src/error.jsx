import Header from "./header"
import Footer from "./footer"
import "./main.css";
import "./error.css";

import errorImg from "./assets/error.jpg"

function Error()
{

	return (
		<div className="body-div">
			<Header/>
			<main>
				<div className="error-div">
					<img src={errorImg}/>
				</div>
			</main>
			<Footer/>
		</div>
	)
}

export default Error;