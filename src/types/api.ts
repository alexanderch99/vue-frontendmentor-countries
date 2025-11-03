interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Country {
  capital: string[];
  flags: Flags;
  name: {
    common: string;
    official: string;
    nativeName: {
      [langCode: string]: {
        common: string;
        official: string;
      };
    };
  };
  population: number;
  region: string;
}

interface ApiResponse {
  config: object;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface Currency {
  symbol: string;
  name: string;
}

export interface Currencies {
  [currency: string]: Currency;
}

export interface Languages {
  [lang: string]: string;
}

export interface CountryInfo extends Country {
  altSpellings: string[];
  area: number;
  borders?: string[];
  capitalInfo: {
    latlng: number[];
  };
  car: {
    side: string;
    signs: string[];
  };
  cca2: string;
  cca3: string;
  ccn3: string;
  coatOfArms: unknown;
  continents: string[];
  currencies: Currencies;
  demonyms: {
    [lang: string]: { f: string; m: string };
  };
  flag: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  independent: boolean;
  landlocked: boolean;
  languages: Languages;
  latlng: number[];
  maps: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  postalCode: {
    format: string | null;
    regex: string | null;
  };
  subregion?: string;
  startOfWeek: string;
  status: string;
  timezones: string[];
  tld: string[];
  translations: {
    [lang: string]: {
      official: string;
      common: string;
    };
  };
  unMember: boolean;
}

export interface ApiResponseAllCountries extends ApiResponse {
  data: Country[];
}

export interface ApiResponseCountryInfo extends ApiResponse {
  data: CountryInfo[];
}
