import {
  Flex,
  Grid,
  GridItem,
  IconButton,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Layout } from "../../components";
import { useCountries } from "../../context";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  PaginationState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ICountries } from "../../interface";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const Home = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { countries, loading } = useCountries();

  const columns = useMemo<ColumnDef<ICountries>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <span>Ids</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "name",
        header: () => <span>Nombre de países</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "iso2",
        header: () => <span>Indicativo</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    data: countries,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        isNumeric={header.id === "Id" ? true : false}
                        key={header.id}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
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
    </Layout>
  );
};

export default Home;
