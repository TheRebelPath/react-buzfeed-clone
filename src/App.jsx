import { useEffect, useState, createRef } from "react";
import Title from "./components/Title";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";

const App = () => {
  const [quiz, setQuiz] = useState(null);
  const [chosenAnswerItems, setChosenAnswerItems] = useState([]);
  const [unansweredQuestionIds, setUnansweredQuestionsIds] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const refs = unansweredQuestionIds?.reduce((acc, id) => {
    acc[id] = createRef();
    return acc;
  }, {});

  const answerRef = createRef();

  const fetchData = async () => {
    try {
      // const response = await fetch("http://localhost:8000/quiz");
      const response = await fetch("https://api.jsonstorage.net/v1/json/20abe32b-488a-49c2-beac-f26eb127bee8/3621153f-c406-41cc-b0f8-44baef278130");
      const json = await response.json();
      setQuiz(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unansweredIds = quiz?.content?.map(({ id }) => id);
    setUnansweredQuestionsIds(unansweredIds);
  }, [quiz]);

  useEffect(() => {
    if (chosenAnswerItems.length > 0) {
      if (showAnswer) {
        //scroll to answer block
        answerRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true);
        //small delay given to give the answer time to render and scroll all the way down
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 300);
      } else {
        // scroll to highest unasweredQuestionIds
        const highestId = Math.min(...unansweredQuestionIds);
        refs[highestId].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [unansweredQuestionIds, showAnswer, chosenAnswerItems, answerRef, refs]);

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {refs &&
        quiz?.content?.map((contentItem) => (
          <QuestionsBlock
            key={contentItem.id}
            quizItem={contentItem}
            setChosenAnswerItems={setChosenAnswerItems}
            chosenAnswerItems={chosenAnswerItems}
            unansweredQuestionIds={unansweredQuestionIds}
            setUnansweredQuestionsIds={setUnansweredQuestionsIds}
            ref={refs[contentItem.id]}
          />
        ))}
      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          chosenAnswers={chosenAnswerItems}
          ref={answerRef}
        />
      )}
    </div>
  );
};

export default App;
