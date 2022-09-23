import MainCard from "../../ui-component/cards/MainCard";
import { useEffect, useState } from "react";
import { db, storage } from "../../resources/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { IconPlus } from "@tabler/icons";
import emailjs from "emailjs-com";
import "./style/launchpad.css";
import "./style/general.css";
import { IconRocket } from "@tabler/icons";

const Launchpad = () => {
  const [firstPage, setFirstPage] = useState(false);
  const [validation, setValidation] = useState(false);
  const [loadValidation, setLoadValidation] = useState(false);
  const [emptyForm, setEmptyForm] = useState(false);
  const [imageArtwork, setImageArtwork] = useState(null);
  const [mintDate, setMintDate] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [discordServerLinks, setDiscordServerLinks] = useState("");
  const [otherLinks, setOtherLinks] = useState("");
  const [instagramLinks, setInstagramLinks] = useState("");
  const [twitterLinks, setTwitterLinks] = useState("");
  const [websiteLinks, setWebsiteLinks] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [currentStage, setCurrentStage] = useState("");
  const [wAR, setWAR] = useState("");
  const [wARLinks, setWARLinks] = useState("");
  const [twitterFollowers, setTwitterFollowers] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);
  // INITIAL ROYALTIES
  const [initialRoyalty2, setinitialRoyalty2] = useState("");
  const [initialRoyalty3, setinitialRoyalty3] = useState("");
  const [initialRoyalty4, setinitialRoyalty4] = useState("");
  const [initialRoyalty5, setinitialRoyalty5] = useState("");
  const [initialRoyalty2Percent, setinitialRoyalty2Percent] = useState(0);
  const [initialRoyalty3Percent, setinitialRoyalty3Percent] = useState(0);
  const [initialRoyalty4Percent, setinitialRoyalty4Percent] = useState(0);
  const [initialRoyalty5Percent, setinitialRoyalty5Percent] = useState(0);
  const [initialRoyalty2Checked, setinitialRoyalty2Checked] = useState(false);
  const [initialRoyalty3Checked, setinitialRoyalty3Checked] = useState(false);
  const [initialRoyalty4Checked, setinitialRoyalty4Checked] = useState(false);
  // SECONDARY ROYALTIES
  const [secondaryRoyalty2, setsecondaryRoyalty2] = useState("");
  const [secondaryRoyalty3, setsecondaryRoyalty3] = useState("");
  const [secondaryRoyalty4, setsecondaryRoyalty4] = useState("");
  const [secondaryRoyalty5, setsecondaryRoyalty5] = useState("");
  const [secondaryRoyalty2Percent, setsecondaryRoyalty2Percent] = useState(0);
  const [secondaryRoyalty3Percent, setsecondaryRoyalty3Percent] = useState(0);
  const [secondaryRoyalty4Percent, setsecondaryRoyalty4Percent] = useState(0);
  const [secondaryRoyalty5Percent, setsecondaryRoyalty5Percent] = useState(0);
  const [secondaryRoyalty2Checked, setsecondaryRoyalty2Checked] =
    useState(false);
  const [secondaryRoyalty3Checked, setsecondaryRoyalty3Checked] =
    useState(false);
  const [secondaryRoyalty4Checked, setsecondaryRoyalty4Checked] =
    useState(false);

  const templateParams1 = {
    name: projectName,
    twitter: twitterLinks,
    email: emailAddress,
    discord: discordId,
    to_email: process.env.REACT_APP_MAIL_ONE,
  };
  const templateParams6 = {
    name: projectName,
    twitter: twitterLinks,
    email: emailAddress,
    discord: discordId,
    to_email: process.env.REACT_APP_MAIL_SIX,
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default refresh by the browser
    await emailjs
      .send(
        process.env.REACT_APP_SERVICE_ONE,
        process.env.REACT_APP_TEMP_LAUNCHPAD,
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
        process.env.REACT_APP_TEMP_LAUNCHPAD,
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
    if (
      projectName == "" &&
      creatorName == "" &&
      totalSupply == "" &&
      mintPrice == "" &&
      twitterFollowers == "" &&
      twitterLinks == "" &&
      instagramLinks == "" &&
      emailAddress == "" &&
      discordId == "" &&
      discordServerLinks == "" &&
      wAR == "" &&
      wARLinks == "" &&
      websiteLinks == "" &&
      lastQuestion == "" &&
      currentStage == "" &&
      mintDate == "" &&
      imageArtwork == null
    ) {
      // console.log("error");
      setValidation(false);
      setEmptyForm(true);
    } else {
      setLoadValidation(true);
      setEmptyForm(false);
      const imageRefArtwork = ref(
        storage,
        `launchapp/launchpadRequest/sample/${
          projectName + "_" + imageArtwork.name + "_" + v4()
        }`
      );
      const colRefget = doc(
        db,
        "launchpadRequest",
        projectName + "_" + discordId
      );

      await uploadBytes(imageRefArtwork, imageArtwork).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((urlProfile) => {
          setDoc(colRefget, {
            projectName: projectName,
            artworkSample: urlProfile,
            creatorName: creatorName,
            totalSupply: totalSupply,
            mintPrice: mintPrice,
            mintDate: new Date(mintDate).toUTCString(),
            otherLinks: otherLinks,
            instagramLinks: instagramLinks,
            twitterLinks: twitterLinks,
            twitterFollowers: twitterFollowers,
            emailAddress: emailAddress,
            discordId: discordId,
            discordServerLinks: discordServerLinks,
            wAR: wAR,
            wARLinks: wARLinks,
            websiteLinks: websiteLinks,
            currentStage: currentStage,
            lastQuestion: lastQuestion,
            initialRoyalty2: {
              wallet: initialRoyalty2,
              royalties: initialRoyalty2Percent,
            },
            initialRoyalty3: {
              wallet: initialRoyalty3,
              royalties: initialRoyalty3Percent,
            },
            initialRoyalty4: {
              wallet: initialRoyalty4,
              royalties: initialRoyalty4Percent,
            },
            initialRoyalty5: {
              wallet: initialRoyalty5,
              royalties: initialRoyalty5Percent,
            },
            secondaryRoyalty2: {
              wallet: secondaryRoyalty2,
              royalties: secondaryRoyalty2Percent,
            },
            secondaryRoyalty3: {
              wallet: secondaryRoyalty3,
              royalties: secondaryRoyalty3Percent,
            },
            secondaryRoyalty4: {
              wallet: secondaryRoyalty4,
              royalties: secondaryRoyalty4Percent,
            },
            secondaryRoyalty5: {
              wallet: secondaryRoyalty5,
              royalties: secondaryRoyalty5Percent,
            },
            createdAt: new Date().toUTCString(),
          });
        });
      });
      // console.log("create success");
      setLoadValidation(false);
      setValidation(true);
      handleSubmit(e);
      // setInterval(() => {
      //   window.location.reload();
      // }, 3000);
    }
  };

  const changePage = async () => {
    setFirstPage(true);
  };

  const backToLanding = async () => {
    setFirstPage(false);
  };

  useEffect(async () => {
    // console.log(initialRoyalty2Checked);
  }, [submitRequest, currentStage, initialRoyalty2Checked]);

  if (firstPage === false) {
    return (
      <div className="bg-card">
        <div className="container mt-4">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-sm-6">
              <h1>Apply your project to get special benefit</h1>
              <p className="mt-2">
                <strong>Create your own NFT collection</strong>
                <br />
                We enable creators, brands, and builders to easily launch NFT
                collections. Focus on what really matters — the artwork,
                utility, and community.
                <br />
                <strong>Setup</strong>
                <br />
                Set up the collection details and drop information, including
                theme, story, quantity, rarity, price, royalties, and date.
                <br />
                <br />
                <small>
                  {" "}
                  <i>
                    *Note: If you Launch your Collection with our Launchpad,
                    you will get a Discord BOT ( Sales & Listing, Floor Price )
                  </i>
                </small>
              </p>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={changePage}
                  className="req-button mt-2"
                  style={{ margin: "0" }}
                >
                  Apply for Launchpad
                </button>
              </div>
            </div>
            <div className="col-sm-6">
              <IconRocket stroke="1" size="100%"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainCard title="Launchpad">
      <div className="container pt-4 mt-4">
        <button className="backward" type="button" onClick={backToLanding}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/boxcube-33f6d.appspot.com/o/launchapp%2Fback-forward.png?alt=media&token=991a60ec-8c34-448a-a4a1-35a7276b67eb"
            width="20%"
            alt=""
          />
        </button>
        <div className="row mb-4">
          {/* <div className="col-sm-3 text-center" style={{ alignSelf: "center" }}>
            <img src="../assets/logo.png" width="50%" />
          </div> */}
          <div className="col-sm-9">
            <h1>Launchpad</h1>
            <span>
              Since some Creator requested a way to add their collections on
              Launcpad platform, we came up with a clear, transparent and
              structured way of doing it. We want to give Launcpad a key role.
              Launcpad created to help projects and creator launch in a way that
              fair for all.
            </span>
          </div>
        </div>
        <form className="row g-3">
          <div className="col-12">
            <label htmlFor="projectName">Your Project Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Project Name"
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="col-12">
            <label htmlFor="CreatorName">
              Your Creator Name (in case different than Project Name)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Creator Name"
              onChange={(e) => {
                setCreatorName(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="col-md-6">
            <label htmlFor="TotalSupply">Total Supply</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Total Supply"
              onChange={(e) => {
                setTotalSupply(e.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="MintPrice">Mint Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Mint Price"
              onChange={(e) => {
                setMintPrice(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="col-3">
            <label htmlFor="MintDate">Mint Date</label>
            <input
              id="startDate"
              className="form-control"
              type="date"
              onChange={(e) => {
                setMintDate(e.target.value);
              }}
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="TwitterLinks">Twitter Links</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Twitter Links"
              onChange={(e) => {
                setTwitterLinks(e.target.value);
              }}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="TwitterLatestFollowers">
              Twitter Latest Followers
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Twitter Latest Followers"
              onChange={(e) => {
                setTwitterFollowers(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="EmailAddress">Email Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email Address"
              onChange={(e) => {
                setEmailAddress(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="InstagramLinks">Instagram Links</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Instagram Links"
              onChange={(e) => {
                setInstagramLinks(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="DiscordID">Discord ID (Main Contact)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Discord ID"
              onChange={(e) => {
                setDiscordId(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="DiscordServerLinks">Discord Server Links</label>
            <input
              type="text"
              className="form-control"
              placeholder="Discord Server Links"
              onChange={(e) => {
                setDiscordServerLinks(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="OtherLinks">Website Links</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Website Links"
              onChange={(e) => {
                setWebsiteLinks(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="OtherLinks">Other Link (Optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Other Link"
              onChange={(e) => {
                setOtherLinks(e.target.value);
              }}
            />
          </div>
          <div className="border-light p-4 mt-4 mb-4">
            <h6>
              * How would you best describe the current stage of your project
              artwork?
            </h6>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setCurrentStage(e.target.value);
              }}
            >
              <option selected>Select Condition</option>
              <option
                value="Completed and in digital files with metadata. Just need help
              minting!"
              >
                Completed and in digital files with metadata. Just need help
                minting!
              </option>
              <option value="Have not started my artwork yet">
                Have not started my artwork yet
              </option>
              <option value="I don't have any condition to selected">
                I don't have any condition to selected
              </option>
            </select>
            {/* <br />
            <span>
              Just in case you select "I don't have any condition to selected"
              at the top selection condition, you can do the following
              instructions below:
            </span>
            <br />
            <br />
            <span>
              <strong>* Case 1</strong> <br />
              If you not already started to generate your artwork, please hit
              this following button.
            </span>
            <br />
            <button
              type="button"
              className="req-button mt-2"
              style={{ margin: "0" }}
            >
              Direct
            </button>
            <br />
            <br />
            <span>
              <strong>* Case 2</strong> <br />
              If you already generate your artwork and metadata, please upload
              your artwork and metadata to ipfs first, hit this following
              button.
            </span> */}
            {/* <br />
            <button
              type="button"
              className="req-button mt-2"
              style={{ margin: "0" }}
            >
              Direct
            </button> */}
          </div>
          <label htmlFor="Artwork">Artwork</label>
          <br />
          <div className="col-12">
            <label htmlFor="formFile" className="form-label">
              Upload your sample artwork:
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              onChange={(e) => {
                setImageArtwork(e.target.files[0]);
              }}
            />
          </div>
          <label className="mt-4" htmlFor="WhitepaperAndRoadmap">
            Whitepaper and Roadmap
          </label>
          <span>
            1. Is there a whitepaper?
            <br />
            2. Is there a clearly defined roadmap?
            <br />
            3. How will the project use the funding raised during the mint?
            Please be as specific as possible.
            <br />
            4. What will the project do in the case it's not able to sell out
            and raise the required funding?
          </span>
          <textarea
            className="form-control"
            onChange={(e) => {
              setWAR(e.target.value);
            }}
          ></textarea>
          <label className="mt-4" htmlFor="WhitepaperAndRoadmap">
            Whitepaper and Roadmap: Links and Attachments
          </label>
          <span>
            Please provide any relevant links and attachments that support your
            case. For relevant attachments to support your case, please save in
            a public google drive and add a link below:
          </span>
          <textarea
            className="form-control mb-2"
            onChange={(e) => {
              setWARLinks(e.target.value);
            }}
          ></textarea>
          <div className="row border-light p-4 mt-4 mb-4">
            <div className="col-sm-6">
              <label htmlFor="InitialRoyalty1">Initial Royalty</label>
              <input
                type="text"
                className="form-control"
                placeholder="launchpad.royalties.near"
                disabled
              />
            </div>
            <div className="col-sm-6 pt-3">
              <label style={{ paddingRight: "1rem", paddingTop: "0.6rem" }}>
                15%
              </label>
            </div>
            <div className="col-sm-6 pt-3" style={{ alignSelf: "center" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Initial Royalty"
                onChange={(e) => {
                  setinitialRoyalty2(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-6" style={{ alignSelf: "center" }}>
              <input
                style={{ width: "15%", display: "unset", marginRight: "1rem" }}
                type="number"
                className="form-control"
                placeholder="0"
                onChange={(e) => {
                  setinitialRoyalty2Percent(e.target.value);
                }}
              />
              <button
                className="req-button"
                type="button"
                onClick={(e) => {
                  setinitialRoyalty2Checked(true);
                }}
              >
                <IconPlus />
              </button>
            </div>
            {initialRoyalty2Checked === true ? (
              <>
                <div className="col-sm-6 pt-3" style={{ alignSelf: "center" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Initial Royalty"
                    onChange={(e) => {
                      setinitialRoyalty3(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-6" style={{ alignSelf: "center" }}>
                  <input
                    style={{
                      width: "15%",
                      display: "unset",
                      marginRight: "1rem",
                    }}
                    type="number"
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => {
                      setinitialRoyalty3Percent(e.target.value);
                    }}
                  />
                  <button
                    className="req-button"
                    type="button"
                    onClick={(e) => {
                      setinitialRoyalty3Checked(true);
                    }}
                  >
                    <IconPlus />
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            {initialRoyalty3Checked === true ? (
              <>
                <div className="col-sm-6 pt-3" style={{ alignSelf: "center" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Initial Royalty"
                    onChange={(e) => {
                      setinitialRoyalty4(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-6" style={{ alignSelf: "center" }}>
                  <input
                    style={{
                      width: "15%",
                      display: "unset",
                      marginRight: "1rem",
                    }}
                    type="number"
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => {
                      setinitialRoyalty4Percent(e.target.value);
                    }}
                  />
                  <button
                    className="req-button"
                    type="button"
                    onClick={(e) => {
                      setinitialRoyalty4Checked(true);
                    }}
                  >
                    <IconPlus />
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            {initialRoyalty4Checked === true ? (
              <>
                <div className="col-sm-6 pt-3" style={{ alignSelf: "center" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Initial Royalty"
                    onChange={(e) => {
                      setinitialRoyalty5(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-6" style={{ alignSelf: "center" }}>
                  <input
                    style={{
                      width: "15%",
                      display: "unset",
                      marginRight: "1rem",
                    }}
                    type="number"
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => {
                      setinitialRoyalty5Percent(e.target.value);
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="row border-light p-4 mb-4">
            <div className="col-sm-6">
              <label htmlFor="SecondaryRoyalty1">Secondary Royalty</label>
              <input
                type="text"
                className="form-control"
                placeholder="launchpad.royalties.near"
                disabled
              />
            </div>
            <div className="col-sm-6 pt-3">
              <label style={{ paddingRight: "1rem", paddingTop: "0.6rem" }}>
                3%
              </label>
            </div>
            <div className="col-sm-6 pt-3" style={{ alignSelf: "center" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Secondary Royalty"
                onChange={(e) => {
                  setsecondaryRoyalty2(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-6" style={{ alignSelf: "center" }}>
              <input
                style={{
                  width: "15%",
                  display: "unset",
                  marginRight: "1rem",
                }}
                type="number"
                className="form-control"
                placeholder="0"
                onChange={(e) => {
                  setsecondaryRoyalty2Percent(e.target.value);
                }}
              />
              <button
                className="req-button"
                type="button"
                onClick={(e) => {
                  setsecondaryRoyalty2Checked(true);
                }}
              >
                <IconPlus />
              </button>
            </div>
            {secondaryRoyalty2Checked === true ? (
              <>
                <div className="col-sm-6 pt-3" style={{ alignSelf: "center" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Secondary Royalty"
                    onChange={(e) => {
                      setsecondaryRoyalty3(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-6" style={{ alignSelf: "center" }}>
                  <input
                    style={{
                      width: "15%",
                      display: "unset",
                      marginRight: "1rem",
                    }}
                    type="number"
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => {
                      setsecondaryRoyalty3Percent(e.target.value);
                    }}
                  />
                  <button
                    className="req-button"
                    type="button"
                    onClick={(e) => {
                      setsecondaryRoyalty3Checked(true);
                    }}
                  >
                    <IconPlus />
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            {secondaryRoyalty3Checked === true ? (
              <>
                <div className="col-sm-6 pt-3" style={{ alignSelf: "center" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Secondary Royalty"
                    onChange={(e) => {
                      setsecondaryRoyalty4(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-6" style={{ alignSelf: "center" }}>
                  <input
                    style={{
                      width: "15%",
                      display: "unset",
                      marginRight: "1rem",
                    }}
                    type="number"
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => {
                      setsecondaryRoyalty4Percent(e.target.value);
                    }}
                  />
                  <button
                    className="req-button"
                    type="button"
                    onClick={(e) => {
                      setsecondaryRoyalty4Checked(true);
                    }}
                  >
                    <IconPlus />
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            {secondaryRoyalty4Checked === true ? (
              <>
                <div className="col-sm-6 pt-3" style={{ alignSelf: "center" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Secondary Royalty"
                    onChange={(e) => {
                      setsecondaryRoyalty5(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-6" style={{ alignSelf: "center" }}>
                  <input
                    style={{
                      width: "15%",
                      display: "unset",
                      marginRight: "1rem",
                    }}
                    type="number"
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => {
                      setsecondaryRoyalty5Percent(e.target.value);
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col-12">
            <p>
              We'd love to give our NFT Holder whitelist supply if your
              project is willing. Please let us know how many whitelist spots
              you'd be willing to allocate to NFT Holder. *
            </p>
            <input
              type="text"
              className="form-control"
              placeholder=""
              onChange={(e) => {
                setLastQuestion(e.target.value);
              }}
            />
          </div>
        </form>
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
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={submitRequest}
            className="req-button mt-2"
            style={{ margin: "0" }}
          >
            Submit Request
          </button>
        </div>
      </div>
    </MainCard>
  );
};

export default Launchpad;
