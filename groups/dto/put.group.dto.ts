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
    }
  ];
  [key: string]: any
}