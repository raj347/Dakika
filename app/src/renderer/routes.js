/* eslint-disable indent */
export default [
    {
        path: '/',
        name: 'landing-page',
        component: require('components/MeetingView'),
        props: {default: true, sidebar: false}
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
