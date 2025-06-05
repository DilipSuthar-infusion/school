import FeesStructure from '../models/feeStructure.model.js';

// Add new fee structure
export const addFeeStructure = async (req, res) => {
    const { classId, feeType, amount, feeFrequency } = req.body;
    if (!classId || !feeType || !amount) {
      throw new Error('Missing required fields', 400);
    }

    const existing = await FeesStructure.findOne({ where: { classId, feeType } });
    if (existing) {
      throw new Error('Fee structure already exists', 400);
    }

    const newFeeStructure = await FeesStructure.create({
      classId,
      feeType,
      amount,
      feeFrequency    });

    res.status(201).json({ message: 'Fee structure added', feeStructure: newFeeStructure });

};

// Update existing fee structure by ID
export const updateFeeStructure = async (req, res) => {
    const { id } = req.params;
    const { classId, feeType, amount } = req.body;

    const feeStructure = await FeesStructure.findByPk(id);
    if (!feeStructure) {
      return res.status(404).json({ message: 'Fee structure not found' });
    }

    // Update fields only if provided
    if (classId !== undefined) feeStructure.classId = classId;
    if (feeType !== undefined) feeStructure.feeType = feeType;
    if (amount !== undefined) feeStructure.amount = amount;

    await feeStructure.save();

    res.status(200).json({ message: 'Fee structure updated', feeStructure });
};

// Delete fee structure by ID
export const deleteFeeStructure = async (req, res) => {

    const { id } = req.params;

    const feeStructure = await FeesStructure.findByPk(id);
    if (!feeStructure) {
      throw new Error('Fee structure not found', 404);
    }

    await feeStructure.destroy();

    res.status(200).json({ message: 'Fee structure deleted' });
 
};
