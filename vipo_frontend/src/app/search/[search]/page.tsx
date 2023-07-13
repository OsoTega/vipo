'use client'
import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { Video, IUser } from '@/utils/types';
import { BASE_URL } from "@/utils";
import Link from "next/link";
import useAuthStore from "@/store/authStore";

async function getData(search: any) {
    const { data } = await axios.get(`${BASE_URL}/api/search/${search}`);
    return data;
}

export default function Search() {
    const params = useParams();
    const search = params.search;

    const [user, setUser]: any = useState(null);
    const [showAccounts, setShowAccounts] = useState(true);
    const [videosList, setVideosList] = useState<Video[]>([]);
    const accounts = showAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const videos = !showAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const { allUsers }: any = useAuthStore();

    const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(search.toLowerCase()))

    getData(search).then((data) => {
        setVideosList(data);
    })

    return (
        <div className="w-full">
            <div className="flex gap-10 mb-10 mt-10 border-b-2
                 border-gray-200 bg-white w-full">
                <p className={`text-xl font-semibold 
                    cursor-pointer mt-2 ${accounts}`}
                    onClick={() => setShowAccounts(true)}
                >
                    Accounts
                </p>
                <p className={`text-xl font-semibold 
                    cursor-pointer mt-2 ${videos}`}
                    onClick={() => setShowAccounts(false)}
                >
                    Videos
                </p>
            </div>
            {showAccounts ? (
                <div className="md:mt-16">
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: IUser, index: number) => (
                            <Link
                                href={`/profile/${user._id}`}
                                key={index}
                            >
                                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded 
                                border-b-2 border-gray-200'>
                                    <div>
                                        <Image
                                            src={user.image}
                                            width={50}
                                            height={50}
                                            alt='user profile'
                                            className='rounded-full'
                                        />
                                    </div>
                                    <div className='hidden xl:block'>
                                        <p className='flex gap-1 items-center text-md 
                                                font-bold text-primary lowercase'>
                                            {user.userName.replaceAll(' ', '')}
                                            <GoVerified className='text-blue-400' />
                                        </p>
                                        <p className='capitalize text-gray-400'>
                                            {user.userName}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : <NoResults text={`No account for ${search}`} comments={false} />}
                </div>
            ) : (
                <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                    {videosList?.length ? (
                        videosList?.map((video: Video, index: number) => (
                            <VideoCard post={video} key={index} />
                        ))
                    ) : <NoResults text={`No video for ${search}`} comments={false} />}
                </div>
            )}
        </div>
    )
}