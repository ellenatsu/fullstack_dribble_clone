"use client"
import { useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({children} : {children: ReactNode}) => {
  const overlay = useRef<HTMLDivElement>(null); 
  const wrapper = useRef<HTMLDivElement>(null); 
  const router = useRouter();

  const handleClick = () => {}
  const onDismiss = () => {}

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button type="button" onClick={onDismiss} className="absolute top-4 right-8">
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Modal
