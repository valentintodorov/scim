



// {
//     "schemas": [
//         "urn:scim:schemas:core:1.0",
//         "urn:scim:my:custom:schema"
//     ],
//     "userName": "{$parameters.scimusername}",
//     "name": {
//         "familyName": "{$user.lastname}",
//         "givenName": "{$user.firstname}",
//         "formatted": "{$user.display_name}"
//     },
//     "urn:scim:my:custom:schema": {
//         "vi_or_emacs": "{$user.custom_fields.vi_or_emacs}"
//         "tabs_or_spaces": "{$user.custom_fields.tabs_or_spaces}"
//     }
// }