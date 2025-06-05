import Payment from '../models/payment.model.js';
import Invoice from '../models/invoice.model.js';

export const applyPayment = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { amount, paymentMethod, transactionId } = req.body;
    
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    const payment = await Payment.create({
      invoiceId,
      amount,
      paymentMethod,
      transactionId: paymentMethod === 'Cash' ? null : transactionId,
      paymentDate: new Date(),
    });

    invoice.paidAmount += amount;
    invoice.status = invoice.paidAmount >= invoice.totalAmount ? 'paid' : 'partial';
    await invoice.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

