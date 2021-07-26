// urn:ietf:params:scim:schemas:core:2.0:User	User Resource	[RFC7643, Section 4.1]
const ajvSchemaCore20User = 
{
  type: "object",
  properties: {
    schemas: {
      type: "array",
      items : {
        type : "string",
        enum : ["urn:ietf:params:scim:schemas:core:2.0:User", "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"] 
      },
      minItems: 1    
    },
    userName: {type: "string"},
    externalId: {type: "string"},
    name: {
      type: "object",
      properties: {
        formatted: {type: "string"},
        familyName: {type: "string"},
        givenName: {type: "string"},
        middleName  : {type: "string"},
        honorificPrefix  : {type: "string"},
        honorificSuffix  : {type: "string"}
      }
    },
    displayName: {type: "string"},
    nickName: {type: "string"},
    profileUrl: {type: "string"},
    title: {type: "string"},
    userType: {type: "string"},
    preferredLanguage: {type: "string"},
    locale: {type: "string"},
    timezone: {type: "string"},
    active: {type: "boolean"},
    password: {type: "string"},
    emails: {
      type: "array",
      items : {
        type : "object",
        properties: {
          value: {type: "string"},
          display: {type: "string"},
          type: {type: "string"},
          primary: {type: "boolean"},
        } 
      }
    },
    phoneNumbers: {
      type: "array",
      items : {
        type : "object",
        properties: {
          value: {type: "string"},
          display: {type: "string"},
          type: {type: "string"},
          primary: {type: "boolean"},
        }
      }
    },
    ims: {
      type: "array",
      items : {
        type : "object",
        properties: {
          value: {type: "string"},
          display: {type: "string"},
          type: {type: "string"},
          primary: {type: "boolean"},
        }
      }
    },
    photos: {
      type: "array",
      items : {
        type : "object",
        properties: {
          value: {type: "string"},
          display: {type: "string"},
          type: {type: "string"},
          primary: {type: "boolean"},
        }
      }
    },
    addresses: {
      type: "array",
      items : {
        type : "object",
        properties: {
          formatted: {type: "string"},
          streetAddress: {type: "string"},
          locality: {type: "string"},
          region: {type: "string"},
          postalCode: {type: "string"},
          country: {type: "string"},
          type: {type: "string"}
        }
      }
    },
    groups: {
      type: "object",
      properties: {
        value: {type: "string"},
        // $ref: {
        //   type: "array",
        //   items : {
        //     enum : ["User", "Group"] 
        //   },
        // },
        display: {type: "string"},
        type: {
          type: "string",
          enum : ["direct", "indirect"] // "direct", "indirect"
        }
      }
    },
    entitlements: {
      type: "array",
      items : {
        type : "object",
        properties: {
          value: {type: "string"},
          display: {type: "string"},
          type: {type: "string"},
          primary: {type: "boolean"},
        }
      }
    },
    roles: {
      type: "array",
      items : {
        type : "object",
        properties: {
          value: {type: "string"},
          display: {type: "string"},
          type: {type: "string"},
          primary: {type: "boolean"},
        }
      }
    },
    x509Certificates: {
      type: "array",
      items : {
        type : "object",
        properties: {
          value: {type: "string"},
          display: {type: "string"},
          type: {type: "string"},
          primary: {type: "boolean"},
        }
      }
    },
    employeeNumber:  {type: "string"},
    costCenter:  {type: "string"},
    organization:  {type: "string"},
    division:  {type: "string"},
    department:  {type: "string"},
    manager: {
      value:  {type: "string"},
      //$ref: {type: "string"},
      displayName: {type: "string"}
    }
  },
  required: ["schemas", "userName"],
  //additionalProperties: false
}

export default ajvSchemaCore20User
// {
//   "schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],
//   "userName":"bjensen",
//   "externalId":"bjensen",
//   "name":{
//     "formatted":"Ms. Barbara J Jensen III",
//     "familyName":"Jensen",
//     "givenName":"Barbara"
//   }
// }