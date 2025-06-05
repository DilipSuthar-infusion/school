
import Invoice from '../models/invoice.model.js';
import Fee from '../models/fee.model.js';


export const generateInvoice = async (req, res) => {
  try {
    const { studentId } = req.params;
    const fees = await Fee.findAll({ where: { studentId, invoiced: false } });
    if(fees.length > 0) throw new CustomError('Invoice already exists', 400);
    if (fees.length === 0)  throw new CustomError('No fees to invoice', 400);

    const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);
    const invoice = await Invoice.create({
      studentId,
      totalAmount,
      dueDate: new Date()+7*24*60*60*1000,
      status: 'unpaid',
    });

    await Promise.all(fees.map(fee => {
      fee.invoiced = true;
      return fee.save();
    }));

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const invoiceAll = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    if(!invoices){
      throw new CustomError('No invoices found', 404);
    }
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentInvoices = async (req, res) => {
  try {
    const { studentId } = req.params;
    const invoices = await Invoice.findAll({ where: { studentId } });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};