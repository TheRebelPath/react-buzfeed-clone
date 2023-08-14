const QuestionBlock = ({
  question,
  quizItemId,
  setChosenAnswerItems,
  chosenAnswerItems,
  unansweredQuestionIds,
  setUnansweredQuestionsIds,
}) => {
  const handleClick = () => {
    setChosenAnswerItems((prevState) => [...prevState, question.text]);
    setUnansweredQuestionsIds(
      unansweredQuestionIds.filter((id) => id !== quizItemId)
    );
  };

  const validPick =
    !chosenAnswerItems?.includes(question.text) &&
    !unansweredQuestionIds?.includes(quizItemId);

  return (
    <button
      className="question-block"
      onClick={handleClick}
      disabled={validPick}
    >
      <img src={question.image} alt={question.alt} />
      <h3>{question.text}</h3>
      <p>
        <a href={question.image} target="_blank" rel="noreferrer">
          {question.credit}{" "}
        </a>
        <a href="https://www.unsplash.com" target="_blank" rel="noreferrer">
          Unsplash
        </a>
      </p>
    </button>
  );
};

export default QuestionBlock;
