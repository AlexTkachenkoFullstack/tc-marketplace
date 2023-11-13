import { ISearchParams } from "types/ISearchParam";

export const paramsSerializer = (params:ISearchParams) => {
    return Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      })
      .join('&');
  };
