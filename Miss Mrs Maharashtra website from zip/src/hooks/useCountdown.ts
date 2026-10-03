import { useEffect, useState } from "react";

const target = new Date("2026-11-18T09:00:00+05:30").getTime();

export function useCountdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return [
    { v: String(days), l: "Days" },
    { v: String(hours).padStart(2, "0"), l: "Hours" },
    { v: String(minutes).padStart(2, "0"), l: "Minutes" },
    { v: String(seconds).padStart(2, "0"), l: "Seconds" },
  ];
}
