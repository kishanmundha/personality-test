import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import QuestionCotainer from '@/src/components/question';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Question, Result } from '@/src/data/types';
import QuestionService from '@/src/services/question.service';

export default function Home() {
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [showResult, setShowResult] = useState(false);
  const [loadingResult, setLoadingResult] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(13);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    QuestionService.getQuestions().then(questions => {
      setLoadingQuestions(false);
      setQuestions(questions);
      setAnswers(questions.map(() => 4));
    });
  }, []);

  const handleFinish = useCallback(async () => {
    setLoadingResult(true);
    setShowResult(true);

    const result = await QuestionService.getResult(answers);
    setResult(result);
    setLoadingResult(false);
  }, [answers]);

  const content = useMemo(() => {
    if (loadingQuestions) {
      return (
        <LoadingView
          title="Loading questions..."
          message="We are loading questions, please wait."
        />
      );
    }

    if (showResult) {
      if (loadingResult) {
        return (
          <LoadingView
            title="Calculating result..."
            message="We are calculating your result, please wait."
          />
        );
      }

      return <ResultView result={result} />;
    }

    return (
      <QuestionView
        questions={questions}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        answers={answers}
        setAnswers={setAnswers}
        onFinish={handleFinish}
      />
    );
  }, [
    loadingQuestions,
    showResult,
    loadingResult,
    questions,
    questionIndex,
    answers,
    setAnswers,
    handleFinish,
    result,
  ]);

  return (
    <>
      <Head>
        <title>Personality Test</title>
        <meta name="description" content="Personality Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>{content}</main>
    </>
  );
}

interface LoadingViewProps {
  title: string;
  message: string;
}

const LoadingView: React.FC<LoadingViewProps> = props => {
  return (
    <div className={styles.loading}>
      <h3>{props.title}</h3>
      <p>{props.message}</p>
    </div>
  );
};

interface QuestionViewProps {
  questions: Question[];
  questionIndex: number;
  setQuestionIndex: (index: number) => void;
  answers: number[];
  setAnswers: (answers: number[]) => void;
  onFinish: () => void;
}

const QuestionView: React.FC<QuestionViewProps> = ({
  questions,
  questionIndex,
  setQuestionIndex,
  answers,
  setAnswers,
  onFinish,
}) => {
  const question = useMemo(
    () => questions[questionIndex],
    [questions, questionIndex]
  );

  const showPreviousButton = useMemo(() => questionIndex > 0, [questionIndex]);
  const showNextButton = useMemo(
    () => questionIndex < questions.length - 1,
    [questions, questionIndex]
  );
  const showFinishButton = useMemo(
    () => questionIndex === questions.length - 1,
    [questions, questionIndex]
  );

  return (
    <div className={styles.personality_test_container}>
      <h1 className={styles.title}>Personality Test</h1>
      {question && (
        <QuestionCotainer
          question={question}
          selectedAnswer={answers[questionIndex] || 0}
          onChange={answer => {
            const newAnswers = answers.map((a, index) => {
              if (index === questionIndex) {
                return answer.id;
              }
              return a;
            });
            setAnswers(newAnswers);
          }}
        />
      )}

      <div className={styles.buttons}>
        {showPreviousButton && (
          <button
            className={`${styles.button}`}
            onClick={() => {
              if (questionIndex > 0) {
                setQuestionIndex(questionIndex - 1);
              }
            }}
          >
            <span>Previous question </span>
          </button>
        )}
        {showNextButton && (
          <button
            className={`${styles.button}`}
            disabled={!answers[questionIndex]}
            onClick={() => {
              if (questionIndex < questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
              }
            }}
          >
            <span>Next question </span>
          </button>
        )}
        {showFinishButton && (
          <button
            className={`${styles.button}`}
            disabled={!answers[questionIndex]}
            onClick={onFinish}
          >
            <span>Finish test</span>
          </button>
        )}
      </div>
    </div>
  );
};

interface ResultViewProps {
  result: Result | null;
}

const ResultView: React.FC<ResultViewProps> = props => {
  return (
    <div className={styles.result}>
      <h3>Your result</h3>
      <h2>{props.result?.title}</h2>
      <p>{props.result?.description}</p>
    </div>
  );
};
