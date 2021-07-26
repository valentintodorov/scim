import { model, Schema, Model, Document, ObjectId } from 'mongoose';

export interface IGroup extends Document {
    schemas: [
        { 
          type: String,
          required: true
        }
    ],
    externalId: String,
    displayName: String,
    members: [String],
    // members: [
    //     {
    //         value: String,
    //         $ref: String,  //"referenceTypes": ["User","Group"],
    //         type: String, //"User","Group"
    //     }
    // ],
    meta: {
        resourceType: string, //Schema
        created: Date,
        //created: { type: Date, default: Date.now },
        lastModified: Date,
        location: String, //'/Users/' + user.id,
        version: Number,
    }
}

export const GroupSchema: Schema = new Schema({
    schemas: [
        { 
          type: String,
          required: true
        }
      ],
    externalId: String,
    displayName: String,
    members: [String],
    //members: [
    //   { type: Schema.Types.ObjectId }
    //     // {
    //     //     value: String,
    //     //     $ref: String,  //"referenceTypes": ["User","Group"],
    //     //     type: { type: String }, //"User","Group"
    //     // }
    // ],
    meta: {
      resourceType: String,//"Group"
      created: Date,
      lastModified: Date,
      location: String, //'/Groups/' + group.id,
      version: Number,
      }
    });

GroupSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc: any, ret: { _id: any; members: any; }) {   
      delete ret._id;
      delete ret.members;
    }
  });

export const Group: Model<IGroup> = model('Group', GroupSchema);
