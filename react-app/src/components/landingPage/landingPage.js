import { NavLink, useHistory  } from "react-router-dom"
import "./landingPage.css"
import OpenModalButton from "../openModalButton";
import LoginFormModal from "../loginFormModal";

function LandingPage({user}){
    const history = useHistory()
    console.log(user)

    const handleOpenDiscord = (e) => {
        e.preventDefault();
        history.push("/servers")
    }

    return (
        <>
            <nav>
                <div className="home-nav-container">
                    <img className="discordLogo" src="../images/icon_clyde_black_RGB.png" alt="Tumult"/>
                    <span>
                        Fill
                    </span>
                    <span>
                        Fill2
                    </span>
                    <span>
                        Fill3
                    </span>
                    <span>
                        Fill4
                    </span>
                { user ? (
                    <button onClick={handleOpenDiscord}>Open Discord</button>
                    ) : (
                        <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                        />
                    )
                }
                </div>
            </nav>
            <div className="header-image-container">
            <img className="leftheaderimage" src="../images/headerleft_splashart.png" alt="Tumult"/>
            <div className="imagine-container">
                <div >
                    <h1>IMAGINE A PLACE...</h1>
                    <div>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</div>
                </div>
                <div>
                    <button>Log In</button>
                    <button>Sign Up</button>
                </div>
            </div>
            <img className="rightheaderimage" src="../images/headerright_splashart.png" alt="Tumult"/>
            </div>
            <div>
                <div>
                    <img src="../images/pagetop_splashart.png" alt="Tumult"/>
                </div>
                <div>
                    <h2>Create an invite-only place where you belong</h2>
                    <div>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</div>
                </div>
            </div>
        <div>
            <div>
            </div>
            <img className="blueClouds" src="../images/header_blurpleclouds.png" alt="Tumult"/>
            <img src="../images/header_redclouds.png" alt="Tumult"/>
            <img src="../images/pagebottom_splashart.png" alt="Tumult"/>
            <img src="../images/pagelower_splashart.png" alt="Tumult"/>
            <img src="../images/pagemiddle_splashart.png" alt="Tumult"/>
        </div>
        </>

    )
}

export default LandingPage
