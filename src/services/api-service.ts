import type { ApiResponseAllCountries, ApiResponseCountryInfo } from "@/types/api.ts";
import $api from "../http";

class ApiService {
  async getAllCountries(): Promise<ApiResponseAllCountries> {
    return $api.get("all?fields=name,flags,region,capital,population");
  }

  async getCountryInfo(officialForApi: string): Promise<ApiResponseCountryInfo> {
    return $api.get(`name/${officialForApi}?fullText=true`);
  }

  async getBorderCountriesNames(borders: string) {
    return $api.get(`alpha?codes=${borders}`);
  }
}

export default new ApiService();
