import { Header, Table, flexRender } from "@tanstack/react-table";
import { IData } from "../../interface";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties, FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Box, Flex, IconButton, Th, Tooltip } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { Filter } from "./filter";

interface Props {
  header: Header<IData, unknown>;
  table: Table<IData>;
}

export const DraggableTableHeader: FC<Props> = ({ header, table }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  const showFiltersAndOrders = header.column.id !== "details";

  return (
    <Th
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={style}
      isNumeric={header.id === "Id" ? true : false}
      key={header.id}
      textAlign={"center"}
    >
      <Flex alignItems={"center"} gap={2}>
        <Box
          cursor={"pointer"}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}

          {showFiltersAndOrders &&
            {
              asc: " 🔼",
              desc: " 🔽",
              false: " 🔼🔽",
            }[header.column.getIsSorted().valueOf().toString()]}
        </Box>
        <Box
          onDoubleClick={() => header.column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onAbort={header.getResizeHandler()}
          className={`resizer ${table.options.columnResizeDirection} ${
            header.column.getIsResizing() ? "isResizing" : ""
          }`}
        />
        <Tooltip
          label="Reordena las columnas arrastrando"
          aria-label="Drag to reorder"
        >
          <IconButton
            aria-label="drag"
            variant={"ghost"}
            colorScheme="teal"
            {...attributes}
            {...listeners}
            icon={<DragHandleIcon />}
          />
        </Tooltip>
      </Flex>
      {header.column.getCanFilter() && showFiltersAndOrders ? (
        <Box>
          <Filter column={header.column} table={table} />
        </Box>
      ) : null}
    </Th>
  );
};
