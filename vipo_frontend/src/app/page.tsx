'use client'
import axios from 'axios'
import Image from 'next/image'
import { Video } from '@/utils/types';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { CirclesWithBar } from 'react-loader-spinner';
import { BASE_URL } from '@/utils';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

async function getData(topic: string) {
  if (topic) {
    const { data } = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    return data;
  } else {
    const { data } = await axios.get(`${BASE_URL}/api/post`);
    return data;
  }
}

/*interface IProps {
  videos: Video
}*/
export default function Home() {
  const params = useSearchParams();
  const topic: any = params.get('topic');
  console.log(topic);

  const [videos, setVideos]: any = useState(null);

  getData(topic).then((data) => {
    setVideos(data);
  })
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos === null ? (
        <div className="flex w-full h-full justify-center items-center">
          <CirclesWithBar />
        </div>
      ) : (videos?.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={'No Videos'} comments={false} />
      ))}
    </div>
  )
}
