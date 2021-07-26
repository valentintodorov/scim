export interface CreateUserDto {
    userName: String;
    externalId: String;
    name: {
        formatted: String,
        familyName: String,
        givenName: String,
        middleName: String,
        honorificPrefix: String,
        honorificSuffix: String
      };
    displayName: String;
    nickName: String;
    profileUrl: String;
    emails: [
        {
          value: String,
          type: String,
          primary: Boolean
        }
      ];
      addresses: [
        {
          type: String,
          streetAddress: String,
          locality: String,
          region: String,
          postalCode: String,
          country: String,
          formatted: String,
          primary: Boolean
        },
      ];
      phoneNumbers: [
          {
            value: String,
            type: String,
          },
      ];
      ims: [
          {
            value: String,
            type: String,
          }
      ];
      photos: [
          {
              value: String,
              type: String,
          },
      ];
    userType: String;
    title: String;
    preferredLanguage: String;
    locale: String;
    timezone: String;
    active: Boolean;
    password: String;
    created: Date;
    lastModified: Date;
    version: Number;
    groups: string[];
    [key: string]: any;
}