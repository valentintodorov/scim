export interface PutGroupDto {
  id: string;
  schemas: [
    {
      type: String
    }
  ];
  displayName: String;
  members: [
    {
        value: String,
        $ref: String,  //"referenceTypes": ["User","Group"],
        type: String, //"User","Group"
    }
  ];
  [key: string]: any
}