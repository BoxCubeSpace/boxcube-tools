// assets
import { IconPalette, IconWindmill, IconCoin, IconArrowBarUp, IconReportMoney, IconRocket, IconRobot, IconChartAreaLine, IconFolder, IconSend } from '@tabler/icons';

// constant
const icons = {
    IconPalette,
    IconWindmill,
    IconArrowBarUp,
    IconReportMoney,
    IconCoin,
    IconRocket,
    IconChartAreaLine,
    IconRobot,
    IconFolder,
    IconSend
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-ranking',
            title: 'Ranking',
            type: 'item',
            url: '/utils/util-ranking',
            icon: icons.IconChartAreaLine,
            breadcrumbs: false
        },
        // {
        //     id: 'util-market',
        //     title: 'Marketplace',
        //     type: 'item',
        //     url: '/utils/util-market',
        //     icon: icons.IconReportMoney,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-claim',
        //     title: 'Claim Token',
        //     type: 'item',
        //     url: '/utils/util-claim',
        //     icon: icons.IconCoin,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-evo',
        //     title: 'Evolution',
        //     type: 'item',
        //     url: '/utils/util-evo',
        //     icon: icons.IconArrowBarUp,
        //     breadcrumbs: false
        // },
        {
            id: 'util-launchpad',
            title: 'Launchpad',
            type: 'item',
            url: '/utils/util-launchpad',
            icon: icons.IconRocket,
            breadcrumbs: false
        },
        {
            id: 'util-bot',
            title: 'Bot',
            type: 'item',
            url: '/utils/util-bot',
            icon: icons.IconRobot,
            breadcrumbs: false
        },
        {
            id: 'util-create-token',
            title: 'Create Token',
            type: 'item',
            url: '/utils/util-create-token',
            icon: icons.IconCoin,
            breadcrumbs: false
        },
        {
            id: 'util-fetch',
            title: 'Fetch NFTs Holder',
            type: 'item',
            url: '/utils/util-fetch',
            icon: icons.IconFolder,
            breadcrumbs: false
        },
        {
            id: 'util-send',
            title: 'Bulk Distribution Token',
            type: 'item',
            url: '/utils/util-send',
            icon: icons.IconSend,
            breadcrumbs: false
        }
    ]
};

export default utilities;
