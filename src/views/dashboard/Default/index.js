import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";
import Marquee from "react-fast-marquee";
import {
  IconCoin,
  IconArrowBarUp,
  IconReportMoney,
  IconChartInfographic,
} from "@tabler/icons";

// project imports
import EarningCard from "./EarningCard";
import PopularCard from "./PopularCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "../../../store/constant";
import "../css/dashboard.css";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <div
          className="container bg-card mb-4 p-4"
          style={{ maxWidth: "unset" }}
        >
          <h3>Comingsoon</h3>
        </div>
        <div
          className="container mb-4"
          style={{
            maxWidth: "unset",
            paddingRight: "0",
            paddingLeft: "1.5rem",
          }}
        >
          <Grid container spacing={gridSpacing}>
            <Marquee gradient={false}>
              {/* <Grid
                item
                lg={4}
                md={6}
                sm={6}
                xs={12}
                style={{ margin: "0.5rem 0.5rem" }}
              >
                <div className="bg-card p-4">
                  <div className="row">
                    <div className="col-sm-6">
                      <IconChartInfographic size={80} stroke={1} />
                    </div>
                    <div className="col-sm-6 text-end">
                      <button type="button" className="req-button" disabled>
                        Up Coming!
                      </button>
                    </div>
                  </div>
                  <div className="mt-4" style={{ padding: "0 0.5rem" }}>
                    <h4>Ranking</h4>
                    <label>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                      <br /> Nunc lacus odio, facilisis a vulputate et, blandit
                      iaculis nulla.
                    </label>
                  </div>
                </div>
              </Grid> */}
              <Grid
                item
                lg={4}
                md={6}
                sm={6}
                xs={12}
                style={{ margin: "0.5rem 0.5rem" }}
              >
                <div className="bg-card p-4">
                  <div className="row">
                    <div className="col-sm-6">
                      <IconReportMoney size={80} stroke={1} />
                    </div>
                    <div className="col-sm-6 text-end">
                      <button type="button" className="req-button" disabled>
                        Up Coming!
                      </button>
                    </div>
                  </div>
                  <div className="mt-4" style={{ padding: "0 0.5rem" }}>
                    <h4>Marketplace</h4>
                    <label style={{ fontSize: "14px" }}>
                      BoxCube opens up a whole new realm for NFT creators,
                      <br />
                      allowing the same NFT to be used across a variety of
                      <br />
                      games. We will launch an NFT editor, which will make it
                      <br />
                      easier to create NFTs and export NFTs to the Marketplace
                      for sale.
                    </label>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                sm={6}
                xs={12}
                style={{ margin: "0.5rem 0.5rem" }}
              >
                <div className="bg-card p-4">
                  <div className="row">
                    <div className="col-sm-6">
                      <IconCoin size={80} stroke={1} />
                    </div>
                    <div className="col-sm-6 text-end">
                      <button type="button" className="req-button" disabled>
                        Up Coming!
                      </button>
                    </div>
                  </div>
                  <div className="mt-4" style={{ padding: "0 0.5rem" }}>
                    <h4>Staking</h4>
                    <label style={{ fontSize: "14px" }}>
                    BoxCube support passive staking for its holder. By just{" "}
                      <br />
                      holding our NFT you will earn Token. The more you stake
                      <br />
                       NFTs the more you will get Token.
                      <br />
                      <br />
                    </label>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                sm={6}
                xs={12}
                style={{ margin: "0.5rem 0.5rem" }}
              >
                <div className="bg-card p-4">
                  <div className="row">
                    <div className="col-sm-6">
                      <IconReportMoney size={80} stroke={1} />
                    </div>
                    <div className="col-sm-6 text-end">
                      <button type="button" className="req-button" disabled>
                        Up Coming!
                      </button>
                    </div>
                  </div>
                  <div className="mt-4" style={{ padding: "0 0.5rem" }}>
                    <h4>Marketplace</h4>
                    <label style={{ fontSize: "14px" }}>
                      BoxCube opens up a whole new realm for NFT creators,
                      <br />
                      allowing the same NFT to be used across a variety of
                      <br />
                      games. We will launch an NFT editor, which will make it
                      <br />
                      easier to create NFTs and export NFTs to the Marketplace
                      for sale.
                    </label>
                  </div>
                </div>
              </Grid>
            </Marquee>
            {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid> */}
            {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
