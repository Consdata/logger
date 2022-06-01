export interface SearchParamsData {
  [key: string]: string;
}

export class LocationUtil {

  public static getSearchParams(): SearchParamsData {
    const search = window.location.search;
    if (search.length > 0) {
      const searchPart = search.substr(1, search.length - 1);
      return LocationUtil.convertRawParamsStringToParamsData(searchPart, LocationUtil.QUERY_SEPARATOR);
    } else {
      return {};
    }
  }

  private static QUERY_SEPARATOR: string = '&';

  private static convertRawParamsStringToParamsData(raw: string, separator: string): SearchParamsData {
    const params: SearchParamsData = {};

    raw.split(separator)
        .map(val => ({
          key: val.split('=')[0],
          value: val.indexOf('=') >= 0 ? val.substr(val.indexOf('=') + 1) : '',
        }))
        .forEach(queryParam => params[queryParam.key] = queryParam.value);

    return params;
  }

}
