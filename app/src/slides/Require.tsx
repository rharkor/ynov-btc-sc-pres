import { Chip, cn } from "@nextui-org/react";
import CodeBlock from "../components/CodeBlock";
import { Info } from "lucide-react";

export default function Require() {
  return (
    <div className="flex flex-col w-full h-full py-14 lg:px-14 gap-8 overflow-auto">
      <div className={cn("flex flex-col gap-2 transition-all mt-32")}>
        <div className="text-2xl mb-12 flex gap-3">
          <Chip color="primary" startContent={<Info className="w-4 h-4" />}>
            info
          </Chip>
          Une transaction ne peux s'effectuer que partiellement. Si une erreur
          se produit, la transaction est annulée.
        </div>
        <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
          Revert
        </div>
        <CodeBlock
          code={`function sendMin1Ether(address payable _to) public payable {
    if (msg.value < 1 ether) {
        revert("Minimum 1 ether");
    }
    _to.transfer(msg.value);
}`}
          className="text-2xl"
        />
      </div>
      <div className={cn("flex flex-col gap-2 transition-all")}>
        <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
          Require
        </div>
        <CodeBlock
          code={`function sendMin1Ether(address payable _to) public payable {
    require(msg.value >= 1 ether, "Minimum 1 ether");
    _to.transfer(msg.value);
}`}
          className="text-2xl"
        />
      </div>
    </div>
  );
}
