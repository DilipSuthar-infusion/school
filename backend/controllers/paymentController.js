import Payment from '../models/payment.model.js';
import Invoice from '../models/invoice.model.js';
import CustomError from '../utils/customError.js';

export const applyPayment = async (req, res) => {
    const { invoiceId } = req.params;
    const { amount, paymentMethod, transactionId } = req.body;
    
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) throw CustomError(404,"Invoice not Found");

    await Payment.create({
      invoiceId,
      amount,
      paymentMethod,
      transactionId: transactionId,
      paymentDate: new Date(),
    });
    invoice.totalAmount = 0,
    invoice.paidAmount= amount;
    await invoice.save();

    res.status(201).json({message: "Fee Payment Successfully"});
};

export const getInvoicePayments = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const payments = await Payment.findAll({ where: { invoiceId } });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

