import React, { useEffect, useRef, useState } from "react";

export const Counter = ({ target, duration, label }: any) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0;
            const increment = target / (duration / 16);

            const updateCount = () => {
              if (start < target) {
                setCount(Math.ceil(start));
                start += increment;
                requestAnimationFrame(updateCount);
              } else {
                setCount(target);
              }
            };

            updateCount();
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.5 } 
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [target, duration]);

  return (
    <div ref={counterRef} className="text-center">
      <h3 className="text-2xl lg:text-3xl font-bold">
        {target === 99 ? `${count}%` : `+${count}`}
      </h3>
      <p className="text-base lg:text-sm text-gray-300">{label}</p>
    </div>
  );
};