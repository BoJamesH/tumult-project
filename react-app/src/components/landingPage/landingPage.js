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
            <div className="second-image-container">
                <div>
                    <img src="../images/pagetop_splashart.png" alt="Tumult"/>
                </div>
                <div>
                    <h2>Create an invite-only place where you belong</h2>
                    <div>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</div>
                </div>
            </div>
            <div className="third-image-container">
                <div>
                    <h2>Where hanging out is easy</h2>
                    <div>Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly pop in to talk without having to call.</div>
                </div>
                <div>
                    <img src="../images/pagemiddle_splashart.png" alt="Tumult"/>
                </div>
            </div>
            <div className="fourth-image-container">
                <div>
                    <img src="../images/pagelower_splashart.png" alt="Tumult"/>
                </div>
                <div>
                    <h2>From few to a fandom</h2>
                    <div>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</div>
                </div>
            </div>
            <div className="fifth-image-container">
                <div>
                    <h2>RELIABLE TECH FOR STAYING CLOSE</h2>
                    <div>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</div>
                </div>
                <div>
                    <img src="../images/pagebottom_splashart.png" alt="Tumult"/>
                </div>
            </div>
            <div className="last-description-container">
                <h2>Ready to start your journey?</h2>
            </div>
        <div>
            <div>
            </div>
            {/* <img className="blueClouds" src="../images/header_blurpleclouds.png" alt="Tumult"/>
            <img src="../images/header_redclouds.png" alt="Tumult"/> */}
        </div>
        </>

    )
}

export default LandingPage