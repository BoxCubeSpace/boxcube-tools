import { useState, useEffect } from "react";
import MainCard from "../../ui-component/cards/MainCard";
import {
  getSupplyForOwner,
  loadContract,
} from "../../resources/contract";
import { config } from "../../resources/config";
import "./style/create_token.css";
import "./style/general.css";
import { saveAs } from "file-saver";
import { IconFolder } from "@tabler/icons";

const FetchNftsHolder = () => {
  const [validation, setValidation] = useState(false);
  const [loadValidation, setLoadValidation] = useState(false);
  const [emptyForm, setEmptyForm] = useState(false);
  const [firstPage, setFirstPage] = useState(false);
  const [contractId, setContractId] = useState("");
  const [contractNft, setContractNft] = useState("");
  const [contractFt, setContractFt] = useState("");
  const [ftAmount, setFtAmount] = useState("");
  const [log, setLog] = useState();

  const changePage = async () => {
    setFirstPage(true);
  };

  const backToLanding = async () => {
    setFirstPage(false);
  };

  useEffect(() => {
    initNear();
    console.log(contractId);
  }, [contractId, log]);

  const initNear = async () => {
    let contractNft = await loadContract(contractId, "NFT");

    setContractNft(contractNft);
    setContractFt(contractFt);
  };

  const fetchData = async () => {
    if (contractId !== "") {
      setEmptyForm(false);
      let result = [];
      const response = await fetch(
        `${config.apiUrl}/collection-stats?collection_id=${contractId}`
      );
      const data = await response.json();
      // console.log(data);
      let ownerIds = data.data.results.owner_ids;
      // console.log(ownerIds);
      if (!ownerIds) return alert("No data found");
      if (ftAmount !== "") {
        for (let ownerId of ownerIds) {
          let supplyNft = await getSupplyForOwner(contractNft, ownerId);
          // console.log(`${ownerId} has ${supplyNft}`);
          result.push({
            wallet_id: ownerId,
            nft_amount: supplyNft,
            // ft_amount: formatToken(supplyFt).toFixed(2),
            ft_amount: parseInt(supplyNft) * parseInt(ftAmount).toString(),
          });
          console.log(result);
          setLog(JSON.stringify(result));
          var textarea = document.getElementById("textarea_id");
          textarea.scrollTop = textarea.scrollHeight;
          // break;
        }
      }
      if (ftAmount === "") {
        for (let ownerId of ownerIds) {
          let supplyNft = await getSupplyForOwner(contractNft, ownerId);
          // console.log(`${ownerId} has ${supplyNft}`);
          result.push({
            wallet_id: ownerId,
            nft_amount: supplyNft,
          });
          // console.log(result);
          setLog(JSON.stringify(result));
          var textarea = document.getElementById("textarea_id");
          textarea.scrollTop = textarea.scrollHeight;
          // break;
        }
      }
      // console.log(result);
      setValidation(true);
      setLog("FETCHING DATA SUCCESS");
      saveAs(
        new Blob([JSON.stringify(result, null, 2)], { type: "JSON" }),
        `FetchingNFTsHolder_${contractId} - BOXCUBE.json`
      );
    } else {
      setValidation(false);
      setEmptyForm(true);
    }
  };

  if (firstPage === false) {
    return (
      <div className="bg-card">
        <div className="container mt-4">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-sm-6">
              <h1>Fetch all of your holders data for develop purpose</h1>
              <p className="mt-4">
                Get data of Holders from NEAR Contract IDs. It will show the
                wallet address and amount of NFTs in the wallet.
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
              <IconFolder stroke="1" size="100%"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <MainCard title="NFT Holders Fetcher">
        <div className="container text-center pt-4 mt-4">
          <h2>NFT Holders Fetcher</h2>
          <button className="backward" type="button" onClick={backToLanding}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/boxcube-33f6d.appspot.com/o/launchapp%2Fback-forward.png?alt=media&token=991a60ec-8c34-448a-a4a1-35a7276b67eb"
              width="20%"
              alt=""
            />
          </button>
        </div>
        <div className="container">
          <div className="mb-4">
            <label>Contract Id</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Contract Id"
              onChange={(e) => {
                setContractId(e.target.value);
              }}
              name="contractId"
            />
          </div>
          <div className="mb-4">
            <label>FT Amount (Optional)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter FT Amount"
              onChange={(e) => {
                setFtAmount(e.target.value);
              }}
              name="ftAmount"
            />
            <small>
              Note: Total token you want to give for Holder, Formula : (NFTs
              Amount/Holder) x (FT Amount).
            </small>
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
          {validation ? (
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <div>
                <strong>Your data successfully saved !</strong>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="container mb-4 text-center">
            <button className="req-button" type="button" onClick={fetchData}>
              Get Holders
            </button>
          </div>
          <div className="container mb-4 pb-4">
            <h6>Log</h6>
            <textarea
              className="form-control"
              id="textarea_id"
              rows="5"
              readOnly
              autoFocus
              // onChangeText={(val) => setText(val)}
              value={log}
              style={{ resize: "none" }}
            >
              {log}
            </textarea>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default FetchNftsHolder;
