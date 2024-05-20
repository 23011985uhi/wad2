const Question = require("../models/activity.model");

exports.questions = (req, res) => {
  Question.find({ qtype: "q" })
    .then(questions => {
      if (questions && questions.length > 0) { 
        const formattedQuestions = questions.map(question => {
          return {
            qid: question.urltitle,
            title: question.fulltitle
          };
        });
        return res.status(200).send({ success: true, questions: formattedQuestions });
      } else {
        res.status(404).send({ success: false, questions: [] });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.question = (req, res) => {
  const { urltitle } = req.body;
  Question.findOne({ urltitle })
    .then(question => {
      if (question) { 
        const qData = {
          urltitle: question.urltitle,
          fulltitle: question.fulltitle,
          qtext: question.qtext,
          answers: question.metadata
        };
        return res.status(200).send({ success: true, question: qData });
      } else {
        res.status(404).send({ success: false, message: "No question found" });
      } 
    })
    .catch(err => {
      res.status(500).send({ success: false, message: err.message });
    });
};