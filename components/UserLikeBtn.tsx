"use client"
import React, {useEffect, useState, useTransition} from 'react'
import Image from "next/image"


interface Props {
  projectId: string;
  userId: string 
  likedProjectIds: string[];
  likeBtnHandler : (userId: string, projectId: string, isLiked: boolean,likedProjectIds: string[]) => Promise<void>
}

const UserLikeBtn = ({projectId, userId, likedProjectIds, likeBtnHandler}: Props) => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    const userLiked = likedProjectIds.includes(projectId);
    const [isLiked, setIsLiked] = useState(userLiked);  //for animation 
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      if (animate) {
          // Reset animation state after it's done
          const timeoutId = setTimeout(() => {
              setAnimate(false);
          }, 2000); // Duration of your animation
          return () => clearTimeout(timeoutId);
      }
  }, [animate]);
  const animationClass = animate ? (isLiked ? 'heart-fill-animation' : 'heart-unfill-animation') : (isLiked ? 'liked' : '');

  return (
    <>
      <button className="flexCenter btn" type='button' 
        onClick={() => {
          setAnimate(true);
          setIsLiked(!isLiked);
          setSuccess(false);
          startTransition(async () => {
            await likeBtnHandler(userId, projectId, userLiked, likedProjectIds);
            setSuccess(true);
          });
        }}>
        {/* <Image src="/heart.svg" width={20} height={20} alt="like" /> */}
        <svg className={`${animationClass}`} width="3em" height="3em" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
          <path  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#1C274C"/>
        </svg>
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {/* {!isPending && success && (
        <span className="text-success">Liked</span>
      )} */}
    </>
  )
}
export default UserLikeBtn