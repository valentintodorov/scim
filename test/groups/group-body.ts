import {v4 as uuidv4} from 'uuid';
let uniqueId = "_" + uuidv4();

const firstGroupBody = {
    schemas: [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    displayName: "Tour Guides",
    externalId: "TourGuides",
    members: [
    ],
};

const secondGroupBody = {
    schemas: [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    displayName: "Employees",
    externalId: "Employees",
    members: [
    ],
};

const thirdGroupBody = {
    schemas: [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    displayName: "US Employees",
    externalId: "USEmployees",
    members: [
    ],
};

export const groupBodies =  {
    firstGroupBody,
    secondGroupBody,
    thirdGroupBody
};