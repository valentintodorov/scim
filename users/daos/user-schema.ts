import { model, Schema, Model, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
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
  ],
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
  ],
  phoneNumbers: [
      {
        value: String,
        type: String,
      },
  ],
  ims: [
      {
        value: String,
        type: String,
      }
  ],
  photos: [
      {
          value: String,
          type: String,
      },
  ],
  userType: String;
  title: String;
  preferredLanguage: String;
  locale: String;
  timezone: String;
  active: Boolean;
  password: String;
  meta: {
    resourceType: String,// "User"
    created: Date,
    lastModified: Date,
    location: String, //'/Users/' + user.id,
    version: Number,
  }
  groups: [String],
  employeeNumber: String,
  costCenter: String,
  organization: String,
  division: String,
  department: String,
  manager: {
    value: String,
    //$ref: {type: "User"},
    displayName: String
  }
}

export const UserSchema: Schema = new Schema({
        schemas: [
          { 
            type: String,
            required: true
          }
        ],
        userName: { type: String, required: true },
        externalId: String, //{ type: String, required: true },
        name: {
            formatted: String,
            familyName: String,
            givenName: String,
            middleName: String,
            honorificPrefix: String,
            honorificSuffix: String
        },
        displayName: String,
        nickName: String,
        profileUrl: String,
        emails: [
          {
            value: String,
            type: { type: String },
            primary: Boolean
          }
        ],
        addresses: [
            {
              type: { type: String },
              streetAddress: String,
              locality: String,
              region: String,
              postalCode: String,
              country: String,
              formatted: String,
              primary: Boolean
            },
        ],
        phoneNumbers: [
            {
              value: String,
              type: { type: String }
            },
        ],
        ims: [
            {
              value: String,
              type: { type: String }
            }
        ],
        photos: [
            {
                value: String,
                type: { type: String }
            },
        ],
        userType: String,
        title: String,
        preferredLanguage: String,
        locale: String,
        timezone: String,
        active: Boolean,
        password: { type: String, select: false },
        groups: [String],
        //groups: [Schema.Types.ObjectId],
        meta: {
          resourceType: String,// "User" or "Group"
          created: Date,
          //created: { type: Date, default: Date.now },
          lastModified: Date,
          location: String, //'/Users/' + user.id,
          version: Number,
        },
        employeeNumber: String,
        costCenter: String,
        organization: String,
        division: String,
        department: String,
        manager: {
          value: String,
          //$ref: {type: "User"},
          displayName: String
        }
    });

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc: any, ret: { _id: any; groups: any; }) {   
    //transform: function (doc: any, ret: { _id: any; }) {   
      delete ret._id;
      delete ret.groups;
    }
  });
// UserSchema.set('toJSON', {
//   virtuals: true,
//   versionKey:false,
//   transform: function (doc: any, ret: { _id: any; emails: any[]; addresses: any[]; phoneNumbers: any[]; ims: any[]; photos: any[]; }) {   
//     delete ret._id;
//     if(ret.emails) {
//       ret.emails.map((i: { _id: any; })=>{delete i._id;});
//     }
//     if(ret.addresses) {
//       ret.addresses.map((i: { _id: any; })=>{delete i._id;});
//     }
//     if(ret.phoneNumbers) {
//       ret.phoneNumbers.map((i: { _id: any; })=>{delete i._id;});
//     }
//     if(ret.ims) {
//       ret.ims.map((i: { _id: any; })=>{delete i._id;});
//     }
//     if(ret.photos) {
//       ret.photos.map((i: { _id: any; })=>{delete i._id;});
//     }
//   }
// });

export const UserModel: Model<IUser> = model('User', UserSchema);
