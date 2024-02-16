import {
  Box,
  Flex,
  IconButton,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { FC, useMemo, useState } from "react";
import { IData } from "../../interface";
import { InfoIcon } from "@chakra-ui/icons";
import { ModalInstruction } from "../modal/modal-instruction";
import { Pagination } from "./pagination";

interface Props {
  data: IData[];
  onOpen: () => void;
  fetchCountry?: (iso2: string) => Promise<void>;
  fetchState?: (countryCode: string, iso2: string) => Promise<void>;
}

export const Table: FC<Props> = ({
  data,
  onOpen,
  fetchCountry,
  fetchState,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { isOpen, onOpen: useOnOpen, onClose } = useDisclosure();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => {
          return (
            <Tooltip label="Click para reordenar">
              <span>Id</span>
            </Tooltip>
          );
        },
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "name",
        header: () => {
          return (
            <Tooltip label="Click para reordenar">
              <span>
                {fetchCountry ? "Nombre de países" : "Nombre de estados"}
              </span>
            </Tooltip>
          );
        },
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "iso2",
        header: () => {
          return (
            <Tooltip label="Click para reordenar">
              <span>Indicativo</span>
            </Tooltip>
          );
        },
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "details",
        header: () => <span>Detalle</span>,
        cell: (info) => (
          <Tooltip label={`Información adicional de ${info.row.original.name}`}>
            <IconButton
              aria-label="vew details"
              icon={<InfoIcon />}
              onClick={() => {
                fetchCountry &&
                  fetchCountry(info.row.original.iso2).finally(onOpen);

                fetchState &&
                  fetchState(
                    info.row.original.country_code ?? "",
                    info.row.original.iso2
                  ).finally(onOpen);
              }}
            />
          </Tooltip>
        ),
        footer: (props) => props.column.id,
      },
    ],
    [fetchCountry, onOpen, fetchState]
  );

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    debugTable: true,
  });

  return (
    <>
      {table.getHeaderGroups().map((headerGroup) =>
        headerGroup.headers.map((header) =>
          header.column.getCanFilter() && header.id === "name" ? (
            <Flex gap={4}>
              <Tooltip label={`Instrucciones de uso`}>
                <IconButton
                  aria-label="instructions"
                  icon={<InfoIcon />}
                  onClick={useOnOpen}
                />
              </Tooltip>
              <Input
                key={`${header.id} - ${header.column.id}`}
                type="text"
                value={(header.column.getFilterValue() ?? "") as string}
                onChange={(e) => header.column.setFilterValue(e.target.value)}
                placeholder={`${
                  fetchCountry
                    ? "Busca el país por su nombre"
                    : "Busca el estado por su nombre"
                }`}
              />
            </Flex>
          ) : null
        )
      )}
      <TableContainer
        overflowY={table.getRowModel().rows.length > 10 ? "scroll" : "hidden"}
        w={"80%"}
      >
        <ChakraTable size="lg">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    isNumeric={header.id === "Id" ? true : false}
                    key={header.id}
                    textAlign={"center"}
                  >
                    <Flex
                      flexDirection={"column"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Box onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {
                          {
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted().valueOf().toString()]
                        }
                      </Box>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} padding={2} textAlign={"center"}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
        <Pagination table={table} />

        <ModalInstruction isOpen={isOpen} onClose={onClose} />
      </TableContainer>
    </>
  );
};
