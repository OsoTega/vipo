'use client'
import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import jwt_decode from 'jwt-decode';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const userProfile = false;

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

    const responseGoogle = () => {
        /*const decode = jwt_decode(response.credential);
        localStorage.setItem('user', JSON.stringify(decode));
        const { name, email, sub, picture } = decode;

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }

        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', { replace: true });
            })*/
    }

    return (
        <div>
            <div
                className='block xl:hidden m-2 ml-4 mt-3 text-xl'
                onClick={() => setShowSidebar((state) => !state)}
            >
                {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div>
            {
                showSidebar && (
                    <div className='xl:w-400 w-20 flex flex-col 
                    justify-normal mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
                        <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                            <Link href="/">
                                <div className={normalLink}>
                                    <p className='text-2xl'>
                                        <AiFillHome />
                                    </p>
                                    <span className='text-xl hidden xl:block'>
                                        For You
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <Discover />
                        <SuggestedAccounts />
                        <Footer />
                    </div>
                )
            }
        </div>
    )
}

export default Sidebar