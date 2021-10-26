const Exercises = require('../models/exercisemodel');

module.exports.getAllExercises = ()=>{
    catchAsync(async (req, res, next) => {
      const doc =  await Exercises.find() ;
        
        res.status(200).json({
          status: 'success',
          results: doc.length,
          data: {
            data: doc
          }
        });
      })
}

