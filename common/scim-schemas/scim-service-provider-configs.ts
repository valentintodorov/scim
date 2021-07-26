const ServiceProviderConfigs = {
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig"],
    "patch": {
      "supported": true
    },
    "bulk": {
      "supported": false,
      "maxPayloadSize": 1048576,
      "maxOperations": 1000
    },
    "filter": {
      "supported": true,
      "maxResults": 200
    },
    "changePassword": {
      "supported": false
    },
    "sort": {
      "supported": false
    },
    "etag": {
      "supported": false
    },
    "documentationUri": "http://example.com/help/scim.html",
    "authenticationSchemes": [
      {
        "name": "HTTP Basic",
        "description": "Authentication scheme using the HTTP Basic Standard",
        "specURI": "http://www.rfc-editor.org/info/rfc2617",
        "documentationUri": "http://en.wikipedia.org/wiki/Basic_access_authentication",
        "type": "httpbasic",
        "primary": true
      }
    ],
    "xmlDataFormat": { "supported": false }
  }

export default ServiceProviderConfigs