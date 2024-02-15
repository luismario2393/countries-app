import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  Dispatch,
} from "react";

interface CountriesContextType {
  collapse: boolean;
  setCollapse: Dispatch<React.SetStateAction<boolean>>;
  activeItem: number;
  setActiveItem: Dispatch<React.SetStateAction<number>>;
}

const CountriesContext = createContext<CountriesContextType>(
  {} as CountriesContextType
);

export const useCountries = () => {
  const context = useContext(CountriesContext);

  return context;
};

interface CountriesProviderProps {
  children: ReactNode;
}

export const CountriesProvider: FC<CountriesProviderProps> = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <CountriesContext.Provider
      value={{ collapse, setCollapse, activeItem, setActiveItem }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
