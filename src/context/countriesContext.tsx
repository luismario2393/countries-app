import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useMemo,
  useCallback,
  Dispatch,
  useEffect,
} from "react";
import { getCountries } from "../api";
import { ICountries } from "../interface";

interface CountriesContextType {
  collapse: boolean;
  setCollapse: Dispatch<boolean>;
  activeItem: number;
  setActiveItem: Dispatch<number>;
  countries: ICountries[];
  loading: boolean;
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
  const [collapse, setCollapse] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [countries, setCountries] = useState<ICountries[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCountries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCountries();
      return data;
    } catch (error) {
      console.error("Error fetching countries", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
    });
  }, [fetchCountries]);

  const value = useMemo(() => {
    return {
      collapse,
      setCollapse,
      activeItem,
      setActiveItem,
      countries,
      loading,
    };
  }, [collapse, activeItem, countries, loading]);

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
};
