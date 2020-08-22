import { Schema, model, Document } from "mongoose";
import { IDevice } from "../models/device.model";

export interface IGateWay extends Document {
  serialNumber: {
    type: string;
    required: true;
  };
  name: {
    type: string;
    required: true;
  };
  IpV4: {
    type: string;
    required: true;
  };
  devices: Array<IDevice>;
}

const GateWaySchema: Schema = new Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  IpV4: {
    type: String,
    required: true,
  },
  devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],
});

export default model<IGateWay>("GateWay", GateWaySchema);
