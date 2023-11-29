import React, { useState } from "react";

export default function RandomTopicButton(){
  const [text, setText] = useState(""); // 新しいstateを追加
  const [isLoading, setIsLoading] = useState(false); // ローディング状態のstate

  const handleClick = async () => {
    setIsLoading(true);
    try{
      const apiUrl = process.env.REACT_APP_CF_BACKEND_API_URL;
      const url = `${apiUrl}/api/topics/random`;
      const response = await fetch(url);
      const data = await response.json();
      setText(data[0].body);
    } catch (error) {
      if (error instanceof Error) {
        alert('エラーが発生しました: ' + error.message);
      } else {
        // errorがErrorインスタンスではない場合の処理
        alert('予期せぬエラーが発生しました');
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="container mb-16 flex justify-center flex-col">
      <div className="w-full px-4 mb-10">
        {text && <div className="text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-9xl">{text}</div>}
      </div>

      <div className="flex justify-center">
        <button type="button"
                disabled={isLoading}
                onClick={handleClick} className="py-2.5 px-10 me-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
          {isLoading ? '読み込み中...' : '話題を引く 👻'}
        </button>
      </div>
    </div>
  )
}
