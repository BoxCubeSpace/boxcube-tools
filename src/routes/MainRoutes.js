import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsRanking = Loadable(lazy(() => import('../views/utilities/Ranking')));
const UtilsMarketplace = Loadable(lazy(() => import('../views/utilities/Marketplace')));
const UtilsClaimToken = Loadable(lazy(() => import('../views/utilities/ClaimToken')));
const UtilsEvolution = Loadable(lazy(() => import('../views/utilities/Evolution')));
const UtilsLaunchpad = Loadable(lazy(() => import('../views/utilities/Launchpad')));
const UtilsBot = Loadable(lazy(() => import('../views/utilities/Bot')));
const CreateToken = Loadable(lazy(() => import('../views/utilities/CreateToken')));
const FetchNFTsHolder = Loadable(lazy(() => import('../views/utilities/FetchNftsHolder')));
const BulkDistribution = Loadable(lazy(() => import('../views/utilities/BulkDistributionToken')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-ranking',
            element: <UtilsRanking />
        },
        {
            path: '/utils/util-market',
            element: <UtilsMarketplace />
        },
        {
            path: '/utils/util-claim',
            element: <UtilsClaimToken />
        },
        {
            path: '/utils/util-evo',
            element: <UtilsEvolution />
        },
        {
            path: '/utils/util-launchpad',
            element: <UtilsLaunchpad />
        },
        {
            path: '/utils/util-bot',
            element: <UtilsBot />
        },
        {
            path: '/utils/util-create-token',
            element: <CreateToken />
        },
        {
            path: '/utils/util-fetch',
            element: <FetchNFTsHolder />
        },
        {
            path: '/utils/util-send',
            element: <BulkDistribution />
        }
    ]
};

export default MainRoutes;
