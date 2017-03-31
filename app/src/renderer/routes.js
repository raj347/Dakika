export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/MeetingView')
  },
  {
    path: '/d',
    name: 'start-meeting',
    component: require('components/AgendaView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
