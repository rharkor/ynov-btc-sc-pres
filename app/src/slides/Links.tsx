import { Link } from "@nextui-org/react";

export default function Links() {
  return (
    <>
      <h3 className="text-2xl lg:text-4xl text-center">Liens utiles</h3>
      <ul className="text-lg flex flex-col items-center">
        <li>
          Doc Solidity:{" "}
          <Link href="https://docs.soliditylang.org/" target="_blank">
            https://docs.soliditylang.org/
          </Link>
        </li>
        <li>
          Open Zeppelin:{" "}
          <Link href="https://docs.openzeppelin.com/contracts/" target="_blank">
            https://docs.openzeppelin.com/contracts/
          </Link>
        </li>
        <li>
          Remix:{" "}
          <Link href="https://remix.ethereum.org/" target="_blank">
            https://remix.ethereum.org/
          </Link>
        </li>
        <li>
          Etherscan:{" "}
          <Link href="https://etherscan.io/" target="_blank">
            https://etherscan.io/
          </Link>
        </li>
        <li>
          EIP:{" "}
          <Link href="https://eips.ethereum.org/" target="_blank">
            https://eips.ethereum.org/
          </Link>
        </li>
        <li>
          Hardhat:{" "}
          <Link href="https://hardhat.org/" target="_blank">
            https://hardhat.org/
          </Link>
        </li>
      </ul>
    </>
  );
}
