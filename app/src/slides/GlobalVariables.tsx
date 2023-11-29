import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  cn,
} from "@nextui-org/react";

const globalVariables = [
  {
    name: "blockhash(uint blockNumber) returns (bytes32)",
    description:
      "hash of the given block - only works for 256 most recent blocks excluding current",
  },
  {
    name: "block.basefee (uint)",
    description: "current block's base fee (EIP-3198 and EIP-1559)",
  },
  {
    name: "block.chainid (uint)",
    description: "current chain id",
  },
  {
    name: "block.coinbase (address payable)",
    description: "current block miner's address",
  },
  {
    name: "block.difficulty (uint)",
    description:
      "current block difficulty (EVM < Paris). For other EVM versions it behaves as a deprecated alias for block.prevrandao that will be removed in the next breaking release",
  },
  {
    name: "block.gaslimit (uint)",
    description: "current block gaslimit",
  },
  {
    name: "block.number (uint)",
    description: "current block number",
  },
  {
    name: "block.prevrandao (uint)",
    description:
      "random number provided by the beacon chain (EVM >= Paris) (see EIP-4399 )",
  },
  {
    name: "block.timestamp (uint)",
    description: "current block timestamp in seconds since Unix epoch",
  },
  {
    name: "gasleft() returns (uint256)",
    description: "remaining gas",
  },
  {
    name: "msg.data (bytes)",
    description: "complete calldata",
  },
  {
    name: "msg.sender (address)",
    description: "sender of the message (current call)",
    isPrimary: true,
  },
  {
    name: "msg.sig (bytes4)",
    description: "first four bytes of the calldata (i.e. function identifier)",
  },
  {
    name: "msg.value (uint)",
    description: "number of wei sent with the message",
    isPrimary: true,
  },
  {
    name: "tx.gasprice (uint)",
    description: "gas price of the transaction",
  },
  {
    name: "tx.origin (address)",
    description: "sender of the transaction (full call chain)",
  },
];

export default function GlobalVariables() {
  return (
    <div className="flex justify-center items-center overflow-auto py-32">
      <Table aria-label="Global variables" className="h-full" isStriped>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Returns</TableColumn>
        </TableHeader>
        <TableBody>
          {globalVariables.map((variable) => (
            <TableRow key={variable.name}>
              <TableCell
                className={cn({
                  "text-primary": variable.isPrimary,
                })}
              >
                {variable.name}
              </TableCell>
              <TableCell>{variable.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
