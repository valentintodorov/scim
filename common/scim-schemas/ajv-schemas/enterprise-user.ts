// urn:ietf:params:scim:schemas:extension:enterprise:2.0:User	Enterprise User Extension	[RFC7643, Section 4.3]
const ajvSchemaExtensionEnterprise20User =
{
  $merge: {
    source: { $ref: "user" },
    with: {
      properties: {
        schemas: {
            type: "array",
            uniqueItems: true,
            items : {
                type : "string",
                enum : ["urn:ietf:params:scim:schemas:core:2.0:User", "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"] 
            },
            minItems: 2    
          },
        employeeNumber: {type: "string"},
        costCenter: {type: "string"},
        organization: {type: "string"},
        division: {type: "string"},
        department: {type: "string"},
        manager: {
          type: "object",
          properties: {
            value: {type: "string"},
            //$ref: {type: "User"},
            displayName: {type: "string"}
          }
        }
      }
    }
  },
}

export default ajvSchemaExtensionEnterprise20User;

//   type: "object",
//   properties: {
//     schemas: {
//       type: "array",
//       items : {
//         type : "string",
//         enum : ["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"] 
//       },
//       minItems: 1    
//     },
//     employeeNumber: {type: "string"},
//     costCenter: {type: "string"},
//     organization: {type: "string"},
//     division: {type: "string"},
//     department: {type: "string"},
//     manager: {
//       type: "object",
//       properties: {
//         value: {type: "string"},
//         //$ref: {type: "User"},
//         displayName: {type: "string"}
//       }
//     }
//   },
//   required: ["schemas", "userName"]
//}

// {
//     "schemas": [
//         "urn:scim:schemas:core:1.0",
//         "urn:scim:schemas:extension:enterprise:1.0"
//     ],
//     "userName": "{$parameters.scimusername}",
//     "name": {
//         "familyName": "{$user.lastname}",
//         "givenName": "{$user.firstname}",
//         "formatted": "{$user.display_name}"
//     },
//     "emails": {
//         "value": "{$user.email}",
//         "type": "work",
//         "primary": true
//     },
//     "title": "{$parameters.title}",
//     "urn:scim:schemas:extension:enterprise:1.0": {
//         "department": "{$parameters.department}",
//         "manager": {
//             "managerId": "{$parameters.external_manager_id}",
//             "displayName": "{$user.manager_firstname} {$user.manager_lastname}"
//         }
//     }
// }