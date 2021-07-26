// urn:ietf:params:scim:api:messages:2.0:Error	Error Response	[RFC7644, Section 3.12]
export default class ScimErrorSchema {
    static jsonErr(htmlErrCode: any, err: any) { 
        let errJson = {};
        let msg = ` `;
        err.constructor === Error ? msg += err.message : msg += err;     
        errJson =
        {
            schemas: ['urn:ietf:params:scim:api:messages:2.0:Error'],
            detail: msg,
            status: htmlErrCode
        };
    
        return errJson;
    }
}

// "status": "400",
// "response":{
//     "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
//     "scimType":"invalidSyntax"
//     "detail": "Request is unparsable, syntactically incorrect, or violates schema.",
//     "status":"400"
// }
