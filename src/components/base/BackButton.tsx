"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import backIcon from '../../images/Back.svg';

interface BackButtonProps {
    label?: string;
    className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = "Back", className = "adventure-detail-back-nav dark" }) => {
  const router = useRouter();
  
  return (
    <button className={className} onClick={() => router.back()}>
        <img className="Backbutton-icon" src={backIcon.src || backIcon} alt="Return"/> {label}
    </button>
  );
}

export default BackButton;
