import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function HomeBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(
      () => setImage((prevImage) => (prevImage >= 6 ? 1 : prevImage + 1)),
      10000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[680px] relative bg-cover bg-black">
      <div className="absolute top-0 right-0 w-full h-full transition-opacity z-0">
        {Array.from({ length: 6 }, (_, index) => (
          <Image
            key={index + 1}
            alt={`hero-${index + 1}`}
            src={`/bg-hero${index + 1}.webp`}
            fill
            className={`${
              image === index + 1 ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
          />
        ))}
      </div>
      <div className="z-10 relative max-w-3xl flex flex-col justify-center h-full gap-6 px-10 md:px-20"></div>
    </div>
  );
}

export default HomeBanner;
