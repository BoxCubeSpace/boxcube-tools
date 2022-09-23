import { useState, useEffect } from "react";
import MainCard from "../../ui-component/cards/MainCard";
import "./style/create_token.css";
import "./style/general.css";

import { Buffer } from "buffer";
import {
  checkAccount,
  // checkAccount,
  getBase64FromUrl,
  parserTokenCustom,
} from "../../resources/utils";
import {
  executeMultipleCustomTrx,
  functionCall2,
  getWalletAccount,
  loginNearFullAccess,
} from "../../resources/contract";
import * as nearAPI from "near-api-js";
import { config } from "../../resources/config";
import { saveAs } from "file-saver";
// import WASM_FT_TOKEN from "./../storage/fungible_token.wasm";
import { IconCoin } from "@tabler/icons";

// @ts-ignore
window.Buffer = Buffer;

const CreateToken = () => {
  const [validation, setValidation] = useState(false);
  const [emptyForm, setEmptyForm] = useState(false);
  const [firstPage, setFirstPage] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [loadValidation, setLoadValidation] = useState(false);
  const [log, setLog] = useState("");
  const [account, setAccount] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [decimal, setDecimal] = useState(0);
  const [icon, setIcon] = useState("");
  const [baseIcon, setBaseIcon] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [walletAccount, setWalletAccount] = useState(null);

  const changePage = async () => {
    setFirstPage(true);
  };

  const backToLanding = async () => {
    setFirstPage(false);
  };

  useEffect(() => {
    initNear();
    console.log(account);
    console.log(isAvailable);
  }, [
    account,
    tokenName,
    tokenSymbol,
    totalSupply,
    decimal,
    icon,
    isAvailable,
  ]);

  const initNear = async () => {
    let walletAccount = await getWalletAccount();

    setWalletAccount(walletAccount);
  };

  const createToken = async () => {
    if (
      account !== "" &&
      totalSupply !== "" &&
      tokenName !== "" &&
      tokenSymbol !== "" &&
      decimal !== 0 &&
      icon !== ""
    ) {
      setLoadValidation(true);
      let baseIcon = "";
      //  let resp = await checkAccount(walletAccount.getAccountId());
      //  console.log(resp);
      // let icon_base64 = await getBase64FromUrl(icon);
      var reader = new FileReader();
      reader.readAsDataURL(icon);
      reader.onload = function () {
        console.log(reader.result);
        baseIcon = reader.result;
      };

      const data = await fetch(
        "https://bafkreiblr7jjj5vwq2xjww6klqgr2oubjyyce7idby4jmnbvuoff2fmz5a.ipfs.nftstorage.link"
      );
      const blob = await data.blob();
      const buffer = await blob.arrayBuffer();
      var uint8View = new Uint8Array(buffer);
      console.log(uint8View);

      // let keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
      const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
      const keyPair = nearAPI.KeyPair.fromRandom("ed25519");
      const publicKey = keyPair.publicKey.toString();
      let savePrivateKey = {
        account_id: account,
        public_key: publicKey,
        private_key: "ed25519:" + keyPair.secretKey.toString(),
      };

      await keyStore.setKey(config.networkId, account, keyPair);
      let nearNew = await nearAPI.connect(
        Object.assign(
          {
            deps: {
              keyStore: keyStore,
            },
          },
          config
        )
      );

      let respCheck = await checkAccount(account);
      if (respCheck.data.error) {
        //create account
        let balanceMaster = await window.walletAccount
          .account()
          .getAccountBalance();
        if (
          Number(balanceMaster.available) <
          Number(nearAPI.utils.format.parseNearAmount(config.minCreateToken))
        ) {
          setLog("You don't have enough balance to create account");
          setLoadValidation(false);
          return;
        }

        try {
          await window.walletAccount.account().createAccount(
            account, // new account name
            publicKey, // public key for new account
            nearAPI.utils.format.parseNearAmount(config.minCreateToken) // initial balance for new account in yoctoNEAR
          );
          // console.log(savePrivateKey);
          saveAs(
            new Blob([JSON.stringify(savePrivateKey)], { type: "JSON" }),
            `${account}.json`
          );
        } catch (err) {
          console.log(err);
          setLoadValidation(false);
          setLog(err.toString());
        }
      } else {
        const keyPair = nearAPI.KeyPair.fromString(privateKey);
        await keyStore.setKey(config.networkId, account, keyPair);
        nearNew = await nearAPI.connect(
          Object.assign(
            {
              deps: {
                keyStore: keyStore,
              },
            },
            config
          )
        );
      }

      const accountFt = await nearNew.account(account);

      //check balance
      if (account != window.walletAccount.getAccountId()) {
        let balance = await accountFt.getAccountBalance();
        // console.log(balance.available);
        if (
          Number(balance.available) <
          Number(nearAPI.utils.format.parseNearAmount(config.minCreateToken))
        ) {
          let amountLess =
            Number(config.minCreateToken) -
            Number(nearAPI.utils.format.formatNearAmount(balance.available));
          // console.log(amountLess);

          let balanceMaster = await window.walletAccount
            .account()
            .getAccountBalance();
          if (
            Number(balanceMaster.available) <
            Number(
              nearAPI.utils.format.parseNearAmount((amountLess + 1).toString())
            )
          ) {
            setLog("You don't have enough balance to create token");
            setLoadValidation(false);
            return;
          }

          window.walletAccount.account().sendMoney(
            account, // receiver account
            nearAPI.utils.format.parseNearAmount((amountLess + 1).toString()) // amount in yoctoNEAR
          );
        }
      }

      try {
        let res = await accountFt.deployContract(uint8View);
        console.log(res);

        // let contractFt = await loadContract(account, "FT");

        let resp = await functionCall2(
          window.walletAccount.account(),
          account,
          "new",
          {
            owner_id: window.walletAccount.getAccountId(),
            total_supply: parserTokenCustom(totalSupply, decimal).toString(),
            metadata: {
              spec: "ft-1.0.0",
              name: tokenName.toString(),
              symbol: tokenSymbol.toString(),
              decimals: parseInt(decimal),
              icon: baseIcon.toString(),
            },
          },
          0
        );

        console.log(resp);

        setLoadValidation(false);
        setValidation(true);
        setEmptyForm(false);
      } catch (err) {
        console.log(err);
        setLoadValidation(false);
        setLog(err.kind.ExecutionError.toString());
      }
    } else {
      setEmptyForm(true);
      setValidation(false);
    }
  };

  const onLoginFullAccess = async () => {
    if (window.walletAccount && window.walletAccount.isSignedIn()) {
      let accountId = window.walletAccount.getAccountId();
      window.walletAccount.signOut();
      loginNearFullAccess(window.walletAccount, accountId);
    } else {
      alert("Please sign in to your NEAR account");
    }
  };

  if (firstPage === false) {
    return (
      <div className="bg-card">
        <div className="container mt-4">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-sm-6">
              <h1>Create your utility token for develop your NFTs Project</h1>
              <p className="mt-4">
                Create, list & manage your utility NEP-141 tokens with no coding
                required.
              </p>
              <div className="mb-4">
                {window.walletAccount.isSignedIn() ? (
                  <button
                    type="button"
                    onClick={changePage}
                    className="req-button mt-2"
                    style={{ margin: "0" }}
                  >
                    Open
                  </button>
                ) : (
                  <h5>Connect Your wallet first to have access</h5>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <IconCoin stroke="1" size="100%"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <MainCard title="Create Token">
        <div className="container text-center pt-4 mt-4">
          <h2>Create Your Own Token</h2>
          <button className="backward" type="button" onClick={backToLanding}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/boxcube-33f6d.appspot.com/o/launchapp%2Fback-forward.png?alt=media&token=991a60ec-8c34-448a-a4a1-35a7276b67eb"
              width="20%"
              alt=""
            />
          </button>
        </div>
        <div className="container mb-4">
          <br />
          <div class="p-2" style={{ color: "red" }}>
            Give your Full Access once to be able to create your
            token!&nbsp;&nbsp;
          </div>
          <button
            className="req-button"
            type="button"
            onClick={onLoginFullAccess}
          >
            Give Access
          </button>
        </div>
        <div className="container">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value={isAvailable}
              id="flexCheckDefault"
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Is your account already created? (If you uncheck the button, it will create new account with the token at the same time)
            </label>
          </div>
          <div className="mb-4">
            <label>Account</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Master Account or Sub Account"
              onChange={(e) => {
                setAccount(e.target.value);
              }}
              name="account"
            />
          </div>
          {isAvailable ? (
            <div className="mb-4">
              <label>Private Key (If only account already created)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Private Key"
                onChange={(e) => {
                  setPrivateKey(e.target.value);
                }}
                name="account"
              />
            </div>
          ) : (
            ""
          )}
          <div className="mb-4">
            <label>Token Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Token Name"
              onChange={(e) => {
                setTokenName(e.target.value);
              }}
              name="tokenName"
            />
          </div>
          <div className="mb-4">
            <label>Token Symbol</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Token Symbol"
              onChange={(e) => {
                setTokenSymbol(e.target.value);
              }}
              name="tokenSymbol"
            />
          </div>
          <div className="mb-4">
            <label>Total Supply</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Total Supply"
              onChange={(e) => {
                setTotalSupply(e.target.value);
              }}
              name="totalSupply"
            />
          </div>
          <div className="mb-4">
            <label>Decimal</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Decimal"
              onChange={(e) => {
                setDecimal(e.target.value);
              }}
              name="totalDecimal"
            />
          </div>
          <div className="mb-4">
            <label>Icon Upload</label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              onChange={(e) => {
                setIcon(e.target.files[0]);
              }}
            />
            <small>Example icon size 128 x 128</small>
          </div>
          {emptyForm ? (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <div>
                <strong>Do not left empty form !</strong>
              </div>
            </div>
          ) : (
            ""
          )}
          {loadValidation ? (
            <div className="text-center">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            ""
          )}
          {validation ? (
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <div>
                <strong>Token successfully created!</strong>
              </div>
            </div>
          ) : (
            ""
          )}
          {log ? (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <div>
                <strong>{log}</strong>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="container mb-4 text-center">
            <button className="req-button" type="button" onClick={createToken}>
              Create
            </button>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default CreateToken;
