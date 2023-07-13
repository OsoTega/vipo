'use client'
import { CirclesWithBar } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <CirclesWithBar />
        </div>
    );
}