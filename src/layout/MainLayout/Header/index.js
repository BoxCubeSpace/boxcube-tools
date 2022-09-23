import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import { loginNear, getWalletAccount } from "../../../resources/contract";

// assets
import { IconMenu2 } from "@tabler/icons";
import { login, logout } from "../../../utils.js";
import "../../../assets/css/header.css";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const [walletAccount, setWalletAccount] = useState(null);
  useEffect(() => {
    initNear();
    console.log(window.walletAccount.getAccountId());
  }, []);
  const initNear = async () => {
    let walletAccount = await getWalletAccount();

    setWalletAccount(walletAccount);
  };
  const theme = useTheme();
  const onLogin = async () => {
    if (window.walletAccount && window.walletAccount.isSignedIn()) {
      window.walletAccount.signOut();
      window.location.reload();
    } else {
      loginNear(window.walletAccount);
    }
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        {/* <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box> */}
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <div className="header-control">
        <button type="button" class="req-button" onClick={onLogin}>
          {window.walletAccount
            ? window.walletAccount.isSignedIn()
              ? "Disconnect"
              : "Connect Wallet"
            : "Connect Wallet"}
        </button>
      </div>
      {/* <div className="header-control">
                {!window.walletConnection.isSignedIn() ? (
                    <button className="connect-button" onClick={login}>
                        Connect Wallet
                    </button>
                ) : (
                    <>
                        <div className="wallet-address m-2">
                            <span style={{ color: '#898989' }}>
                                {window.accountId}
                            </span>
                        </div>
                        <button className="connect-button" onClick={logout}>
                            Disconnect
                        </button>
                    </>
                )}
            </div> */}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
