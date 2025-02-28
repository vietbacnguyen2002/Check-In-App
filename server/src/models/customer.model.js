import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);
const customerSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  isCheckedIn: {
    type: Boolean,
    default: false,
  },
  numberCheckedIn: {
    type: Number,
    default: 0,
  },
  timeCheckedIn: {
    type: String,
  },
});

customerSchema.plugin(AutoIncrement, {
  inc_field: 'id'
});
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
