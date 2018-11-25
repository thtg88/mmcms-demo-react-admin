export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'fa fa-tachometer',
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
        {
            name: 'Roles',
            url: '/roles',
            icon: 'fa fa-black-tie',
        },
    ],
};
