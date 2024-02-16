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
import { getCountries, getCountry, getState, getStates } from "../api";
import { IData, IDataSingle } from "../interface";

interface CountriesContextType {
  collapse: boolean;
  setCollapse: Dispatch<boolean>;
  activeItem: number;
  setActiveItem: Dispatch<number>;
  countries: IData[];
  states: IData[];
  loading: boolean;
  fetchCountry: (iso2: string) => Promise<void>;
  country: IDataSingle | null;
  fetchState: (countryCode: string, iso2: string) => Promise<void>;
  state: IDataSingle | null;
}

const CountriesContext = createContext<CountriesContextType>(
  {} as CountriesContextType
);

// eslint-disable-next-line react-refresh/only-export-components
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
  const [countries, setCountries] = useState<IData[]>([]);
  const [states, setStates] = useState<IData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<IDataSingle | null>(null);
  const [state, setState] = useState<IDataSingle | null>(null);

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

  const fetchCountry = useCallback(async (iso2: string) => {
    try {
      setLoading(true);
      const data = await getCountry(iso2);
      setCountry(data);
    } catch (error) {
      console.error("Error fetching countries", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStates = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getStates();
      return data;
    } catch (error) {
      console.error("Error fetching countries", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchState = useCallback(async (countryCode: string, iso2: string) => {
    try {
      setLoading(true);
      const data = await getState(countryCode, iso2);
      setState(data);
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

    fetchStates().then((data) => {
      setStates(data);
    });
  }, [fetchCountries, fetchStates]);

  const value = useMemo(() => {
    return {
      collapse,
      setCollapse,
      activeItem,
      setActiveItem,
      countries,
      loading,
      fetchCountry,
      country,
      states,
      fetchState,
      state,
    };
  }, [
    collapse,
    activeItem,
    countries,
    loading,
    fetchCountry,
    country,
    states,
    fetchState,
    state,
  ]);

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
};
