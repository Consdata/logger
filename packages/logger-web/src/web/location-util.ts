export interface SearchParamsData {
  [key: string]: string;
}

export class LocationUtil {

  private static QUERY_SEPARATOR: string = '&';

  public static getSearchParams(): SearchParamsData {
    const search = window.location.search;
    if (search.length > 0) {
      return LocationUtil.convertRawParamsStringToParamsData(search.substr(1, search.length - 1), LocationUtil.QUERY_SEPARATOR);
    } else {
      return {};
    }
  }

  private static convertRawParamsStringToParamsData(raw: string, separator: string): SearchParamsData {
    const params: SearchParamsData = {};

    raw.split(separator)
      .map(val => ({
        key: val.split('=')[0],
        value: val.indexOf('=') >= 0 ? val.substr(val.indexOf('=') + 1) : ''
      }))
      .forEach(queryParam => params[queryParam.key] = queryParam.value);

    return params;
  }

}
