import { Link } from "./Link"

export function OpenSourceContributions() {
    return (
        <div>
            <p>
                I absolutely love software development, especially the
                collaborative open-source kind. Some contributions:
            </p>
            <div className="mt-2 flex flex-col space-y-1.5">
                <Link className="w-fit text-[#cc6600] no-underline hover:text-[#994400] hover:underline dark:text-[#ff8800] dark:hover:text-[#ffaa00]" href="https://github.com/linuxmint/nemo">
                    <span>&#x1F4E6;</span>
                    <span className="ml-1.5">Linux Mint - Nemo</span>
                </Link>
                <Link className="w-fit text-[#cc6600] no-underline hover:text-[#994400] hover:underline dark:text-[#ff8800] dark:hover:text-[#ffaa00]" href="https://github.com/DeFiHackLabs/Unphishable">
                    <span>&#x1F4E6;</span>
                    <span className="ml-1.5">DeFiHackLabs - Unphishable</span>
                </Link>
                <Link className="w-fit text-[#cc6600] no-underline hover:text-[#994400] hover:underline dark:text-[#ff8800] dark:hover:text-[#ffaa00]" href="https://github.com/ethstaker/eth-docker-docs">
                    <span>&#x1F4E6;</span>
                    <span className="ml-1.5">EthStaker - EthDocker</span>
                </Link>
            </div>
        </div>
    )
}

