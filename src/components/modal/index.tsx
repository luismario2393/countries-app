import {
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { FaCity, FaMountainCity, FaTreeCity } from "react-icons/fa6";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { TbWorldLatitude, TbWorldLongitude, TbWorld } from "react-icons/tb";
import { MdOutlinePhone } from "react-icons/md";
import { FC } from "react";
import { ICountry } from "../../interface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  country: ICountry | null;
}

export const Modal: FC<Props> = ({ isOpen, onClose, country }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
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
    </ChakraModal>
  );
};
