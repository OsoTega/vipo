'use client'
import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { Video, IUser } from '@/utils/types';
import { BASE_URL } from "@/utils";
import { CirclesWithBar } from 'react-loader-spinner';

async function getData(id: any) {
    const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);
    return data;
}

interface IProps {
    data: {
        user: IUser,
        userVideosData: Video[],
        userLikedData: Video[]
    }
}

export default function Profile() {
    const params = useParams();
    const id = params.id;
    var likedVideos: Video[] = [];
    var userVideos: Video[] = [];
    const [user, setUser]: any = useState(null);
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videosList, setVideosList] = useState<Video[]>();
    const [addedImage, setAddedImage] = useState(false);
    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
    getData(id).then((data) => {
        const { user, userVideosData, userLikedData } = data;
        setUser(user);
        likedVideos = userLikedData;
        userVideos = userVideosData;
        setAddedImage(true);
        setVideosList(userVideos);
    })

    useEffect(() => {
        if ((userVideos.length > 0) || (likedVideos.length > 0)) {
            if (showUserVideos) {
                setVideosList(userVideos);
            } else {
                setVideosList(likedVideos);
            }
        }
    }, [showUserVideos, userVideos, likedVideos])
    return (
        <div className="w-full">
            <div className="flex gap-6 mg:gap-10 mb-4 bg-white w-full">
                <div className='w-16 h-16 md:w-32 md:h-32'>
                    <Image
                        src={user?.image}
                        width={120}
                        height={120}
                        alt='user profile'
                        className='rounded-full'
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <p className='md:text-2xl tracking-wider flex gap-1 items-center
                     justify-center text-md 
                                font-bold text-primary lowercase'>
                        {user?.userName.replaceAll(' ', '')}
                        <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize md:text-xl text-gray-400'>
                        {user?.userName}
                    </p>
                </div>
            </div>
            <div>
                <div className="flex gap-10 mb-10 mt-10 border-b-2
                 border-gray-200 bg-white w-full">
                    <p className={`text-xl font-semibold 
                    cursor-pointer mt-2 ${videos}`}
                        onClick={() => setShowUserVideos(true)}
                    >
                        Videos
                    </p>
                    <p className={`text-xl font-semibold 
                    cursor-pointer mt-2 ${liked}`}
                        onClick={() => setShowUserVideos(false)}
                    >
                        Liked
                    </p>
                </div>
                <div className="flex gap-6 flex-wrap md:justify-start">
                    {!addedImage ? (
                        <div className="flex w-full h-full justify-center items-center">
                            <CirclesWithBar />
                        </div>
                    ) : (videosList?.length > 0 ? (
                        videosList?.map((video: Video, index: number) => (
                            <VideoCard post={video} key={index} />
                        ))
                    ) : <NoResults text={`No ${showUserVideos ? 'Posted Video' : 'Liked Video'}`} comments={false} />)}
                </div>
            </div>
        </div>
    )
}