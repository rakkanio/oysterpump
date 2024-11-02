import "@suiet/wallet-kit/style.css";
import { NavLink } from "react-router-dom";
import './Navbar.css'
import {
  ConnectButton,
  useWallet,
  ErrorCode,
} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";


function Navbar() {
  const wallet = useWallet();

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary nav-color">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink className="navbar-brand brand" to="/">Oysterpump</NavLink>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <ul className="d-flex" role="search">
          <NavLink className="navbar-brand board" to="/board">Game Board</NavLink>
            <ConnectButton
              onConnectError={(error) => {
                if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
                  console.warn(
                    "user rejected the connection to " + error.details?.wallet
                  );
                } else {
                  console.warn("unknown connect error: ", error);
                }
              }}
              onConnectSuccess={(walletRes)=>{
                console.log('sucesslogg', walletRes)
                window.location.replace("/board");
              }}
              onDisconnectSuccess={(walletRes)=>{
                console.log('sucessdisconnect', walletRes)
              }}
            />
          </ul>
        </div>
      </div>
    </nav>

  </>
}

export default Navbar;