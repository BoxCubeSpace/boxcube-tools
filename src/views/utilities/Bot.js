import MainCard from "../../ui-component/cards/MainCard";
import { useEffect, useState } from "react";
import * as nearAPI from "near-api-js";
import axios from "axios";
import emailjs from "emailjs-com";
import { IconChecklist } from "@tabler/icons";
import "./style/bot.css";
import "./style/general.css";
import { db } from "../../resources/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { IconRobot } from "@tabler/icons";

const Bot = () => {
  const [validation, setValidation] = useState(false);
  const [emptyForm, setEmptyForm] = useState(false);
  const [loadValidation, setLoadValidation] = useState(false);
  const [contractAvailable, setContractAvailable] = useState(false);
  const [hashAvailable, setHashAvailable] = useState(false);
  const [salesBot, setSalesBot] = useState(false);
  const [rankingBot, setRankingBot] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [verifBot, setVerifBot] = useState(false);
  // const [fpBot, setFpBot] = useState(false);
  const [firstPage, setFirstPage] = useState(false);
  const [contact, setContact] = useState("");
  const [contract, setContract] = useState("");
  const [thash, setThash] = useState("");
  const [wallet, setWallet] = useState("");
  const [payFor, setPayFor] = useState(0);
  const { connect, keyStores } = nearAPI;

  const config = {
    networkId: "mainnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };

  const changePage = async () => {
    setFirstPage(true);
  };

  const backToLanding = async () => {
    setFirstPage(false);
  };

  const contractExist = () => {
    axios
      .get(
        "https://api-v2-mainnet.paras.id/collections?collection_id=" + contract
      )
      .then((res) => {
        // console.log(res.data.data.results[0]);
        if (
          res.data.data.results[0] !== undefined &&
          res.data.data.results[0] !== null
        ) {
          setContractAvailable(true);
        } else {
          setContractAvailable(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hashExist = async () => {
    if (wallet !== "" && thash !== "") {
      const near = await connect(config);
      const response = await near.connection.provider.txStatus(thash, wallet);
      // console.log(response.transaction.signer_id);
      if (response.transaction.signer_id === wallet) {
        setHashAvailable(true);
      } else {
        setHashAvailable(false);
      }
    } else {
      // console.log("error");
      setHashAvailable(false);
    }
  };

  const templateParams1 = {
    contract: contract,
    contact: contact,
    hash: thash,
    email: emailAddress,
    to_email: process.env.REACT_APP_MAIL_ONE,
  };
  const templateParams6 = {
    contract: contract,
    contact: contact,
    hash: thash,
    email: emailAddress,
    to_email: process.env.REACT_APP_MAIL_SIX,
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default refresh by the browser
    await emailjs
      .send(
        process.env.REACT_APP_SERVICE_ONE,
        process.env.REACT_APP_TEMP_BOT,
        templateParams1,
        process.env.REACT_APP_PUBKEY_ONE
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
    await emailjs
      .send(
        process.env.REACT_APP_SERVICE_ONE,
        process.env.REACT_APP_TEMP_BOT,
        templateParams6,
        process.env.REACT_APP_PUBKEY_ONE
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  const submitRequest = async (e) => {
    const colRefget = doc(db, "botRequest", thash);
    if (contract !== "" && thash !== "" && wallet !== "" && contact !== "") {
      setLoadValidation(true);
      setEmptyForm(false);
      await setDoc(colRefget, {
        totalPayment: payFor,
        walletAccount: wallet,
        transactionHash: "https://explorer.near.org/transactions/" + thash,
        contractId: contract,
        contact: contact,
        oneYear: verifBot,
        sixMonth: rankingBot,
        oneMonth: salesBot,
        createdAt: new Date().toUTCString(),
      });
      setLoadValidation(false);
      handleSubmit(e);
      setValidation(true);
    }
  };

  useEffect(async () => {
    let salesPrice = 0;
    let rankingPrice = 0;
    let verifPrice = 0;
    if (salesBot == true) {
      salesPrice = 30;
      rankingPrice = 0;
      verifPrice = 0;
      setRankingBot(false);
      setVerifBot(false);
    }
    if (rankingBot == true) {
      rankingPrice = 73;
      salesPrice = 0;
      verifPrice = 0;
      setSalesBot(false);
      setVerifBot(false);
    }
    if (verifBot == true) {
      verifPrice = 114;
      rankingPrice = 0;
      salesPrice = 0;
      setSalesBot(false);
      setRankingBot(false);
    }
    let total = salesPrice + rankingPrice + verifPrice;
    setPayFor(total);
  }, [salesBot, rankingBot, verifBot, payFor]);

  if (firstPage === false) {
    return (
      <div className="bg-card">
        <div className="container mt-4">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-sm-6">
              <h1>Get your own bot to support your future project</h1>
              <p className="mt-4">
                <strong>
                  Discord bots for Verification Wallet, sales & listing, Rarity
                  Checker, Floor Price Notification.
                </strong>
                <br />
                In under 10 minutes to set up a bot for your Discord Server.
              </p>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={changePage}
                  className="req-button mt-2"
                  style={{ margin: "0" }}
                >
                  Apply for Bot
                </button>
              </div>
            </div>
            <div className="col-sm-6">
              <IconRobot stroke="1" size="100%"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainCard title="Bot">
      <div className="container text-center pt-4 mt-4">
        <h1>Get Your Own Bot Now!</h1>
        <button className="backward" type="button" onClick={backToLanding}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/boxcube-33f6d.appspot.com/o/launchapp%2Fback-forward.png?alt=media&token=991a60ec-8c34-448a-a4a1-35a7276b67eb"
            width="20%"
            alt=""
          />
        </button>
      </div>
      <div className="container mt-4">
        {/* <img
          src="../assets/bot_banner.png"
          width="100%"
          alt=""
          style={{ borderRadius: "1rem" }}
        /> */}
        <br />
        <br />
        <form>
          {contractAvailable ? (
            <small
              id="emailHelp"
              className="form-text"
              style={{ color: "green" }}
            >
              Your contract available!
            </small>
          ) : (
            <small
              id="emailHelp"
              className="form-text"
              style={{ color: "red" }}
            >
              Contract not detected!
            </small>
          )}
          <br />
          <label htmlFor="exampleInputEmail1">Your contract</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Contract"
            onChange={(e) => {
              setContract(e.target.value);
            }}
            name="name"
          />
          <small id="emailHelp" className="form-text text-white">
            Make sure your contract is available on{" "}
            <a href="https://paras.id/">Paras.id</a>
          </small>
          <br />
          <button
            type="button"
            onClick={contractExist}
            className="req-button mt-2"
            style={{ margin: "0" }}
          >
            Check
          </button>
          <br />
          <br />
          <div className="row">
            <div className="col-sm-4">
              <div className="border-light">
                <img
                  src="../assets/one_month.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body text-center">
                  <div className="form-check form-switch g-mar-0">
                    <input
                      className="form-check-input g-mar-0"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      checked={salesBot}
                      onChange={(e) => {
                        setSalesBot(e.target.checked);
                      }}
                    />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="border-light">
                <img
                  src="../assets/six_month.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body text-center">
                  <div className="form-check form-switch g-mar-0">
                    <input
                      className="form-check-input g-mar-0"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked={rankingBot}
                      onChange={(e) => {
                        setRankingBot(e.target.checked);
                      }}
                    />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="border-light">
                <img
                  src="../assets/one_year.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body text-center">
                  <div className="form-check form-switch g-mar-0">
                    <input
                      className="form-check-input g-mar-0"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                      checked={verifBot}
                      onChange={(e) => {
                        setVerifBot(e.target.checked);
                      }}
                    />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8">
                <div className="border-light box-shadow h-100">
                  <div className="card-body">
                    <label htmlFor="exampleInputEmail1">
                      Proof of Payments <br />{" "}
                      https://explorer.near.org/transactions/
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="23C3Cpzfs3zcsZbwuctYx5k2BSELUeHJmX5z73xxxxxx"
                      onChange={(e) => {
                        setThash(e.target.value);
                      }}
                    />
                    <small id="emailHelp" className="form-text text-white">
                      Your transaction hash (example:
                      23C3Cpzfs3zcsZbwuctYx5k2BSELUeHJmX5z73xxxxxx)
                    </small>
                    <br />
                    <br />
                    <label htmlFor="exampleInputEmail1">
                      Your wallet account
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="yourwallet.near"
                      onChange={(e) => {
                        setWallet(e.target.value);
                      }}
                    />
                    <small id="emailHelp" className="form-text text-white">
                      Your wallet to use transactions
                    </small>
                    <br />
                    <button
                      className="req-button mt-4"
                      type="button"
                      onClick={hashExist}
                    >
                      Check Hash Transaction
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div
                  className="border-light box-shadow h-100"
                  style={{ alignSelf: "center" }}
                >
                  <div className="card-body price-layout">
                    <div>
                      <IconChecklist size={80} stroke={1} />
                      <div className="mx-3">
                        <br />
                        <h4>
                          <strong>Total Price:</strong>
                        </h4>
                        <br />
                        <h2>{payFor} NEAR</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {hashAvailable ? (
            <>
              <br />
              <label htmlFor="exampleInputEmail1">Your contact</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Discord ID or Personal Twitter"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
              <small id="emailHelp" className="form-text text-white">
                We use this contact for all verification purpose (Payment,
                Information or etc). Feel free to dm's us on our official social
                media for more detail information!.
              </small>
              <br />
              <br />
              <label htmlFor="exampleInputEmail1">Your Email Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
              />
              <br />
              <br />
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
                    <strong>Your request successfully added !</strong>
                  </div>
                </div>
              ) : (
                ""
              )}
              <button
                className="req-button"
                onClick={submitRequest}
                type="button"
              >
                Submit
              </button>
            </>
          ) : (
            ""
          )}
        </form>
        <br />
        <br />
      </div>
    </MainCard>
  );
};

export default Bot;
