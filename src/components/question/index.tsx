import { questions } from '@/src/data/questions';
import { Answer, Question } from '@/src/data/types';
import styles from './question.module.css';

interface QuestionProps {
  question: Question;
  onChange: (answer: Answer) => void;
  selectedAnswer: number;
}

const answerIndexs = ['A', 'B', 'C', 'D'];

const QuestionCotainer: React.FC<QuestionProps> = ({
  question,
  onChange,
  selectedAnswer,
}) => {
  return (
    <div className={styles.question} id="question-1">
      <span className={styles.question_index} aria-hidden="true">
        Question {question.id}/{questions.length}{' '}
      </span>
      <h3 className={styles.question_text}>{question.title} </h3>

      <div className={styles.question_description}>
        All questions are required{' '}
      </div>
      {question.answers.map((answer, index) => (
        <ul className={styles.answers} key={index}>
          <li key={answer.id} className={styles.answer}>
            <input
              type="radio"
              className={styles.answer_input}
              value={answer.id}
              checked={selectedAnswer === answer.id}
              onChange={() => {
                onChange(answer);
              }}
              id={`question_${question.id}_answer_${answer.id}`}
            />

            <label
              className={styles.answer_label}
              htmlFor={`question_${question.id}_answer_${answer.id}`}
            >
              <span className={styles.answer_index} aria-hidden="true">
                {answerIndexs[index]}{' '}
              </span>

              <span className={styles.answer_text}>{answer.title}</span>
            </label>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default QuestionCotainer;
