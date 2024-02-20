import { Cell } from "@tanstack/react-table";
import { IData } from "../../interface";
import { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { Td } from "@chakra-ui/react";

export const DragAlongCell = ({ cell }: { cell: Cell<IData, unknown> }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Td style={style} ref={setNodeRef} padding={2} textAlign={"center"}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Td>
  );
};
