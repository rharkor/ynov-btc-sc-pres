import { Link } from "@nextui-org/react";

export default function Standard() {
  return (
    <>
      <h3 className="text-2xl lg:text-4xl text-center">
        Pourquoi et comment un token est un token ?
      </h3>
      <Link href="https://etherscan.io/tokens" target="_blank">
        Tokens
      </Link>
      <Link href="https://eips.ethereum.org/EIPS/eip-20" target="_blank">
        Standard
      </Link>
      <Link href="https://docs.openzeppelin.com/contracts" target="_blank">
        Open Zeppelin
      </Link>
    </>
  );
}
