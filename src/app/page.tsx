'use client'

import React from 'react';
import {useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { recommendation } from '@/data/recommendation';

export default function Home() {
    const [text, setText] = useState("");
    const [isExist, setIsExist] = useState(true);
    const router = useRouter();

    const handleChange = (e) => {
        setText(e.target.value);
    }

    function handleClickButton() {
        console.log(text);
        setIsExist(true);
        const data = recommendation.find(x => x.id === text.toLowerCase());

        if (data) {
            console.log(data);
            router.push(`/result/${data.id}`);
        } else {
            setIsExist(false);
        }
    }

    return (
        <div>
            <main className="flex flex-col gap-8 row-start-2 items-center">
                <div className="mt-20">
                    <h1 className="text-4xl font-bold">내 MBTI에 어울리는 해외여행지는 어디일까?</h1>
                </div>
                <div className="mt-10">
                    <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                        placeholder="MBTI를 입력하세요. 예) ENFJ"
                        className="w-[300px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>
                <div>
                    {text}
                </div>
                <div>
                    { !isExist && <div>존재하지 않는 MBTI인 것 같네요😿</div>}
                </div>
                <div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                            onClick={()=> handleClickButton()}
                    >
                        내 MBTI와 맞는 해외여행지 보러가기
                    </button>
                </div>

            </main>
        </div>
    );
}
