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
        display: String,
    }
  ];
  meta: {
    created: Date;
    lastModified: Date;
    version: Number;
  };
  [key: string]: any
}