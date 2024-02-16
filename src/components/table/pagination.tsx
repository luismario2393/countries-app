import {
  Flex,
  Grid,
  GridItem,
  IconButton,
  Select,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { IData } from "../../interface";
import { Table } from "@tanstack/react-table";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

interface Props {
  table: Table<IData>;
}

export const Pagination: FC<Props> = ({ table }) => {
  const paginationOptions = useMemo(() => [10, 20, 30, 40, 50], []);
  return (
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
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                />
              </Tooltip>
            </>
          )}
        </Flex>
      </GridItem>
      <GridItem w="100%">
        <Text fontSize={14}>Page</Text>

        <Text fontWeight="bold" fontSize={14}>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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
  );
};
