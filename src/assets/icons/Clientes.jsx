import * as React from "react"
export default function Clientes(props){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" 
      width={25} 
      height={25} 
       viewBox="0 0 30 30"
      {...props}>
      
    <path
      stroke="#000"
      d="m11.5 4-1 2 1-2ZM18.5 4l1 2-1-2ZM10.5 13l1 2-1-2ZM19.5 13l-1 2 1-2ZM11.5 19l2.5.5-2.5.5v-1ZM16.5 19l2.5.5-2.5.5v-1ZM6.5 21 5 23.5 4.5 25 4 23.5 6.5 21ZM23.5 21l2.5 3.5h-1L23.5 21Z"
      opacity={0.824}
    />
    <path
      stroke="#000"
      d="M14.5 3 20 6.5l1 4-3.5 4.5-3 1-4.5-3.5-1-4L12.5 4l2-1ZM14.5 19l8 2 2.5 2.5-.5 2.5H5q-.7-3.8 2.5-5l7-2Z"
    />
  </svg>
)

}
