import { questions } from '../data/questions';
import { results } from '../data/results';
import { getResultId } from '../data/utils';

class QuestionServiceFactor {
  async getQuestions() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return questions;
  }

  async getResult(answerIds: number[]) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resultId = getResultId(answerIds);
    return results.find(x => x.id === resultId) || null;
  }
}

const QuestionService = new QuestionServiceFactor();

export default QuestionService;
