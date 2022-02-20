import React from "react"
import { Quiz } from "types/types"

export const CategoryCard = (category: Quiz) => (
  <div className="cursor-pointer">
    <img src={category.image} className="object-contain  flex-1" alt="" />
    <div className="flex-1 py-4 bg-yellow-300 text-center">
      <h3 className="font-bold">{category.topic}</h3>
      <p className="capitalize font-normal">{category.description}</p>
    </div>
  </div>
)
