/* eslint-disable indent */
export default [
    {
        path: '/meeting',
        name: 'landing-page',
        component: require('components/MeetingView'),
        props: {default: true, sidebar: false}
    },
    {
        path: '/',
        name: 'start-meeting',
        component: require('components/Start'),
        props: true
    },
    {
        path: '/pdf',
        name: 'savepdf',
        component: require('components/pdfView'),
        props: true
    },
    {
        path: '*',
        redirect: '/'
    }
]
