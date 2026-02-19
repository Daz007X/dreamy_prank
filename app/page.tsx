"use client"; // 1. จำเป็นต้องมี เพราะใช้ navigator, document, window

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // 2. ฟังก์ชัน Lock Keyboard
  const lockKeyboard = async () => {
    try {
      // เช็คก่อนว่าเบราว์เซอร์รองรับไหม
      if ("keyboard" in navigator) {
        await (navigator as any).keyboard.lock(["Escape"]);
        console.log("Esc ถูก lock แล้ว");
      }
    } catch (err) {
      console.log("ไม่รองรับ Keyboard Lock API หรือไม่ได้Fullscreen");
    }
  };

  // 3. ฟังก์ชัน Unlock Keyboard
  const unlockKeyboard = async () => {
    try {
      if ("keyboard" in navigator) {
        await (navigator as any).keyboard.unlock();
      }
    } catch (err) {
      console.error("Unlock failed", err);
    }
  };

  // 4. Handle การคลิกเริ่ม
  const handleStart = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
      setIsPlaying(true);
      setShowOverlay(false);

      // Request Fullscreen
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to enable full-screen mode:", err);
      // Fallback ถ้า fullscreen ไม่ทำงาน ก็ให้เล่นวิดีโอต่อไป
      setShowOverlay(false);
    }
  };

  // 5. ใช้ useEffect เพื่อจัดการ Event Listener แบบ React
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        lockKeyboard();
      } else {
        unlockKeyboard();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Cleanup: ลบ event listener เมื่อ component หายไป
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      unlockKeyboard(); // ปลดล็อคเมื่อออกจากหน้า
    };
  }, []);

  return (
    <div>
      {/* Video Element */}
      <video
        ref={videoRef} // 6. ใช้ ref แทน getElementById
        muted
        playsInline
        loop
      >
        {/* 7. แก้ Path ให้เป็น Relative Path ใน public folder */}
        <source src="/Dreamybull.mp4" type="video/mp4" />
        Browser ของคุณไม่รองรับวิดีโอ
      </video>

      {/* Overlay */}
      {showOverlay && (
        <div
          id="start-overlay"
          onClick={handleStart}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black text-white transition-opacity hover:bg-black"
        >
          <div className="text-lg opacity-70">คลิกที่หน้าจอเพื่อเริ่ม</div>
        </div>
      )}
    </div>
  );
}
