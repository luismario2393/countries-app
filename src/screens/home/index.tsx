import {
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Layout } from "../../components";
import { useCountries } from "../../context";
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
import { useMemo, useState } from "react";
import { ICountries } from "../../interface";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { FaCity, FaMountainCity, FaTreeCity } from "react-icons/fa6";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { TbWorldLatitude, TbWorldLongitude, TbWorld } from "react-icons/tb";
import { MdOutlinePhone } from "react-icons/md";

const Home = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { countries, loading, fetchCountry, country } = useCountries();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo<ColumnDef<ICountries>[]>(
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
              <span>Nombre de países</span>
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
              onClick={() =>
                fetchCountry(info.row.original.iso2).finally(onOpen)
              }
            />
          </Tooltip>
        ),
        footer: (props) => props.column.id,
      },
    ],
    [fetchCountry, onOpen]
  );

  const table = useReactTable({
    data: countries,
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
    <Layout>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <TableContainer
          overflowY={table.getRowModel().rows.length > 10 ? "scroll" : "hidden"}
          w={"80%"}
        >
          <Table size="lg">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      isNumeric={header.id === "Id" ? true : false}
                      key={header.id}
                      textAlign={"center"}
                      onClick={header.column.getToggleSortingHandler()}
                    >
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
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} padding={3} textAlign={"center"}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Grid templateColumns="repeat(3, 1fr)" gap={2} marginTop={3}>
            <GridItem w="100%">
              <Flex gap={2}>
                {table.getCanPreviousPage() && (
                  <>
                    <IconButton
                      aria-label="previous all page"
                      icon={<ArrowLeftIcon />}
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    />
                    <IconButton
                      aria-label="previous page"
                      icon={<ChevronLeftIcon />}
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    />
                  </>
                )}

                {table.getCanNextPage() && (
                  <>
                    <IconButton
                      aria-label="next page"
                      icon={<ChevronRightIcon />}
                      onClick={() => table.nextPage()}
                    />
                    <IconButton
                      aria-label="next all page"
                      icon={<ArrowRightIcon />}
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                    />
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
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Select>
            </GridItem>
          </Grid>
        </TableContainer>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información adicional sobre {country?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={TbWorld} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Nombre:
                  </Text>{" "}
                  <Text fontSize={14}>
                    {country?.name} - {country?.native}
                  </Text>
                </Flex>
              </ListItem>

              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={FaCity} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Capital:
                  </Text>{" "}
                  <Text fontSize={14}>{country?.capital}</Text>
                </Flex>
              </ListItem>

              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={HiOutlineCurrencyDollar} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Divisa:
                  </Text>{" "}
                  <Text fontSize={14}>
                    {country?.currency_symbol} - {country?.currency} -{" "}
                    {country?.currency_name}
                  </Text>
                </Flex>
              </ListItem>

              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={BiWorld} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Iso:
                  </Text>{" "}
                  <Text fontSize={14}>
                    {country?.iso2} - {country?.iso3}
                  </Text>
                </Flex>
              </ListItem>

              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={TbWorldLatitude} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Latitud:
                  </Text>{" "}
                  <Text fontSize={14}>{country?.latitude}</Text>
                </Flex>
              </ListItem>

              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={TbWorldLongitude} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Longitud:
                  </Text>{" "}
                  <Text fontSize={14}>{country?.longitude}</Text>
                </Flex>
              </ListItem>

              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={MdOutlinePhone} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Código de país:
                  </Text>{" "}
                  <Text fontSize={14}>{country?.phonecode}</Text>
                </Flex>
              </ListItem>

              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={FaMountainCity} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Region:
                  </Text>{" "}
                  <Text fontSize={14}>{country?.region}</Text>
                </Flex>
              </ListItem>

              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={FaTreeCity} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Subregion:
                  </Text>{" "}
                  <Text fontSize={14}>{country?.subregion}</Text>
                </Flex>
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default Home;
