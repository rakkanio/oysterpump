import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";


import {
  AllDefaultWallets,
  defineStashedWallet,
  WalletProvider,
} from "@suiet/wallet-kit";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider
      defaultWallets={[
        ...AllDefaultWallets,
        defineStashedWallet({
          appName: "Suiet Kit Playground",
        }),
      ]}
    >
      {/* if you want to custiomize you wallet list, please check this doc
          https://kit.suiet.app/docs/components/WalletProvider#customize-your-wallet-list-on-modal
       */}
       <BrowserRouter>
      <App />
      </BrowserRouter>
    </WalletProvider>
  </React.StrictMode>
);
