import "@suiet/wallet-kit/style.css";
import { NavLink } from "react-router-dom";
import './Navbar.css'
import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  SuiChainId,
  ErrorCode,
  formatSUI,
  useSuiClient,
} from "@suiet/wallet-kit";
import nftConstant from './WALLET.CONSTANT'
import "@suiet/wallet-kit/style.css";
import { useMemo } from "react";
import {useNavigate} from 'react-router-dom'
// const navigate = useNavigate()
const { NFT_NETWORK } = nftConstant
const sampleNft = new Map([
  [
    "sui:devnet",
    "0xe146dbd6d33d7227700328a9421c58ed34546f998acdc42a1d05b4818b49faa2::nft::mint",
  ],
  [
    "sui:testnet",
    "0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint",
  ],
  [
    "sui:mainnet",
    "0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::nft::mint",
  ],
]);

function Navbar() {
  const wallet = useWallet();
  const client = useSuiClient();
  const nftContractAddr = useMemo(() => {
    if (!wallet.chain) return "";
    return sampleNft.get(wallet.chain.id) ?? "";
  }, [wallet]);


  // async function handleSignAndExecuteTransaction(
  //   target: string | undefined,
  //   opts?: {
  //     isCustomExecution?: boolean;
  //   }
  // ) {
  //   if (!target) return;
  //   try {
  //     const tx = new Transaction();
  //     tx.moveCall({
  //       target: target,
  //       arguments: [
  //         tx.pure.string("Suiet NFT"),
  //         tx.pure.string("Suiet Sample NFT"),
  //         tx.pure.string(
  //           "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4"
  //         ),
  //       ],
  //     });

  //     if (!opts?.isCustomExecution) {
  //       const resData = await wallet.signAndExecuteTransaction({
  //         transaction: tx,
  //       });
  //       console.log("signAndExecuteTransaction success", resData);
  //     } else {
  //       const resData = await wallet.signAndExecuteTransaction(
  //         {
  //           transaction: tx,
  //         },
  //         {
  //           execute: async ({ bytes, signature }) => {
  //             return await client.executeTransactionBlock({
  //               transactionBlock: bytes,
  //               signature: signature,
  //               options: {
  //                 showRawEffects: true,
  //                 showObjectChanges: true,
  //               },
  //             });
  //           },
  //         }
  //       );
  //       console.log("signAndExecuteTransaction success", resData);
  //     }

  //     alert("executeMoveCall succeeded (see response in the console)");
  //   } catch (e) {
  //     console.error("executeMoveCall failed", e);
  //     alert("executeMoveCall failed (see response in the console)");
  //   }
  // }

  // async function handleSignMsg() {
  //   if (!wallet.account) return;
  //   try {
  //     const msg = "Hello world!";
  //     const msgBytes = new TextEncoder().encode(msg);
  //     const result = await wallet.signPersonalMessage({
  //       message: msgBytes,
  //     });
  //     const verifyResult = await wallet.verifySignedMessage(
  //       result,
  //       wallet.account.publicKey
  //     );
  //     console.log("verify signedMessage", verifyResult);
  //     if (!verifyResult) {
  //       alert(`signMessage succeed, but verify signedMessage failed`);
  //     } else {
  //       alert(`signMessage succeed, and verify signedMessage succeed!`);
  //     }
  //   } catch (e) {
  //     console.error("signMessage failed", e);
  //     alert("signMessage failed (see response in the console)");
  //   }
  // }

  // const chainName = (chainId: string | undefined) => {
  //   switch (chainId) {
  //     case SuiChainId.MAIN_NET:
  //       return "Mainnet";
  //     case SuiChainId.TEST_NET:
  //       return "Testnet";
  //     case SuiChainId.DEV_NET:
  //       return "Devnet";
  //     default:
  //       return "Unknown";
  //   }
  // };


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