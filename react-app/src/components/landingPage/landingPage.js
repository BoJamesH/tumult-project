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
                <div>
                    <img className="discordLogo" src="../images/icon_clyde_black_RGB.png" alt="Tumult"/>
                </div>
                { user ? (
                  <button onClick={handleOpenDiscord}>Open Discord</button>
                    ) : (
                        <OpenModalButton
                        buttonText="Log In"
                        //   onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                        />
                    )
                }
            </nav>
        <div>
            <div>
            </div>
            <img src="../images/header_blurpleclouds.png" alt="Tumult"/>
            <img src="../images/header_redclouds.png" alt="Tumult"/>
            <img src="../images/headerleft_splashart.png" alt="Tumult"/>
            <img src="../images/headerright_splashart.png" alt="Tumult"/>
            <img src="../images/pagebottom_splashart.png" alt="Tumult"/>
            <img src="../images/pagelower_splashart.png" alt="Tumult"/>
            <img src="../images/pagemiddle_splashart.png" alt="Tumult"/>
            <img src="../images/pagetop_splashart.png" alt="Tumult"/>
        </div>
        </>

    )
}

export default LandingPage
