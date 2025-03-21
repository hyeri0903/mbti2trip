'use client';

import React from 'react'
import {useRouter, useParams} from "next/navigation";
import {recommendation, countries} from "@/data/resultData";
import html2canvas from 'html2canvas';

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

    function handleDownloadImage(result: string) {
        const element= document.getElementById('capture'); //캡처할 요소 선택

        if (element) {
            html2canvas(element)
                .then(canvas => {
                const link = document.createElement("a");
                link.download = result + '-result.png';  //이미지 파일 이름
                link.href = canvas.toDataURL();  //데이터 URL로 이미지 변환
                link.click();  // download link 클릭
            })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[400px] h-[685px] p-4 bg-white" id={"capture"}>
                <main className="flex flex-col gap-8 row-start-2 items-center p-4">
                    <div className="mt-5">
                        <h1 className="text-3xl font-bold text-center">
                            <span className="text-[#6DAEDB]">{params.id.toUpperCase()}</span>
                            에게 꼭 맞는<br />
                            해외여행지는?
                        </h1>
                    </div>
                    <div className="flex flex-col items-center justify-center"> {/* flex로 수직 정렬 */}
                        <h2 className="text-4xl font-bold">{countryData?.country}</h2>
                        <span className="text-6xl mt-2">{countryData?.emoji}</span> {/* emoji 아래에 margin 추가 */}
                    </div>
                    <div className="whitespace-pre-wrap text-center mt-4"> {/* emoji와 content 사이에 margin 추가 */}
                        {countryData?.content}
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-[#296e9D] text-white rounded hover:bg-[#1B3A4B]  cursor-pointer"
                                onClick={() => handleDownloadImage(params.id.toUpperCase())}
                        >
                            이미지로 저장하기
                        </button> <br />
                        <button className="mt-5 px-4 py-2 bg-[#296e9D] text-white rounded hover:bg-[#1B3A4B]  cursor-pointer"
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
