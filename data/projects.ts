export interface Project {
  type: "work" | "hobby";
  title: string;
  description?: string;
  imgSrc: string;
  url?: string;
  repo?: string;
  builtWith?: string[];
}

export const projectsData: Project[] = [
  {
    type: "work",
    title: "Firinne Capital",
    description: `Firinne Capital is a digital assets hedge fund where I used to work as a co-founder and head of research.
    
    We wanted something simple and fast, with the ability to update for non-technical people on the team.`,
    imgSrc: "/static/images/fc_logo.png",
    url: "https://www.firinnecapital.com/?ref=kaveh.page",
    builtWith: ["Squarespace"],
  },
  {
    type: "work",
    title: "Personal Blog",
    description: `The blog you are reading right now!`,
    imgSrc: "/static/images/kaveh.page.png",
    url: "https://kaveh.page",
    repo: "kaveh.page",
    builtWith: ["TypeScript", "Next.js", "Tailwind CSS", "Umami"],
  },
  {
    type: "work",
    title: "Ethereum Staking",
    description: `Consulting project in anticipation of Ethereum's transition to proof of stake in late 2021. Commissioned in May 2021 as part of a hedge fund pitch in offering staking as a service.`,
    imgSrc: "/static/images/ethereum.png",
    url: "https://github.com/kavehtehrani/kaveh.page/blob/master/public/static/documents/Eth2%20-%20Staking.pdf",
  },
  {
    type: "work",
    title: "CLI - Internet Speed Test",
    description: `A CLI tool that displays network speed test results from Cloudflare's speed test service in a TUI interface.`,
    imgSrc: "/static/images/2025-12-cloudflare-speed-cli.png",
    url: "https://github.com/kavehtehrani/cloudflare-speed-cli",
  },
  {
    type: "work",
    title: "Protein Math",
    description: `Comparison shopping tool to rank protein powders by price per gram and macro ratios.`,
    imgSrc: "/static/images/proteinmath.png",
    url: "https://www.proteinmath.app/",
  },
  {
    type: "hobby",
    title: "GNOME Speech2Text",
    description: `GNOME Extension to convert speech to text in several languages using OpenAI's automated speech recognition Whisper`,
    imgSrc: "/static/images/2025-06-recording-modal.png",
    url: "https://github.com/kavehtehrani/gnome-speech2text",
    repo: "gnome-speech2text",
    builtWith: ["JavaScript", "Python"],
  },
  {
    type: "hobby",
    title: "World Flag Quiz",
    description: `Test your knowledge of world flags!`,
    imgSrc: "/static/images/danesh-app.png",
    url: "https://danesh-app.vercel.app/worldflags",
    repo: "",
    builtWith: ["TypeScript", "Next.js"],
  },
  {
    type: "hobby",
    title: "YouTube Video Controls",
    description: `Rotate, Zoom, and Pan controls for YouTube videos.`,
    imgSrc: "/static/images/youtube-video-controls.png",
    url: "https://chromewebstore.google.com/detail/youtube-video-controls/cddjdndjpiepihbknbjkjghijabbikmh",
    repo: "youtube-video-controls",
    builtWith: ["JavaScript"],
  },
  {
    type: "hobby",
    title: "Hacker News - Saved You A Click!",
    description: `A learning project in developing browser extensions.
    
    On Hacker News pages it adds a link to open both the article link and comments page, saving a click. Tabs open by default in the background but this can be toggled.`,
    imgSrc: "/static/images/hnsavedyouaclick.png",
    url: "https://chrome.google.com/webstore/detail/hacker-news-saved-you-a-c/ckjnampgbgchgbpmllianpgdgaemdijk",
    repo: "hackernews-savedyouaclick",
    builtWith: ["JavaScript"],
  },
  {
    type: "hobby",
    title: "One-Click Image Saver",
    description: "Save any image in your browser with one click via shortcut or contextual menu.",
    imgSrc: "/static/images/one_click_image_saver_context_menu.png",
    url: "https://chromewebstore.google.com/detail/one-click-image-saver/ajpjioafnelcifjpgeekhbcjpphhfmgg",
    repo: "new_tab_url",
    builtWith: ["JavaScript"],
  },
  {
    type: "hobby",
    title: "New Tab URL",
    description: "Customize default URL for new tabs in Chrome.",
    imgSrc: "/static/images/new_tab_url_screenshot.png",
    url: "https://chromewebstore.google.com/detail/new-tab-url/hbdaejckmapgepjalpmllggildmbgdhl",
    repo: "one_click_image_save",
    builtWith: ["JavaScript"],
  },
  {
    type: "hobby",
    title: "Send to archive.today",
    description: "Convenience extension to send pages to archive.today.",
    imgSrc: "/static/images/archive_today_context_menu.png",
    url: "https://chromewebstore.google.com/detail/send-to-archiveis/jjakjpmanihepppmececomchibehkjgi",
    repo: "archive.today.extension",
    builtWith: ["JavaScript"],
  },
];

