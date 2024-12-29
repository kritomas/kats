import "./main.css";
import Header from "./header";
import Footer from "./footer";

function Root()
{
	if (sessionStorage.userid === undefined)
	{
		window.location.replace("/login");
		return;
	}

	return (
		<body>
			<Header/>
			<main>
				 BRYNDZOVÉ HALUŠKY
			</main>
			<Footer/>
		</body>
	);
}

export default Root