
import Invoice from '../models/invoice.model.js';
import User from '../models/user.model.js'
import FeeStructure from '../models/feeStructure.model.js'

export const generateInvoice = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findByPk(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (!student.classId) {
      return res.status(400).json({ message: "Student is not assigned to any class" });
    }

    const invoiced = await Invoice.findAll({where: {studentId}})
    if(invoiced.length > 0){
      return res.status(404).json({ message: "Invoice already Generated" });
    }


    const fees = await FeeStructure.findAll({ where: { classId: student.classId }});
    if (fees.length === 0) return res.status(400).json({ message: "No fee structure found for this class" });
    const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);

    const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  
    const invoice = await Invoice.create({
      studentId,
      totalAmount,
      dueDate,
      status: "unpaid",
    });


    return res.status(201).json({message: "Invoiced Assigned Successfully"});
  } catch (err) {
    console.error('Error in generateInvoice:', err);
    return res.status(500).json({ message: err.message });
  }
};


export const invoiceAll = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    if (invoices.length === 0) {
      return res.status(404).json({ message: "No invoices found" });
    }
    return res.status(200).json(invoices);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const getStudentInvoices = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findByPk(studentId);
    
    const fees = await FeeStructure.findAll({where:{classId: student.classId}})
   
    const invoices = await Invoice.findAll({
      where: { studentId }
      
    });
    if (invoices.length === 0) {
      return res.status(404).json({ message: "No invoices for this student" });
    }
    return res.status(200).json({fees,invoices});
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message });
  }
};




export const deleteStudentInvoice = async(req,res)=>{

  try{
    const {studentId} = req.params;
    const invoices = await Invoice.findAll({ where: { studentId } });
    if (invoices.length === 0) {
      return res.status(404).json({ message: "No invoices for this student" });
    }
    for(let invoice of invoices) invoice.destroy();
    return res.status(200).json({message:"Invoice Deleted Successfully"});
  }catch(error){
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
}




export const updateStudentInvoice = async(req, res) =>{
  try{
    const {invoiceId} = req.params;
   await Invoice.update({status:"paid"} ,{where:{id:invoiceId}})
  
    return res.status(200).json({message:"Invoice Update Successfully"});
  }catch(error){
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
}