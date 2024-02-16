import {
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Select,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  UnorderedList,
  Button,
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
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoIcon,
} from "@chakra-ui/icons";

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

  const paginationOptions = useMemo(() => [10, 20, 30, 40, 50], []);

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
        <Grid templateColumns="repeat(3, 1fr)" gap={2} marginTop={3}>
          <GridItem w="100%">
            <Flex gap={2}>
              {table.getCanPreviousPage() && (
                <>
                  <Tooltip label={`Ir a la primera página`}>
                    <IconButton
                      aria-label="previous all page"
                      icon={<ArrowLeftIcon />}
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    />
                  </Tooltip>
                  <Tooltip label={`Ir a la  página anterior`}>
                    <IconButton
                      aria-label="previous page"
                      icon={<ChevronLeftIcon />}
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    />
                  </Tooltip>
                </>
              )}

              {table.getCanNextPage() && (
                <>
                  <Tooltip label={`Ir a la siguiente página`}>
                    <IconButton
                      aria-label="next page"
                      icon={<ChevronRightIcon />}
                      onClick={() => table.nextPage()}
                    />
                  </Tooltip>
                  <Tooltip label={`Ir a la página final`}>
                    <IconButton
                      aria-label="next all page"
                      icon={<ArrowRightIcon />}
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                    />
                  </Tooltip>
                </>
              )}
            </Flex>
          </GridItem>
          <GridItem w="100%">
            <Text fontSize={14}>Page</Text>

            <Text fontWeight="bold" fontSize={14}>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </Text>
          </GridItem>
          <GridItem w="100%">
            <Select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {paginationOptions.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </GridItem>
        </Grid>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Instrucciones de uso</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UnorderedList>
                <ListItem>
                  En la primera fila al hacer click en la palabra en negrita se
                  reordena la lista en manera ascendente y descendente{" "}
                </ListItem>
                <ListItem>
                  Al presionar los botones en la columna detalles sale
                  información adicional del país o el estado por medio de un
                  modal
                </ListItem>
                <ListItem>
                  En la parte inferior izquierda se encuentran los botos de
                  pasar de página, de una en una o pasar al final o al principio
                </ListItem>
                <ListItem>
                  En la parte inferior derecha se encuentra la cantidad de
                  resultados que se quiere mostrar por página{" "}
                </ListItem>
              </UnorderedList>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </TableContainer>
    </>
  );
};
