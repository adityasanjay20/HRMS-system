const { sql, poolPromise } = require('../config/db');

exports.getEmployeeAppraisals = async (req, res)  =>{
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_EmployeeAppraisals');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching employee appraisals:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
}

// Controller to insert a new performance appraisal
exports.insertAppraisal = async (req, res) => {
    try {
        const { EmployeeID, ReviewerID, ReviewCycle, ReviewDate, Score, Feedback, PromotionRecommended } = req.body;

        if (!EmployeeID || !ReviewerID || !ReviewCycle || !ReviewDate || Score === undefined || PromotionRecommended === undefined) {
            return res.status(400).json({ message: 'All fields (EmployeeID, ReviewerID, ReviewCycle, ReviewDate, Score, PromotionRecommended) are required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('ReviewerID', sql.Int, ReviewerID)
            .input('ReviewCycle', sql.VarChar(20), ReviewCycle)
            .input('ReviewDate', sql.Date, ReviewDate)
            .input('Score', sql.Decimal(3, 2), Score)
            .input('Feedback', sql.VarChar(sql.MAX), Feedback)
            .input('PromotionRecommended', sql.Bit, PromotionRecommended)
            .execute('InsertAppraisal');


        let insertedId = 0;
        if (result.recordset && result.recordset.length > 0) {
            insertedId = result.recordset[0].LeaveID || Object.values(result.recordset[0])[0];
        }

        res.status(201).json({ message: 'Appraisal inserted successfully!', appraisalId: insertedId });


    } catch (err) {
        console.error('Error inserting appraisal:', err.message);
        res.status(500).send({ message: 'Error inserting appraisal', error: err.message });
    }
};

// Controller to update an existing performance appraisal
exports.updateAppraisal = async (req, res) => {
    try {
        // Parameters for UpdateAppraisal SP:
        // @AppraisalID, @Score, @Feedback, @PromotionRecommended
        const { AppraisalID, Score, Feedback, PromotionRecommended } = req.body;

        // Basic validation
        if (!AppraisalID || Score === undefined || PromotionRecommended === undefined) {
            return res.status(400).json({ message: 'AppraisalID, Score, and PromotionRecommended are required.' });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('AppraisalID', sql.Int, AppraisalID)
            .input('Score', sql.Decimal(3, 2), Score) // Matching DECIMAL(3,2)
            .input('Feedback', sql.VarChar(sql.MAX), Feedback) // Matching TEXT (maps to VarChar(MAX))
            .input('PromotionRecommended', sql.Bit, PromotionRecommended) // Matching BIT
            .execute('UpdateAppraisal');

        res.status(200).json({ message: 'Appraisal updated successfully!' });
    } catch (err) {
        console.error('Error updating appraisal:', err.message);
        res.status(500).send({ message: 'Error updating appraisal', error: err.message });
    }
};

