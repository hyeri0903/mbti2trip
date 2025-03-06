'use client';

import React from 'react'
import {useState} from "react";
import { useRouter, useParams } from "next/navigation";
import { recommendation } from "@/data/recommendation";

//reference for recommendation trip by MBTI
//https://blog.naver.com/eurof153/223766194381

export default function Result() {
    const router = useRouter();
    const params = useParams<{ id: string}>()
    const resultData = recommendation.find((item) => item.id === params.id)

    return (
        <div>
            <main className="flex flex-col gap-8 row-start-2 items-center">
                <div className="mt-20">
                    <h1 className="text-3xl font-bold">{params.id.toUpperCase()} 에게 꼭 맞는 해외여행지는?</h1>
                </div>
                <div>
                    <h2 className="text-4xl font-bold">{resultData?.country}</h2>
                </div>
            </main>

        </div>
    )
}
