export interface Donate {
  title: string;
  description: string;
  imgSrc: string;
  url?: string;
}

export const donateData: Donate[] = [
  {
    title: "Bitcoin",
    description: `bc1quude6cv8dr78g2ad0k25tr5mzy3cdkcuyhcryf`,
    imgSrc: "/static/images/address_btc.svg",
  },
  {
    title: "Ethereum",
    description: `0x635D7AC28Ec45432324D9410cfd5716126FaC4a5`,
    imgSrc: "/static/images/address_eth.svg",
  },
  {
    title: "Polkadot",
    description: `5F97YfcQz9WQPvHGcUv5B5CTWVSrxCcHYXPDajjU1ZPJQ55W`,
    imgSrc: "/static/images/address_dot.svg",
  },
  {
    title: "Buy Me A Coffee ☕",
    description: ``,
    imgSrc: "/static/images/bmc_qr.png",
    url: "https://buymeacoffee.com/kavehtehrani",
  },
];

