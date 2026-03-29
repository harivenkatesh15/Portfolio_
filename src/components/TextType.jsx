import React, { useState, useEffect } from 'react';
import './TextType.css';

const TextType = ({ 
  text = [], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 2000 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    let timer;
    
    // Current sentence index
    const i = loopNum % text.length;
    const fullText = text[i];

    const handleTyping = () => {
      setDisplayedText(prev => 
        isDeleting 
          ? fullText.substring(0, prev.length - 1) 
          : fullText.substring(0, prev.length + 1)
      );

      // Determine typing speed (Humanize it slightly)
      let nextSpeed = isDeleting ? deletingSpeed : typingSpeed;
      
      // Randomize slightly for "human" feel if typing
      if (!isDeleting) {
        nextSpeed += Math.random() * 50 - 25; 
      }

      setTypingSpeedState(nextSpeed);

      // LOGIC: Finished Typing
      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } 
      // LOGIC: Finished Deleting
      else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(handleTyping, typingSpeedState);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="text-type-wrapper">
      <span>{displayedText}</span>
      <span className={`text-type-cursor ${!isDeleting && displayedText !== text[loopNum % text.length] ? 'typing' : ''}`} />
    </span>
  );
};

export default TextType;