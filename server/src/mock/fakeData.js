import Customer from "../models/customer.model.js";

const customers = [
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "Bob Smith",
    email: "bobsmith@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "Alice Johnson",
    email: "alicejohnson@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "Bob Smith",
    email: "bobsmith@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "Alice Johnson",
    email: "alicejohnson@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
  {
    name: "Bob Smith",
    email: "bobsmith@gmail.com",
    phone: "1234567890",
    position: "Manager",
    isCheckedIn: false,
    numberCheckedIn: 0,
  },
];

export const generateFakeData = async () => {
  customers.forEach(async (cus) => {
    await Customer.create(cus);
  });
};
