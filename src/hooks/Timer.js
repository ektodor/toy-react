import { useEffect, useState } from "react";

function useLocaleTimer() {
  const [time, setTime] = useState(new Date().toLocaleString());
  useEffect(() => {
    // 離開頁面 setInterval 不會被清掉，所以有可能重複註冊，所以要記得把它清掉
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleString());
      console.log("useLocaleTimer");
    }, 1000);
    /* 在 useEffect 中使用 return (處理副作用清理 (cleanup))
        在執行下一個 effect 或是 卸載時會觸發    
      */
    return () => clearInterval(intervalId);
  }, []);
  return time;
}

function useLocaleTimeTimer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    // 離開頁面 setInterval 不會被清掉，所以有可能重複註冊，所以要記得把它清掉
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      console.log("useLocaleTimeTimer");
    }, 1000);
    /* 在 useEffect 中使用 return (處理副作用清理 (cleanup))
        在執行下一個 effect 或是 卸載時會觸發    
      */
    return () => clearInterval(intervalId);
  }, []);
  return time;
}

export { useLocaleTimer, useLocaleTimeTimer };
