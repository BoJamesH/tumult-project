import { NavLink, useHistory } from "react-router-dom";
import "./landingPage.css";
import OpenModalButton from "../openModalButton";
import LoginFormModal from "../loginFormModal";
import SignupFormModal from "../signupFormModal";

function LandingPage({ user }) {
    const history = useHistory();
    console.log(user);

    const handleOpenTumult = (e) => {
        e.preventDefault();
        history.push("/servers");
    };

    return (
        <>
            <div className="homepage-container">
                <nav>
                    <div className="home-nav-container">
    <div className="title-logo-container">
        <img
            className="tumultLogo"
            src="../images/Tumult-Logo.png"
            alt="Tumult"
        />
        <h2 className="title-tumult">Tumult</h2>
    </div>
    <div className="link-container"> {/* This is the new div */}
        <span>
            <a
                href="https://www.linkedin.com/in/bo-j-1a1312276/"
                className="white-link"
            >
                Bo Hancock
            </a>
        </span>
        <span>
            <a
                href="https://www.linkedin.com/in/jordan-pentti-4b0044138/"
                className="white-link"
            >
                Jordan Pentti
            </a>
        </span>
        <span>
            <a
                href="LINK_TO_RYAN_LINKEDIN"
                className="white-link"
            >
                Nicholas Tan
            </a>
        </span>
        <span>
            <a
                href="https://www.linkedin.com/in/ryan-rosales-646437276"
                className="white-link"
            >
                Ryan Rosales
            </a>
        </span>
    </div>
    {user ? (
        <button className="open-tumult" onClick={handleOpenTumult}>
            Open Tumult
        </button>
    ) : (
                            <OpenModalButton
                                buttonText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                        )}
                    </div>
                </nav>
                <div className="header-image-container">
                    <img
                        className="leftheaderimage"
                        src="../images/headerleft_splashart.png"
                        alt="Tumult"
                    />
                    <div className="imagine-container">
                        <div>
                            <h1>
                                <span className="larger-text">IMAGINE A REALM...</span>
                            </h1>
                            <div>
                                ...where you can endlessly squabble in a school club, a feuding faction, or a global brawl. Where you and your rowdy crew can bicker 'round the clock. A place that makes it easy to argue every day and clash more often.
                            </div>
                        </div>
                        <div>
                            {user ? (
                                <button className="open-tumult-header" onClick={handleOpenTumult}>
                                    Open Tumult in your browser
                                </button>
                            ) : (
                                <>
                                    <OpenModalButton
                                        buttonText="Log In"
                                        modalComponent={<LoginFormModal />}
                                    />
                                    <OpenModalButton
                                        buttonText="Sign Up"
                                        modalComponent={<SignupFormModal />}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <img
                        className="rightheaderimage"
                        src="../images/headerright_splashart.png"
                        alt="Tumult"
                    />
                </div>
                <div className="second-image-container">
                    <div>
                        <img src="../images/pagetop_splashart.png" alt="Tumult" />
                    </div>
                    <div>
                        <h2>Forge an Exclusive Battleground Where You Belong</h2>
                        <div>
                            Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
                        </div>
                    </div>
                </div>
                <div className="third-image-container">
                    <div>
                        <h2>Where Picking Fights is Effortless</h2>
                        <div>
                            Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly pop in to talk without having to call.
                        </div>
                    </div>
                    <div>
                        <img src="../images/pagemiddle_splashart.png" alt="Tumult" />
                    </div>
                </div>
                <div className="fourth-image-container">
                    <div>
                        <img src="../images/pagelower_splashart.png" alt="Tumult" />
                    </div>
                    <div>
                        <h2>From Scuffles to a Fanatic Fanbase</h2>
                        <div>
                            Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
                        </div>
                    </div>
                </div>
                <div className="fifth-image-container">
                    <div>
                        <h2>Reliable Tech for Staying Close</h2>
                        <div>
                            Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
                        </div>
                    </div>
                    <div>
                        <img src="../images/pagebottom_splashart.png" alt="Tumult" />
                    </div>
                </div>
                <div className="about-link-container">
                    <div className="title-logo-container">
                        <img
                            className="tumultLogoBottom"
                            src="../images/Tumult-Logo.png"
                            alt="Tumult"
                        />
                        <h2>Tumult</h2>
                    </div>
                    <div>
                        <h3>Bo</h3>
                        <div className="github-linked-container">
                            <a href="https://github.com/BoJamesH">
                                <img className="github-logo" src="../images/github_logo.png" />
                            </a>
                            <a href="">
                                <img className="linked-logo" src="../images/linked_logo.png" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3>Jordan</h3>
                        <div className="github-linked-container">
                            <a href="https://github.com/Jordo707">
                                <img className="github-logo" src="../images/github_logo.png" />
                            </a>
                            <a href="">
                                <img className="linked-logo" src="../images/linked_logo.png" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3>Nick</h3>
                        <div className="github-linked-container">
                            <a href="https://github.com/nita94">
                                <img className="github-logo" src="../images/github_logo.png" />
                            </a>
                            <a href="https://www.linkedin.com/in/nicholas-tan-8046a5159/">
                                <img className="linked-logo" src="../images/linked_logo.png" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3>Ryan</h3>
                        <div className="github-linked-container">
                            <a href="https://github.com/RjRosales19">
                                <img className="github-logo" src="../images/github_logo.png" />
                            </a>
                            <a href="https://www.linkedin.com/in/ryan-rosales-646437276">
                                <img className="linked-logo" src="../images/linked_logo.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
