import { Link } from "@nextui-org/react";

export default function Example() {
  return (
    <>
      <h3 className="text-2xl lg:text-4xl text-center">
        Un contrat de holding (Banque)
      </h3>
      <ul className="list-disc list-inside text-xl lg:text-2xl mt-4">
        <li>Pouvoir déposer des fonds</li>
        <li>Pouvoir retirer des fonds</li>
        <li>Pouvoir consulter les soldes</li>
      </ul>
      <Link
        href="https://remix.ethereum.org/"
        target="_blank"
        className="mt-12"
      >
        Remix
      </Link>
    </>
  );
}
