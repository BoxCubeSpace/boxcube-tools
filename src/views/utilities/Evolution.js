// import MainCard from '../../ui-component/cards/MainCard';
// import { useEffect, useState } from 'react';
// import useTenk from '../../fetch/useTenk';
// import { wallet } from '../../index.tsx';

// const Evolution = () => {
//     const { nfts } = useTenk();
//     const [isWalletConnect, setIsWalletConnect] = useState(false);
    
//     useEffect(() => {
//         if (wallet.account().accountId !== undefined) {
//             setIsWalletConnect(true);
//             console.log(isWalletConnect);
//             console.log('wallet connected :' + wallet.account().accountId);
//             console.log('token id length :' + nfts.length);
//         }
//     }, []);

//     return (
//         <MainCard title="Evolution">
//             <div style={{ position: 'relative' }}>
//                 <div
//                     className="modal fade"
//                     id="exampleModalCenter"
//                     tabIndex="-1"
//                     role="dialog"
//                     aria-labelledby="exampleModalCenterTitle"
//                     aria-hidden="true"
//                 >
//                     <div className="modal-dialog modal-dialog-centered" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title" id="exampleModalLongTitle">
//                                     Modal title
//                                 </h5>
//                                 <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close">
//                                     <span aria-hidden="true">&times;</span>
//                                 </button>
//                             </div>
//                             <div className="modal-body">
//                                 Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
//                                 quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
//                                 scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
//                                 Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
//                                 consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
//                                 consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
//                                 risus, porta ac consectetur ac, vestibulum at eros.
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="container">
//                 <img
//                     src="https://www.guardianoffshore.com.au/wp-content/uploads/2015/03/banner-placeholder.jpg"
//                     width="100%"
//                     alt=""
//                     style={{ borderRadius: '1rem' }}
//                 />
//                 <p className="text-center">
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat massa ut nulla placerat, vel auctor leo
//                     vestibulum. Interdum et malesuada fames ac ante ipsum primis in faucibus.
//                 </p>
//             </div>
//             <div className="container">
//                 <div className="row text-center">
//                     <div className="col-sm-4" style={{ alignSelf: 'center' }}>
//                         <h6>Select NFT</h6>
//                         <a href="!#" data-toggle="modal" data-target="#exampleModalCenter">
//                             <img
//                                 src="https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png"
//                                 width="200"
//                                 alt=""
//                             />
//                         </a>
//                         <br />
//                         <br />
//                     </div>
//                     <div className="col-sm-4" style={{ alignSelf: 'center' }}>
//                         <br />
//                         <img
//                             src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/plus-512.png"
//                             width="200"
//                             alt=""
//                         />
//                         <br />
//                         <br />
//                     </div>
//                     <div className="col-sm-4" style={{ alignSelf: 'center' }}>
//                         <h6>Select Serum</h6>
//                         <a href="!#">
//                             <img
//                                 src="https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png"
//                                 width="200"
//                                 alt=""
//                             />
//                         </a>
//                         <br />
//                         <br />
//                     </div>
//                     {/* <div className="col-sm-3" style={{ alignSelf: 'center' }}>
//                         <br />
//                         <h6>Result</h6>
//                         <img src="https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png" width="200" alt="" />
//                         <br />
//                         <br />
//                         <button type="button" className="btn btn-primary">Claim</button>
//                     </div> */}
//                 </div>
//             </div>
//         </MainCard>
//     );
// };

// export default Evolution;
