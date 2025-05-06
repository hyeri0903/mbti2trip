'use client'

import React from 'react';
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {recommendation} from '@/data/resultData';
import Head from 'next/head';
import Footer from './components/Footer';
import { supabase } from '@/lib/supabase';
import type { Provider } from '@supabase/supabase-js';


export default function Home() {
    const [text, setText] = useState("");
    const [isExist, setIsExist] = useState(true);
    const [filteredMBTIs, setFilteredMBTIs] = useState<string[]>([]);
    // const [clickCount, setClickCount] = useState(0);
    const router = useRouter();
    const allMBTIs = recommendation.map(x => x.id)
    const [totalCount, setTotalCount] = useState(0);

    
    useEffect(() => {
        // 페이지 로드시 현재 클릭 수를 가져옴
        getClickCount().then(count => setTotalCount(count));
    }, []);

    const getClickCount = async () => {
        const { count, error } = await supabase
            .from('test_results')
            .select('*', { count: 'exact', head: true });

        if (error || count == null) {
            console.error('Error fetching count:', error);
            return 0;
        }
        return count;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();  // 소문자로 변환
        setText(value);

        const filtered = allMBTIs.filter(x => x.startsWith(value));
        setFilteredMBTIs(filtered);
    }

    async function handleClickButton() {
        setIsExist(true);
        const resultData = recommendation.find(x => x.id === text.toLowerCase());

        if (!resultData) {
            setIsExist(false);
            return;
        }
    

        try {
            // Supabase에 테스트 결과 데이터 저장
            const { error } = await supabase
                .from('test_results')
                .insert([
                    { mbti: text.toLowerCase() }
                ]);
             
            // if (error) {
            //     console.error('Error saving result:', error);
            // } else {
            //     console.log('result saved successfully!');
            // }

            router.push(`/result/${resultData.id}`);
        } catch (error) {
            console.error('Unexpected error:', error);
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
                <title>MBTI에 맞는 해외 여행지 추천</title>
                {/* open graph */}
                <meta name="description" content="MBTI에 맞는 해외 여행지를 추천합니다." />
                <meta property="og:title" content="MBTI에 맞는 해외 여행지 추천"/>
                <meta property="og:description" content="MBTI에 맞는 해외 여행지를 추천합니다."/>
                <meta property="og:image" content="https://mbti-to-trip.vercel.app/airplane.png" />
                <meta property="og:url" content="https://mbti-to-trip.vercel.app"/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="MBTI to Trip"/>
                {/* twitter card */}
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:title" content="MBTI에 맞는 해외 여행지 추천"/>
                <meta name="twitter:description" content="MBTI에 맞는 해외 여행지를 추천합니다."/>
                <meta name="twitter:image" content="https://mbti-to-trip.vercel.app/airplane.png"/>
            </Head>
            <div className="min-h-screen flex flex-col items-center justify-center relative">
                <div className="flex items-center justify-center w-full">
                    <div className="w-[400px] h-[685px] p-4 bg-[url('/background.jpg')] bg-cover bg-center relative">
                        <main className="flex flex-col gap-8 row-start-2 items-center p-4">
                            <div className="mt-20">
                                <h1 className="text-3xl sm:text-4xl font-bold text-center">
                                    내 <span className="text-[#F9F5E6]">MBTI</span>에 어울리는<br/> 해외 여행지는 <br/> 어디일까?
                                </h1>
                            </div>
                            {/* 총 테스트 횟수 표시 */}
                            <div className="text-white text-sm">
                                지금까지 <span className='text-[#FF3B30]'>{totalCount}명</span>이 여행지를 추천받았어요! ✈️
                            </div>
                            <div className="relative mt-5 w-full max-w-md">
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
                <Footer maxWidth="400px"/>
            </div>

        </>
    );
}
