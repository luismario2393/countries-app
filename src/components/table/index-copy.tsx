import React, { FC, useMemo, useState } from "react";

import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  Flex,
  IconButton,
  Input,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { DraggableTableHeader } from "./dragable-header";
import { DragAlongCell } from "./drag-along-cell";
import { Pagination } from "./pagination";
import { ModalInstruction } from "../modal/modal-instruction";
import { IData } from "../../interface";

interface TableProps {
  data: IData[];
  onOpen: () => void;
  fetchCountry?: (iso2: string) => Promise<void>;
  fetchState?: (countryCode: string, iso2: string) => Promise<void>;
}

export const TableCopy: FC<TableProps> = ({
  data,
  onOpen,
  fetchCountry,
  fetchState,
}) => {
  const columns = React.useMemo<ColumnDef<IData>[]>(
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
        id: "id",
      },
      {
        accessorFn: (row) => row.name,
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
        id: "name",
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
        id: "iso2",
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
        id: "details",
      },
    ],
    [fetchCountry, fetchState, onOpen]
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!)
  );
  const [sorting, setSorting] = useState<SortingState>([]);

  const { isOpen, onOpen: useOnOpen, onClose } = useDisclosure();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
      sorting,
      pagination,
    },
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const tableMemo = useMemo(() => table, [table]);

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {tableMemo.getHeaderGroups().map((headerGroup) =>
        headerGroup.headers.map((header) =>
          header.column.getCanFilter() && header.id === "name" ? (
            <Flex
              gap={4}
              key={`${header.id} - ${header.column.id}`}
              marginBottom={4}
            >
              <Tooltip label={`Instrucciones de uso`}>
                <IconButton
                  aria-label="instructions"
                  icon={<InfoIcon />}
                  onClick={useOnOpen}
                />
              </Tooltip>
              <Input
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
        overflowY={"scroll"}
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <ChakraTable
          size="lg"
          variant="striped"
          {...{
            style: {
              width: tableMemo.getCenterTotalSize(),
            },
          }}
        >
          <Thead>
            {tableMemo.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map((header) => (
                    <DraggableTableHeader
                      key={header.id}
                      header={header}
                      table={tableMemo}
                    />
                  ))}
                </SortableContext>
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {tableMemo.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    <DragAlongCell key={cell.id} cell={cell} />
                  </SortableContext>
                ))}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
        <Pagination table={tableMemo} />

        <ModalInstruction isOpen={isOpen} onClose={onClose} />
      </TableContainer>
    </DndContext>
  );
};
