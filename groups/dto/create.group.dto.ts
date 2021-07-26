export interface CreateGroupDto {
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
  [key: string]: any;
}