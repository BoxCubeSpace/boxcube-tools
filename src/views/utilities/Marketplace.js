import { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from '../../ui-component/cards/MainCard';
import '../../assets/css/market-place.css';

const Marketplace = () => {
    const [getData, setGetData] = useState('');
    const [getOwner, setGetOwner] = useState('');
    const [seller, setSeller] = useState('');
    const [tokenSeries, setTokenSeries] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        (async () => {
            await axios
                .get('https://api-v2-mainnet.paras.id/token-series?__limit=10&collection_id=gen0.metafoxonry.near')
                .then((res) => {
                    let getData = res.data.data;
                    setGetData(getData);
                    console.log(getData);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(tokenSeries);
            await axios
                .get('https://api-v2-mainnet.paras.id/token?collection_id=gen0.metafoxonry.near')
                .then((res) => {
                    let fp = res.data.data;
                    fp.results.map((item) => {
                        setGetOwner(item.owner_id);
                        console.log(item.owner_id);
                    });
                    console.log(fp);
                })
                .catch((err) => {
                    console.log(err);
                });
        })();
    }, []);

    return (
        <>
            <MainCard>
                <h1>Marketplace</h1>
            </MainCard>
            <br />
            <MainCard>
                <div className="wrap-card">
                    {getData.results?.map((item) => {
                        return (
                            <div className="card ">
                                <h6 className="text-center p-2 color-primary title-card">{item.metadata.title}</h6>
                                <img src="" width="100%" alt="" />
                                <div className="p-1">
                                    <div className="card m-0 p-1 text-center" style={{ width: '100%', boxShadow: 'unset' }}>
                                        {getOwner}
                                    </div>
                                </div>
                                <div className="p-2 color-primary row-detail">
                                    <span className="desc-card">0.5 Ⓝ ~ $2.58</span>
                                    <a className="text-end" href={() => false}>
                                        <img
                                            className="icon-more"
                                            src="http://cdn.onlinewebfonts.com/svg/img_159305.png"
                                            width="20%"
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <button type="button">Buy Now</button>
                            </div>
                        );
                    })}
                </div>
            </MainCard>
        </>
    );
};

export default Marketplace;
