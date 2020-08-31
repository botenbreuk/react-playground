import React, { useState } from 'react';
import Question from './Question';
import QuestionList, { BoxType } from './QuestionList';

export default function Container() {
  const [questions, setQuestions] = useState<BoxType[]>([]);

  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Question name="Glass" />
        <Question name="Banana" />
        <Question name="Paper" />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <QuestionList value={questions} onChange={setQuestions} />
      </div>
    </div>
  );
}
