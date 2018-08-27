export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
        },
        {
            divider: true,
        },
        {
            title: true,
            name: 'System',
            wrapper: {
                // required valid HTML5 element tag
                element: ''
            },
            // optional class names space delimited list for title item ex: "text-center"
            class: ''
        },
        {
            name: 'Users',
            url: '/users',
            icon: 'fa fa-users',
        },
    ],
};
