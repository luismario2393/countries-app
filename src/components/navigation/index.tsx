import { List, ListItem } from "@chakra-ui/react";
import { TbWorld } from "react-icons/tb";
import { GiModernCity } from "react-icons/gi";
import { NavItem } from "./navitems";
import { useCountries } from "../../context";

const items = [
  {
    type: "link",
    label: "Countries",
    icon: TbWorld,
    path: "/",
  },
  {
    type: "link",
    label: "States",
    icon: GiModernCity,
    path: "/states",
  },
];

export const Navigation = () => {
  const { collapse, activeItem, setActiveItem } = useCountries();

  return (
    <List w="full" my={8}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <NavItem
            item={item}
            isActive={activeItem === index}
            setActiveItem={setActiveItem}
            index={index}
            collapse={collapse}
          />
        </ListItem>
      ))}
    </List>
  );
};
