'use client'

import React from 'react';
import {useState} from "react";
import { useRouter } from "next/navigation";
import { recommendation } from '@/data/resultData';

export default function Home() {
    const [text, setText] = useState("");
    const [isExist, setIsExist] = useState(true);
    const [filteredMBTIs, setFilteredMBTIs] = useState<string[]>([]);
    const router = useRouter();
    const allMBTIs = recommendation.map(x => x.id)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();  // 소문자로 변환
        setText(value);

        const filtered = allMBTIs.filter(x => x.startsWith(value));
        setFilteredMBTIs(filtered);
    }

    function handleClickButton() {
        setIsExist(true);
        const data = recommendation.find(x => x.id === text.toLowerCase());

        if (data) {
            router.push(`/result/${data.id}`);
        } else {
            setIsExist(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            handleClickButton();
        }
    }

    const handleAutocompleteClick = (mbti: string) => {
        setText(mbti.toLowerCase());
        setFilteredMBTIs([]);  //reset array
        setIsExist(true);
    }

    const highlightText = (text: string, value: string) => {
        const parts = text.split(new RegExp(`(${value})`, 'gi'));  // 입력한 텍스트를 기준으로 분리
        return parts.map((part, index) =>
            part.toLowerCase() === value.toLowerCase()
                ? <span key={index} className="text-blue-500">{part}</span>  // 일치하는 부분은 파란색
                : part
        );
    };

    return (
        <div>
            <main className="flex flex-col gap-8 row-start-2 items-center">
                <div className="mt-20">
                    <h1 className="text-4xl font-bold">내 MBTI에 어울리는 해외여행지는 어디일까?</h1>
                </div>
                <div className="mt-10">
                    <input
                        type="text"
                        value={text.toUpperCase()}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="MBTI를 입력하세요. 예) ENFJ"
                        className="w-[300px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {filteredMBTIs.length > 0 && (
                        <ul className="absolute bg-white border rounded-md mt-1 w-[300px] max-h-40 overflow-auto shadow-md">
                            {filteredMBTIs.map((item) => (
                                <li
                                    key={item}
                                    onClick={() => handleAutocompleteClick(item)}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {highlightText(item.toUpperCase(), text)}  {/* 하이라이트된 텍스트 */}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    { !isExist && <div>존재하지 않는 MBTI인 것 같아요😿</div>}
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
