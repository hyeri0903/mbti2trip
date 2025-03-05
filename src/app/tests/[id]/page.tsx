
'use client';

import React from "react";
import { useRouter, useParams } from 'next/navigation';

const questions = [
  { id: 1, question: "당신은 새로운 사람들과 쉽게 어울리나요?", options: ["예", "아니요"] },
  { id: 2, question: "계획적인 것을 좋아하시나요?", options: ["예", "아니요"] },
  { id: 3, question: "감정보다 논리를 우선하나요?", options: ["예", "아니요"] },
];

export default function TestPage(props: any) {
  const router = useRouter();
  const questionIndex = parseInt(props.params.id)-1
  const isLastQuestion = questionIndex === questions.length - 1;

  // 배열 범위를 벗어나면 에러 방지
  if (questionIndex < 0 || questionIndex >= questions.length) {
    return <h1>존재하지 않는 질문입니다.</h1>;
  }

  function handleAnswer(answer: number) {
    console.log('Answer: ' + answer);

    if (isLastQuestion) {
      router.push("/result"); // 마지막 질문이라면 결과 페이지로 이동
    } else {
      router.push(`/tests/${questionIndex + 2}`); // 다음 질문으로 이동
    }
  }

  return (
    <>
      <h1>TEST PAGE</h1>
      <div>ID: {props.params.id}</div>
      <div>Question Index: {questionIndex}</div>

      <div>{questions[questionIndex].question}</div>
      <div>
        {questions[questionIndex].options.map((option, index) => (
          <div key={index}>
            <button onClick={() => handleAnswer(index)}>
              {option}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
