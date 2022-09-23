import { useState, useEffect } from "react";
import MainCard from "../../ui-component/cards/MainCard";
import { sendMultipleToken, sendMultipleNear } from "../../resources/sendToken";
import "./style/create_token.css";
import "./style/general.css";
import { IconSend } from "@tabler/icons";

const CreateToken = () => {
  const [chooseDistribute, setChooseDistribute] = useState(false);
  const [firstPage, setFirstPage] = useState(false);
  const [validation, setValidation] = useState(false);
  const [requireData, setRequireData] = useState(false);
  const [emptyForm, setEmptyForm] = useState(false);
  const [files, setFiles] = useState("");
  const [ftContract, setFtContract] = useState("");

  const changePage = async () => {
    setFirstPage(true);
  };

  const backToLanding = async () => {
    setFirstPage(false);
  };

  useEffect(() => {
    console.log(files);
  }, [ftContract, chooseDistribute]);

  const sendToken = async () => {
    if (window.walletAccount.isSignedIn()) {
      if (files !== "") {
        if (
          files[0].ft_amount !== undefined &&
          files[0].wallet_id !== undefined
        ) {
          let data = files;

          console.log(data);

          let resp = await sendMultipleToken(
            window.walletAccount,
            data,
            ftContract
          );
          // let resp = await sendMultipleNear(
          //   // window.walletAccount,
          //   data
          //   // ftContract
          // );
          console.log(resp);

          setValidation(true);
          setEmptyForm(false);
          setRequireData(false);
        } else {
          setRequireData(true);
          setValidation(false);
          setEmptyForm(false);
        }
      } else {
        setEmptyForm(true);
        setValidation(false);
        setRequireData(false);
      }
    } else {
      alert("Please login first");
    }
  };

  const sendNear = async () => {
    if (window.walletAccount.isSignedIn()) {
      if (files !== "") {
        if (
          files[0].ft_amount !== undefined &&
          files[0].wallet_id !== undefined
        ) {
          let data = files;

          console.log(data);

          // let resps = await sendMultipleToken(
          //   window.walletAccount,
          //   data,
          //   ftContract
          // );
          let resp = await sendMultipleNear(
            // window.walletAccount,
            data
            // ftContract
          );
          console.log(resp);

          setValidation(true);
          setEmptyForm(false);
          setRequireData(false);
        } else {
          setRequireData(true);
          setValidation(false);
          setEmptyForm(false);
        }
      } else {
        setEmptyForm(true);
        setValidation(false);
        setRequireData(false);
      }
    } else {
      alert("Please login first");
    }
  };

  if (firstPage === false) {
    return (
      <div className="bg-card">
        <div className="container mt-4">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-sm-6">
              <h1>Distribute your Near or utility Token</h1>
              <p className="mt-4">
                Distribute NEAR and NEP-141 tokens to multiple addresses in bulk
                with just a few transactions, in a few simple steps.
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
              <IconSend stroke="1" size="100%"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log(JSON.parse(e.target.result));
      setFiles(JSON.parse(e.target.result));
    };
  };

  return (
    <>
      <MainCard title="Create Token">
        <div className="container text-center pt-4 mt-4">
          <h2>Distribute Token Instantly</h2>
          <button className="backward" type="button" onClick={backToLanding}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/boxcube-33f6d.appspot.com/o/launchapp%2Fback-forward.png?alt=media&token=991a60ec-8c34-448a-a4a1-35a7276b67eb"
              width="20%"
              alt=""
            />
          </button>
        </div>
        <div className="container">
          <p className="text-center">Choose distribute:</p>
          <div className="row">
            <div className="col-sm-6 text-center">
              <button
                style={{ background: "none", border: "none", width: "100%" }}
                onClick={() => {
                  setChooseDistribute(false);
                }}
              >
                <div className="bg-card-btn p-4"><b>TOKEN</b></div>
              </button>
            </div>
            <div className="col-sm-6 text-center">
              <button
                style={{ background: "none", border: "none", width: "100%" }}
                onClick={() => {
                  setChooseDistribute(true);
                }}
              >
                <div className="bg-card-btn p-4"><b>NEAR</b></div>
              </button>
            </div>
          </div>
          {!chooseDistribute ? (
            <>
              <div className="mb-4">
                <br />
                <label>FT Contract ID</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setFtContract(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label>Input Bulk Data</label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept="application/json"
                  onChange={handleChange}
                />
              </div>
              {requireData ? (
                <label style={{ color: "red" }}>
                  <strong>Seems your data not complete yet.</strong>
                </label>
              ) : (
                ""
              )}
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
              {validation ? (
                <div
                  className="alert alert-success d-flex align-items-center"
                  role="alert"
                >
                  <div>
                    <strong>Token successfully transfered!</strong>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="container mb-4 text-center">
                <button
                  className="req-button"
                  type="button"
                  onClick={sendToken}
                >
                  Start
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <br />
                <label>Input Bulk Data</label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept="application/json"
                  onChange={handleChange}
                />
              </div>
              {requireData ? (
                <label style={{ color: "red" }}>
                  <strong>Seems your data not complete yet.</strong>
                </label>
              ) : (
                ""
              )}
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
              <div className="container mb-4 text-center">
                <button
                  className="req-button"
                  type="button"
                  onClick={sendNear}
                >
                  Start
                </button>
              </div>
            </>
          )}
        </div>
      </MainCard>
    </>
  );
};

export default CreateToken;
