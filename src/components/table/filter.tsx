import { Column, Table } from "@tanstack/react-table";
import { IData } from "../../interface";
import { Input } from "@chakra-ui/react";

export const Filter = ({
  column,
  table,
}: {
  column: Column<IData, unknown>;
  table: Table<IData>;
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Buscar...`}
      />
    </div>
  ) : (
    <Input
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Buscar...`}
    />
  );
};
