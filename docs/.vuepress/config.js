module.exports = {
    title: 'zxx\'s blog',
    description: 'Just playing around',
    base: '/blog.my/',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        lastUpdated: 'Last Updated',
       sidebar: [
            {
                title: 'JS',
                collapsable: false,
                children: [
                    '/JS/module',
                ]
            },
            {
                title: 'GIT',
                collapsable: false,
                children: [
                    '/git/git-base',
                    '/git/git-internals',
                ]
            },
            {
                title: 'SHELL',
                collapsable: false,
                children: [
                    '/shell/subshell',
                ]
            },
        ],
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
