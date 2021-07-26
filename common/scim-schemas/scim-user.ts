// export default class ScimUser {
//    static jsonResponse(user: any){
//       return {
//          schemas:[
//             'urn:ietf:params:scim:schemas:core:2.0:User',
//             'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User'
//          ],
//          id: user.id,
//          externalId: user.externalId,
//          meta:{
//             resourceType: "User",
//             created: user.created,
//             lastModified: user.lastModified,
//             location: '/Users/' + user.id,
//             version: user.version
//          },
//          name:{
//             formatted: user.name.formatted,
//             givenName: user.name.givenName,
//             familyName: user.name.familyName,
//          },
//          userName: user.userName,
//          displayName: user.displayName
//       }
//    }
// }