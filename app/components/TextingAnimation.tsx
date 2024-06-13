"use client";
import React, { useState, useEffect } from "react";

interface ChatAnimationProps {
  text: string;
  initialTimeout: number;
}

const ChatAnimation = ({ text, initialTimeout }: ChatAnimationProps) => {
  const [streamedText, setStreamedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        setStreamedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        console.log(streamedText);
        if (currentIndex === text.length) {
          clearInterval(interval);
        }
      }, 50);
    }, initialTimeout);
  }, [text, initialTimeout]);

  return <div className="max-w-[310px] w-full">{streamedText}</div>;
};

export default ChatAnimation;
