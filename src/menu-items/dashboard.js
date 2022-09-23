// assets
import { IconActivity } from '@tabler/icons';

// constant
const icons = { IconActivity };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.IconActivity,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
