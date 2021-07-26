  const ResourceType = {
    "totalResults": 2,
    "itemsPerPage": 2,
    "startIndex": 1,
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    "Resources": [{
      "schemas": ["urn:ietf:params:scim:schemas:core:2.0:ResourceType"],
      "id": "urn:ietf:params:scim:schemas:core:2.0:User",
      "name": "User",
      "endpoint": "/Users",
      "description": "User Account",
      "schema": "urn:ietf:params:scim:schemas:core:2.0:User",
      "schemaExtensions": [{
        "schema":
          "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
        "required": false
      }],
      "meta": {
        "resourceType": "ResourceType",
        "location":
          "/Schemas/urn:ietf:params:scim:schemas:core:2.0:User"
      }
    },
    {
      "schemas": ["urn:ietf:params:scim:schemas:core:2.0:ResourceType"],
      "id": "urn:ietf:params:scim:schemas:core:2.0:Group",
      "name": "Group",
      "endpoint": "/Groups",
      "description": "Group",
      "schema": "urn:ietf:params:scim:schemas:core:2.0:Group",
      "meta": {
        "resourceType": "Schema",
        "location":
          "/Schemas/urn:ietf:params:scim:schemas:core:2.0:Group"
      }
    }]
  }

export default ResourceType   