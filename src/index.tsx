import ReactDOM from "react-dom";
import * as naj from "near-api-js";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// project imports
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import Comingsoon from "./views/comingsoon/index";
import { store } from "./store";
import { initContract } from "./utils";
import { getWalletAccount } from "./resources/contract";

// style + assets
import "./assets/scss/style.scss";

const nearConfig = /near$/.test("ichigeng.qwerty00.testnet")
  ? {
      networkId: "mainnet",
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
    }
  : /testnet$/.test("ichigeng.qwerty00.testnet")
  ? {
      networkId: "testnet",
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
    }
  : undefined;

if (!nearConfig) {
  throw new Error(
    `Don't know what network settings to use for contract "ichigeng.qwerty00.testnet"; expected name to end in 'testnet' or 'near'`
  );
}

export const near = new naj.Near({
  ...nearConfig,
  keyStore:
    typeof window === "undefined"
      ? new naj.keyStores.InMemoryKeyStore()
      : new naj.keyStores.BrowserLocalStorageKeyStore(),
});
export const wallet = new naj.WalletConnection(near);

// ==============================|| REACT DOM RENDER  ||============================== //

// (window as any).nearInitPromise = initContract()
//     .then(() => {
function doWork() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* <Comingsoon /> */}
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}
// })
// .catch(console.error);

getWalletAccount().then(doWork).catch(console.error);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
