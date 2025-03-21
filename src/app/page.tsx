'use client'

import React from 'react';
import {useState} from "react";
import {useRouter} from "next/navigation";
import {recommendation} from '@/data/resultData';
import Head from 'next/head';

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
        <>
            <Head>
                <meta property="og:title" content="MBTI 해외여행지 추천" />
                <meta property="og:description" content="MBTI에 맞는 해외 여행지 추천" />
                <meta property="og:image" content="https://mbti-to-trip.vercel.app/thumbnail.jpg" />
                <meta property="og:url" content="https://mbti-to-trip.vercel.app" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-[400px] h-[685px] p-4 bg-[url('/background.jpg')] bg-cover bg-center">
                    <main className="flex flex-col gap-8 row-start-2 items-center p-4">
                        <div className="mt-20">
                            <h1 className="text-3xl sm:text-4xl font-bold text-center">
                                내 <span className="text-[#F9F5E6]">MBTI</span>에 어울리는<br/> 해외 여행지는 <br/> 어디일까?
                            </h1>
                        </div>
                        <div className="relative mt-10 w-full max-w-md">
                            <input
                                type="text"
                                value={text.toUpperCase()}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                placeholder="MBTI를 입력하세요. 예) ENFJ"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* 자동완성 리스트 */}
                            {filteredMBTIs.length > 0 && (
                                <ul className="absolute bg-white border rounded-md mt-1 w-full max-h-40 overflow-auto shadow-md z-10">
                                    {filteredMBTIs.map((item) => (
                                        <li
                                            key={item}
                                            onClick={() => handleAutocompleteClick(item)}
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {highlightText(item.toUpperCase(), text)} {/* 하이라이트된 텍스트 */}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {!isExist && <div className="text-red-500">존재하지 않는 MBTI인 것 같아요😿</div>}

                        <div>
                            <button
                                className="px-4 py-2 bg-[#296e9D] text-white rounded hover:bg-[#1B3A4B] cursor-pointer"
                                onClick={handleClickButton}
                            >
                                <span className="text-[#FFFDF3]">내 MBTI와 맞는 해외여행지 보러가기</span>
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
