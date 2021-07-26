import {v4 as uuidv4} from 'uuid';
let uniqueId = "_" + uuidv4();

const firstUserBody = {
    schemas: [
      "urn:ietf:params:scim:schemas:core:2.0:User",
      "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
    ],
    externalId: "701984" + uniqueId,
    userName: "bjensen",
    name: {
      formatted: "Ms. Barbara J Jensen, III",
      familyName: "Jensen",
      givenName: "Barbara",
      middleName: "Jane",
      honorificPrefix: "Ms.",
      honorificSuffix: "III"
    },
    displayName: "Babs Jensen",
    nickName: "Babs",
    profileUrl: "https://login.example.com/bjensen",
    emails: [
      {
        value: "bjensen@example.com",
        type: "work",
        primary: true
      },
      {
        value: "babs@jensen.org",
        type: "home"
      }
    ],
    addresses: [
      {
        type: "work",
        streetAddress: "100 Universal City Plaza",
        locality: "Hollywood",
        region: "CA",
        postalCode: "91608",
        country: "USA",
        formatted: "100 Universal City Plaza\nHollywood, CA 91608 USA",
        primary: true
      },
      {
        type: "home",
        streetAddress: "456 Hollywood Blvd",
        locality: "Hollywood",
        region: "CA",
        postalCode: "91608",
        country: "USA",
        formatted: "456 Hollywood Blvd\nHollywood, CA 91608 USA"
      }
    ],
    phoneNumbers: [
      {
        value: "555-555-5555",
        type: "work"
      },
      {
        value: "555-555-4444",
        type: "mobile"
      }
    ],
    ims: [
      {
        value: "someaimhandle",
        type: "aim"
      }
    ],
    photos: [
      {
        value:
          "https://photos.example.com/profilephoto/72930000000Ccne/F",
        type: "photo"
      },
      {
        value:
          "https://photos.example.com/profilephoto/72930000000Ccne/T",
        type: "thumbnail"
      }
    ],
    userType: "Employee",
    title: "Tour Guide",
    preferredLanguage: "en-US",
    locale: "en-US",
    timezone: "America/Los_Angeles",
    active:true,
    password: "t1meMa$heen",
    groups: [
        {
          value: "60fa92542e8a334a300a235b",
          //$ref: "/Groups/60fa92542e8a334a300a235b",
          display: "Tour Guides"
        },
        {
          value: "60fa92552e8a334a300a235e",
          //$ref: "/Groups/60fa92552e8a334a300a235e",
          display: "Employees"
        },
        {
          value: "60fa92552e8a334a300a2361",
          //$ref: "/Groups/60fa92552e8a334a300a2361",
          display: "US Employees"
        }
      ],
    //   "x509Certificates": [
    //     {
    //       "value":
    //        "MIIDQzCCAqygAwIBAgICEAAwDQYJKoZIhvcNAQEFBQAwTjELMAkGA1UEBhMCVVMx
    //         EzARBgNVBAgMCkNhbGlmb3JuaWExFDASBgNVBAoMC2V4YW1wbGUuY29tMRQwEgYD
    //         VQQDDAtleGFtcGxlLmNvbTAeFw0xMTEwMjIwNjI0MzFaFw0xMjEwMDQwNjI0MzFa
    //         MH8xCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRQwEgYDVQQKDAtl
    //         eGFtcGxlLmNvbTEhMB8GA1UEAwwYTXMuIEJhcmJhcmEgSiBKZW5zZW4gSUlJMSIw
    //         IAYJKoZIhvcNAQkBFhNiamVuc2VuQGV4YW1wbGUuY29tMIIBIjANBgkqhkiG9w0B
    //         AQEFAAOCAQ8AMIIBCgKCAQEA7Kr+Dcds/JQ5GwejJFcBIP682X3xpjis56AK02bc
    //         1FLgzdLI8auoR+cC9/Vrh5t66HkQIOdA4unHh0AaZ4xL5PhVbXIPMB5vAPKpzz5i
    //         PSi8xO8SL7I7SDhcBVJhqVqr3HgllEG6UClDdHO7nkLuwXq8HcISKkbT5WFTVfFZ
    //         zidPl8HZ7DhXkZIRtJwBweq4bvm3hM1Os7UQH05ZS6cVDgweKNwdLLrT51ikSQG3
    //         DYrl+ft781UQRIqxgwqCfXEuDiinPh0kkvIi5jivVu1Z9QiwlYEdRbLJ4zJQBmDr
    //         SGTMYn4lRc2HgHO4DqB/bnMVorHB0CC6AV1QoFK4GPe1LwIDAQABo3sweTAJBgNV
    //         HRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZp
    //         Y2F0ZTAdBgNVHQ4EFgQU8pD0U0vsZIsaA16lL8En8bx0F/gwHwYDVR0jBBgwFoAU
    //         dGeKitcaF7gnzsNwDx708kqaVt0wDQYJKoZIhvcNAQEFBQADgYEAA81SsFnOdYJt
    //         Ng5Tcq+/ByEDrBgnusx0jloUhByPMEVkoMZ3J7j1ZgI8rAbOkNngX8+pKfTiDz1R
    //         C4+dx8oU6Za+4NJXUjlL5CvV6BEYb1+QAEJwitTVvxB/A67g42/vzgAtoRUeDov1
    //         +GFiBZ+GNF/cAYKcMtGcrs2i97ZkJMo="
    //     }
    //   ],
    //   "meta": {
    //     "resourceType": "User",
    //     "created": "2010-01-23T04:56:22Z",
    //     "lastModified": "2011-05-13T04:42:34Z",
    //     "version": "W\/\"a330bc54f0671c9\"",
    //     "location": "https://example.com/v2/Users/2819c223-7f76-453a-919d-413861904646"
    //   }
    employeeNumber: "employeeNumber 1",
    costCenter: "costCenter 1",
    organization: "organization 1",
    division: "division 1",
    department: "department 1",
    manager: {
      value: "manager value 1",
      //$ref: {type: "User"},
      displayName: "manager displayName 1"
    }
};

export default firstUserBody;