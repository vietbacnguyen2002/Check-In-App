import Customer from "../models/customer.model.js";
import xlsx from "xlsx";
export const createCustomer = async (req, res) => {
  try {
    const result = await Customer.create(req.body);
    res.status(201).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

export const getCustomers = async (req, res) => {
  try {
    // sort id in ascending order
    const result = await Customer.find().sort({ id: -1 });
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

export const getCustomer = async (req, res) => {
  try {
    // console.log("ID is", req);
    const { id } = req.params;
    const result = await Customer.findOne({ id });
    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng này" });
    }
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOneAndUpdate(
      {
        id: customerId,
      },
      req.body
    );
    res.status(200).json({
      message: "success",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.deleteOne({ id });
    res.status(200).json({ message: "success", data: null });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

export const importCustomers = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded", data: null });
    }

    // Read the uploaded Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log("Parsed data:", data);

    // Process the data (e.g., save to database)
    const result = await Customer.create(data);

    // Respond with success message
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "Failed to process file", data: null });
  }
};

export const exportCustomers = async (req, res) => {
  try {
    const result = await Customer.find();
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkInCustomer = async (req, res) => {
  try {
    const qrCode = req.body?.qrCode;
    //  CHECKIN-1 : result is 1
    const id = qrCode.split("-")[1];
    if (isNaN(id)) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy khách hàng này", data: null });
    }
    console.log("ID >> ", id);

    console.log("QR code is", qrCode);
    const customer = await Customer.findOne({ id });
    if (!customer) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy khách hàng này", data: null });
    }
    if (customer.isCheckedIn) {
      customer.numberCheckedIn++;
      await customer.save();
      return res.status(409).json({ message: "CheckedIn", data: customer });
    }
    customer.isCheckedIn = true;
    customer.numberCheckedIn++;
    const time = new Date();
    customer.timeCheckedIn = time.toLocaleString("en-GB", { hour12: false });
    await customer.save();
    res.status(200).json({
      message: "Check-in thành công",
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, data: null });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const numberCustomer = await Customer.countDocuments();
    const numberCheckedIn = await Customer.countDocuments({
      isCheckedIn: true,
    });
    const result = {
      numberCustomer,
      numberCheckedIn,
      numberNotCheckedIn: numberCustomer - numberCheckedIn,
    };
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, data: null });
  }
};
