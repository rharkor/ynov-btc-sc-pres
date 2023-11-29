import { useContext } from "react";
import { SlideContext } from "../contexts/slide/SlideContext";
import { cn } from "@nextui-org/react";

export default function Slide2() {
  const { slide } = useContext(SlideContext);

  return (
    <>
      <p
        className={cn(
          "p-4 text-lg bg-content2 rounded-md max-w-[600px] flex flex-col translate-y-[100vh] transition-all duration-300 ease-in-out",
          {
            "!translate-y-0": slide === 1,
          }
        )}
      >
        Définition Un smart contract, comme tout contrat, établit les termes
        d&apos;un accord. Mais à la différence d&apos;un contrat traditionnel,
        les termes d&apos;un smart contract sont exécutés sous forme de code
        exécuté sur une blockchain telle qu&apos;Ethereum. Ils permettent aux
        développeurs de créer des applications qui tirent parti de la sécurité,
        de la fiabilité et de l&apos;accessibilité de la blockchain.
        <q className="ml-auto text-foreground-500 italic">Coinbase</q>
      </p>
    </>
  );
}
