import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalInstruction: FC<Props> = ({ isOpen, onClose }) => {
  return (
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
              Al presionar los botones en la columna detalles sale información
              adicional del país o el estado por medio de un modal
            </ListItem>
            <ListItem>
              En la parte inferior izquierda se encuentran los botos de pasar de
              página, de una en una o pasar al final o al principio
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
  );
};
