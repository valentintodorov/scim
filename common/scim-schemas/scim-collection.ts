export default class ScimCollection {
  static jsonResponse(items: any, startIndex: number, totalResults: number){
    return {
      itemsPerPage: items.length,
      totalResults: totalResults,
      startIndex: startIndex,
      schemas: [
        'urn:ietf:params:scim:api:messages:2.0:ListResponse'
      ],
      Resources: items
    }
  }
}