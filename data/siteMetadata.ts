export let siteMetadata = {
  title: "Kaveh's Blog",
  author: 'Kaveh',
  fullName: 'Kaveh Tehrani',
  headerTitle: "Kaveh's Blog",
  footerTitle: "Kaveh's Blog",
  description: "Kaveh Tehrani's Blog - leaving tradfi and diving fully into web3",
  language: 'en-us',
  siteUrl: 'https://kaveh.page/',
  shortUrl: 'kaveh.page',
  siteRepo: 'https://github.com/kavehtehrani/kaveh.page',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/logo.png',
  socialBanner: '/static/images/logo.png',
  email: '',
  github: 'https://github.com/kavehtehrani',
  mastodon: 'https://mastodon.social/@ktehrani/',
  twitter: 'https://twitter.com/kavehtehrani',
  linkedin: 'https://linkedin.com/in/kavehtehrani/',
  instagram: 'https://instagram.com/_kaveh/',
  medium: 'https://kavehtehrani.medium.com/',
  nomadlist: 'https://nomadlist.com/@kwar13',
  buttondown: 'kaveh',
  locale: 'en-US',
  analyticsURL: '',
  analytics: {
    plausibleDataDomain: 'kaveh.page',
    simpleAnalytics: false, // true or false
    umamiWebsiteId: 'f0842203-1bc2-4484-bb5c-1722a8e47ff5',
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
  socialAccounts: {
    github: 'kavehtehrani',
    twitter: 'kavehtehrani',
    linkedin: 'kavehtehrani',
  },
}

/**
 * Select a provider and use the environment variables associated to it
 * https://vercel.com/docs/environment-variables
 * --
 *
 * Visit each provider's documentation link and follow the instructions, then add the environment variable to your project.
 */
export let commentConfig = {
  provider: 'giscus', // 'giscus' | 'utterances' | 'disqus',
  // https://giscus.app/
  giscusConfig: {
    repo: '', // process.env.GISCUS_REPO
    repositoryId: '', // process.env.GISCUS_REPOSITORY_ID
    category: '', // process.env.GISCUS_CATEGORY
    categoryId: '', // process.env.GISCUS_CATEGORY_ID
    mapping: 'title',
    reactions: '1',
    metadata: '0',
    lightTheme: 'light',
    darkTheme: 'transparent_dark',
    themeURL: '',
  },
  // https://utteranc.es/
  utterancesConfig: {
    repo: '', // process.env.UTTERANCES_REPO
    issueTerm: '',
    label: '',
    lightTheme: '',
    darkTheme: '',
  },
  // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
  disqus: {
    shortname: '', // process.env.DISQUS_SHORTNAME
  },
}
