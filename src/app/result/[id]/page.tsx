'use client';

import React from 'react'
import {useRouter, useParams} from "next/navigation";
import {recommendation, countries} from "@/data/resultData";

//reference for recommendation trip by MBTI
//https://blog.naver.com/eurof153/223766194381

export default function Result() {
    const router = useRouter();
    const params = useParams<{ id: string }>()
    const recommendData = recommendation.find((item) => item.id === params.id)
    const countryData = countries.find((item) => item.country === recommendData?.country)

    function handleClickButton() {
        router.push('/')
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[400px] h-[685px] p-4 bg-white">
                <main className="flex flex-col gap-8 row-start-2 items-center p-4">
                    <div className="mt-5">
                        <h1 className="text-3xl font-bold text-center">
                            <span className="text-[#6DAEDB]">{params.id.toUpperCase()}</span>
                            에게 꼭 맞는<br />
                            해외여행지는?
                        </h1>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold">{countryData?.country}</h2>
                    </div>
                    <div>
                        <span className="text-6xl">{countryData?.emoji}</span>
                    </div>
                    <div className="whitespace-pre-wrap text-center">
                        {countryData?.content}
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-[#296e9D] text-white rounded hover:bg-[#1B3A4B]  cursor-pointer"
                                onClick={() => handleClickButton()}
                        >
                            메인으로 돌아가기
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}
