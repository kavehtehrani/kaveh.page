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
    title: 'Ethereum Staking',
    description: `Consulting project in anticipation of Ethereum's transition to proof of stake in late 2021. Commissioned in May 2021 as part of a hedge fund pitch in offering staking as a service.`,
    imgSrc: '/static/images/ethereum.png',
    url: 'https://github.com/kavehtehrani/kaveh.page/blob/master/public/static/documents/Eth2%20-%20Staking.pdf',
  },
  {
    type: 'work',
    title: 'Hacker News - Saved You A Click!',
    description: `A learning project in developing browser extensions.
    
    On Hacker News pages it adds a link to open both the article link and comments page, saving a click. Tabs open by default in the background but this can be toggled.`,
    imgSrc: '/static/images/hnsavedyouaclick.png',
    url: 'https://chrome.google.com/webstore/detail/hacker-news-saved-you-a-c/ckjnampgbgchgbpmllianpgdgaemdijk',
    repo: 'hackernews-savedyouaclick',
    builtWith: ['JavaScript'],
  },
  {
    type: 'work',
    title: 'One-Click Image Saver',
    description: `A learning project in developing browser extensions.
    
    Save any image in your browser with one click via shortcut or contextual menu.`,
    imgSrc: '/static/images/one_click_image_saver_context_menu.png',
    url: 'https://chromewebstore.google.com/detail/one-click-image-saver/ajpjioafnelcifjpgeekhbcjpphhfmgg',
    repo: 'one_click_image_save',
    builtWith: ['JavaScript'],
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
]
