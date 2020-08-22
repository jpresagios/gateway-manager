import { Schema, model, Document } from "mongoose";
import { IGateWay } from "./gateways.model";

export interface IDevice extends Document {
  gateWay: IGateWay["_id"];
  uid: {
    type: number;
    required: true;
  };

  vendor: {
    type: string;
  };

  createAt: {
    type: Date;
  };

  status: {
    type: string;
    required: true;
  };
}

const DeviceSchema: Schema = new Schema({
  gateWay: { type: Schema.Types.ObjectId, ref: "GateWay" },
  uid: {
    type: Number,
    required: true,
  },

  vendor: {
    type: String,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    required: true,
  },
});

export default model<IDevice>("Device", DeviceSchema);
