const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number, 
  qtype: String,
  urltitle: {
    type: String,
    unique: true
  },
  fulltitle: String,
  qtext: String,
  metadata: mongoose.Schema.Types.Mixed
},{ collection: 'Questions' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;