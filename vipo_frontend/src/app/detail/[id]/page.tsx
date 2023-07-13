'use client'
import Comments from '@/components/Comments';
import LikeButton from '@/components/LikeButton';
import useAuthStore from '@/store/authStore';
import { BASE_URL } from '@/utils';
import { Video } from '@/utils/types';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { MdOutlineCancel } from 'react-icons/md';
import { CirclesWithBar } from 'react-loader-spinner';

async function getData(id: any) {
    const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
    return data;
}

export default function Detail() {
    const params = useParams();
    const id = params.id;
    var video: Video;
    const [post, setPost]: any = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(false)
    const [comment, setComment] = useState("");
    const [isPostingComment, setIsPostingComment] = useState(false);
    const router = useRouter();
    const { userProfile }: any = useAuthStore();

    useEffect(() => {
        if (post && videoRef?.current) {
            videoRef.current.muted = volume;
        }
    }, [post, volume])

    const videoRef = useRef<HTMLVideoElement>(null);
    getData(id).then((video) => {
        setPost(video);
    });


    const onVideoClick = () => {
        if (isPlaying) {
            videoRef?.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef?.current?.play();
            setIsPlaying(true);
        }
    }

    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const { data } = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post?._id,
                like
            });
            setPost({ ...post, likes: data.likes });
        }
    }

    const addComment = async (e: any) => {
        e.preventDefault();
        if (userProfile && comment) {
            setIsPostingComment(true);
            const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                userId: userProfile._id,
                comment
            });
            setPost({ ...post, comments: data.comments });
            setComment('');
            setIsPostingComment(false);
        }
    }

    if (!post) return (<div className="flex w-full h-full justify-center items-center">
        <CirclesWithBar />
    </div>);
    return (
        <div className='flex w-full absolute left-0 top-0
         bg-white flex-wrap lg:flex-nowrap'>
            <div className='relative flex-2 w-[1000px] 
            lg:w-9/12 flex justify-center items-center bg-blurred-img
            bg-no-repeat bg-cover bg-center'>
                <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                    <p className='cursor-pointer' onClick={() => router.back()}>
                        <MdOutlineCancel className='text-white text-[35px]' />
                    </p>
                </div>
                <div className='relative'>
                    <div className='lg:h-[100vh] h-[60vh]'>
                        <video
                            ref={videoRef}
                            loop
                            className='h-full cursor-pointer'
                            onClick={onVideoClick}
                            src={post.video.asset.url}
                        ></video>
                    </div>
                    <div className='absolute top-[45%] left-[45%] cursor-pointer'>
                        {!isPlaying && (
                            <button
                                type='button'
                                onClick={onVideoClick}
                            >
                                <BsFillPlayFill className='text-white
                                text-6xl lg:text-8xl' />
                            </button>
                        )}
                    </div>
                </div>
                <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
                    {volume ? (
                        <button
                            type='button'
                            onClick={() => setVolume((state) => !state)}
                        >
                            <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                        </button>
                    ) : (
                        <button
                            type='button'
                            onClick={() => setVolume((state) => !state)}
                        >
                            <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                        </button>
                    )}
                </div>
            </div>
            <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
                <div className='lg:mt-20 mt-10'>

                    <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                        <div
                            className='ml-4 md:w-20 md:h-20 w-16 h-16'
                        >
                            <Link href="/">
                                <>
                                    <Image
                                        width={62}
                                        height={62}
                                        className='rounded-full'
                                        src={post.postedBy.image}
                                        alt="profile-image"
                                    />
                                </>
                            </Link>
                        </div>
                        <div>
                            <Link href="/">
                                <div className='mt-3 flex flex-col gap-2'>
                                    <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                                        {post.postedBy.userName}{`
                                    `}
                                        <GoVerified className='text-blue-400 text-md' />
                                    </p>
                                    <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                        {post.postedBy.userName}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <p className='px-10 text-lg text-gray-600'>
                        {post.caption}
                    </p>
                    <div className='mt-10 px-10'>
                        {userProfile && (
                            <LikeButton
                                Likes={post.likes}
                                handleLike={() => handleLike(true)}
                                handleDislike={() => handleLike(false)}
                            />
                        )}
                    </div>
                    <Comments
                        comment={comment}
                        setComment={setComment}
                        addComment={addComment}
                        comments={post.comments}
                        isPostingComment={isPostingComment}
                    />
                </div>
            </div>
        </div>
    )
}