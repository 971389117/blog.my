module.exports = {
    title: 'zxx\'s blog',
    description: 'Just playing around',
    base: '/zxx-ui-least/',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [{
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guide',
                link: '/guide/'
            },
            {
                text: 'External',
                link: 'https://google.com'
            },
            {
                text: 'Languages',
                items: [{
                        text: '简体中文',
                        link: '/language/chinese'
                    },
                    {
                        text: 'Japanese',
                        link: '/language/japanese'
                    }
                ]
            }
        ],
        sidebar: [
            './',
            {
                title: 'shell',
                collapsable: false,
                children: [
                    '/shell/subShell',
                ]
            },
        ]
        // sidebar: [{
        //         title: '梦想',
        //         children: [
        //             '/',
        //             '/contact',
        //             '/about',
        //         ]
        //     },
        //     {
        //         title: '开始',
        //         collapsable: false,
        //         children: [
        //             '/get-started/',
        //         ]
        //     },
        //     {
        //         title: '动物',
        //         collapsable: false,
        //         children: [
        //             '/components/',
        //             '/components/cat',
        //             '/components/dog',
        //         ]
        //     },
        // ]
    }
}
