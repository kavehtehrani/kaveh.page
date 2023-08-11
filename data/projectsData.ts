import type { Project } from '~/types'

export let projectsData: Project[] = [
  {
    type: 'work',
    title: 'Firinne Capital',
    description: `Firinne Capital is a digital assets hedge fund where I used to work as a co-founder and head of research.
    
    We wanted something simple and fast, with the ability to update for non-technical people on the team.`,
    imgSrc: '/static/images/fc_logo.png',
    url: 'https://www.firinnecapital.com/?ref=kaveh.page',
    builtWith: ['Squarespace'],
  },
  {
    type: 'work',
    title: 'Personal Blog',
    description: `The blog you are reading right now!`,
    imgSrc: '/static/images/kaveh.page.png',
    url: 'https://kaveh.page',
    repo: 'kaveh.page',
    builtWith: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Umami'],
  },
  {
    type: 'work',
    title: 'Traffic Signal',
    description: `My very first web app! Traffic control for shared spaces.  Wrote this during pandemic lockdown to coordinate with my roommates when it's OK to enter their space, especially people who are working in areas without a door such as the living room.

    Nothing special but it helped greatly in learning basics of interactive web design.`,
    imgSrc: '/static/images/traffic_signal.png',
    url: 'https://traffic-signal.cyclic.app/',
    repo: 'traffic_signal',
    builtWith: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    type: 'work',
    title: 'Ethereum Staking',
    description: `Consulting project in anticipation of Ethereum's transition to proof of stake in late 2021. Commissioned in May 2021 as part of a hedge fund pitch in offering staking as a service.`,
    imgSrc: '/static/images/ethereum.png',
    url: '/static/documents/Eth2 - Staking.pdf',
  },
]
