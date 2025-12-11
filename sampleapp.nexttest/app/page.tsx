"use client"

import clsx from "clsx"
import { useState } from "react"

export default function HomePage()
 {

  async function getUsers(){
    const res = await fetch("http://localhost:5083/api/Users");
    const data  = await res.json();
    console.log(data)
  }

  const [counter, setCounter] = useState<number>(0)

  return(
    <div className="flex flex-col justify-center home">
      <h1 className={clsx(
        'border',
        {
          'bg-gray-100 text-gray-500': counter % 2 === 0,
          'bg-green-500 text-white': counter % 2 !== 0,
        },
      )}>Welcome to the Home Page1</h1>
      <button className={`p-2 ${counter % 2 === 0 ? "active" : "noactive"}`}  onClick={() => setCounter(counter + 1)}>Click Me {counter}</button>
    

      <button className="border hover:bg-green-500" onClick={() => getUsers()}> Получить пользователей</button>

    </div>
  )
}