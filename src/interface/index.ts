export interface IData {
  id: number;
  iso2: string;
  name: string;
  country_id?: number;
  country_code?: string;
}

export interface IDataSingle extends IData {
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  emoji: string;
  emojiU: string;
  iso3: string;
  latitude: string;
  longitude: string;
  native: string;
  numeric_code: string;
  phonecode: string;
  region: string;
  subregion: string;
  timezones: string;
  tld: string;
  translations: string;
}
