import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  cn,
} from "@nextui-org/react";

const units = [
  {
    name: "wei",
    description: "1 wei",
    isPrimary: true,
  },
  {
    name: "kwei",
    description: "10^3 wei",
  },
  {
    name: "mwei",
    description: "10^6 wei",
  },
  {
    name: "gwei",
    description: "10^9 wei",
  },
  {
    name: "szabo",
    description: "10^12 wei",
  },
  {
    name: "finney",
    description: "10^15 wei",
  },
  {
    name: "ether",
    description: "10^18 wei",
    isPrimary: true,
  },
  {
    name: "kether",
    description: "10^21 wei",
  },
  {
    name: "mether",
    description: "10^24 wei",
  },
  {
    name: "gether",
    description: "10^27 wei",
  },
  {
    name: "tether",
    description: "10^30 wei",
  },
];

export default function Units() {
  return (
    <div className="flex justify-center items-center overflow-auto py-32 min-w-[400px]">
      <Table aria-label="Units" className="h-full" isStriped>
        <TableHeader>
          <TableColumn className="text-lg font-bold">Name</TableColumn>
          <TableColumn className="text-lg font-bold">Returns</TableColumn>
        </TableHeader>
        <TableBody>
          {units.map((unit) => (
            <TableRow key={unit.name}>
              <TableCell
                className={cn(
                  {
                    "text-primary font-semibold": unit.isPrimary,
                  },
                  "text-lg"
                )}
              >
                {unit.name}
              </TableCell>
              <TableCell className="text-lg">{unit.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
