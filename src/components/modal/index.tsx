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
import { IDataSingle } from "../../interface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: IDataSingle | null;
}

export const Modal: FC<Props> = ({ isOpen, onClose, data }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Información adicional sobre {data?.name}</ModalHeader>
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
                  {data?.name} {data?.native && `- ${data?.native}`}
                </Text>
              </Flex>
            </ListItem>

            {data?.capital && (
              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={FaCity} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Capital:
                  </Text>{" "}
                  <Text fontSize={14}>{data?.capital}</Text>
                </Flex>
              </ListItem>
            )}

            {data?.currency_symbol && (
              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={HiOutlineCurrencyDollar} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Divisa:
                  </Text>{" "}
                  <Text fontSize={14}>
                    {data?.currency_symbol} - {data?.currency} -{" "}
                    {data?.currency_name}
                  </Text>
                </Flex>
              </ListItem>
            )}

            <ListItem>
              <Flex alignItems={"center"} gap={1}>
                <ListIcon as={BiWorld} color="teal.300" />
                <Text fontWeight="bold" fontSize={14}>
                  Iso:
                </Text>{" "}
                <Text fontSize={14}>
                  {data?.iso2} {data?.iso3 && `- ${data?.iso3}`}
                </Text>
              </Flex>
            </ListItem>

            <ListItem>
              <Flex alignItems={"center"} gap={1}>
                <ListIcon as={TbWorldLatitude} color="teal.300" />
                <Text fontWeight="bold" fontSize={14}>
                  Latitud:
                </Text>{" "}
                <Text fontSize={14}>{data?.latitude}</Text>
              </Flex>
            </ListItem>

            <ListItem>
              <Flex alignItems={"center"} gap={1}>
                <ListIcon as={TbWorldLongitude} color="teal.300" />
                <Text fontWeight="bold" fontSize={14}>
                  Longitud:
                </Text>{" "}
                <Text fontSize={14}>{data?.longitude}</Text>
              </Flex>
            </ListItem>

            <ListItem>
              <Flex alignItems={"center"} gap={1}>
                <ListIcon as={MdOutlinePhone} color="teal.300" />
                <Text fontWeight="bold" fontSize={14}>
                  Código de país:
                </Text>{" "}
                <Text fontSize={14}>
                  {data?.phonecode ?? data?.country_code}
                </Text>
              </Flex>
            </ListItem>

            {data?.region && (
              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={FaMountainCity} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Region:
                  </Text>{" "}
                  <Text fontSize={14}>{data?.region}</Text>
                </Flex>
              </ListItem>
            )}

            {data?.subregion && (
              <ListItem>
                <Flex alignItems={"center"} gap={1}>
                  <ListIcon as={FaTreeCity} color="teal.300" />
                  <Text fontWeight="bold" fontSize={14}>
                    Subregion:
                  </Text>{" "}
                  <Text fontSize={14}>{data?.subregion}</Text>
                </Flex>
              </ListItem>
            )}
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
