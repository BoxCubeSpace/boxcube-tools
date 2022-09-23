// import MainCard from "../../ui-component/cards/MainCard";
// import { useEffect, useState } from "react";
// import useTenk from "../../fetch/useTenk";
// import { wallet } from "../../index.tsx";
// // import { db } from "../../resources/firebaseConfig";
// // import {
// //   updateDoc,
// //   doc,
// //   getDoc,
// //   setDoc,
// // } from "firebase/firestore";

// export const ClaimToken = () => {
//   const { tokensLeft } = useTenk();
//   const [isWalletConnect, setIsWalletConnect] = useState(false);
//   const [totalClaim, setTotalClaim] = useState("");
//   const [totalTokenId, setTotalTokenId] = useState("");
//   // const colRefget = doc(db, "claimValidation", wallet.account().accountId);
//   // const recordget = getDoc(colRefget);

//   // const calculateToken = async () => {
//   //     const getTotalMint = nfts.length;
//   //     const totalMint = getTotalMint * 10;
//   //     console.log(`total mint address : ${getTotalMint}`);
//   //     console.log(`total token : ${totalMint}`);
//   //     setTotalTokenId(getTotalMint);
//   //     setTotalClaim(totalMint);
//   // };

//   // const addWalletToDb = async (
//   //     walletAddress,
//   //     status
//   //   ) => {
//   //     await setDoc(colRefget, {
//   //       walletAddress: walletAddress,
//   //       status: status,
//   //     });
//   //     console.log("create success");
//   //   };

//   //   const updateWalletToDb = async (
//   //     status,
//   //     address
//   //   ) => {
//   //     const walletDoc = doc(db, process.env.REACT_APP_FIREBASE_COLLECTION, address);
//   //     const changeDoc = {
//   //         status: status
//   //     };
//   //     await updateDoc(walletDoc, changeDoc);
//   //     console.log("update succeded");
//   //   };

//   // const claimToken = async () => {
//   //     // here is function to transfer token from wallet to claimer
//   // };

//   useEffect(() => {
//     if (wallet.account().accountId !== undefined) {
//       console.log(tokensLeft);
//     }
//     // if (wallet.account().accountId !== undefined) {
//     //     setIsWalletConnect(true);
//     //     console.log(wallet.account().accountId);
//     //     console.log('token id length :' + nfts.length);
//     //     calculateToken();
//     // } else if (wallet.account().accountId == undefined){
//     //     setTotalTokenId("0");
//     //     setTotalClaim("0");
//     // }
//   }, []);

//   return (
//     <MainCard title="Claim Token">
//       <div className="container text-center">
//         {/* <div className="row"> */}
//         {/* <div className="col-sm-4" style={{ alignSelf: 'center' }}>
//                         <img src="https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png" width="100%" alt="" />
//                         <br />
//                         <br />
//                     </div> */}
//         {/* <div className="col-sm-8 text-center"> */}
//         <h1>Title</h1>
//         <p className="p-2">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, harum
//           ducimus nihil reprehenderit atque molestiae, dicta, quo aspernatur
//           natus iure ab necessitatibus odio saepe minus sit accusantium commodi
//           obcaecati odit.
//         </p>
//         <button
//           type="button"
//           className="btn btn-primary"
//           style={{ width: "100%" }}
//         >
//           Go To Arena
//         </button>
//         {/* <p className="card p-2">Token/NFT: 10 </p>
//                         <p className="card p-2">NFT Detected: {totalTokenId}</p>
//                         <p className="card p-2">Total Claim: {totalClaim} </p> */}
//         {/* </div> */}
//         {/* </div> */}
//         {/* {!isWalletConnect ? (
//                     <button type="button" className="btn btn-primary disabled" style={{ width: '100%' }}>
//                         Connect Your Wallet Fisrt
//                     </button>
//                 ) : nfts.length == 0 ? (
//                     <button type="button" className="btn btn-primary disabled" style={{ width: '100%' }}>
//                         You Don't Have Any NFT
//                     </button>
//                 ) : (
//                     <button onClick={calculateToken} type="button" className="btn btn-primary" style={{ width: '100%' }}>
//                         Claim Token
//                     </button>
//                 )} */}
//       </div>
//     </MainCard>
//   );
// };

// export default ClaimToken;
