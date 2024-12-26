import React from 'react'
import { Link } from 'react-router-dom'

export default function categoryRow() {
    const provincia="Cabo delgado"

  return (
    <div className="p-4 flex gap-3">
          <CategoriesDropdown/>

          <div className="hover:bg-white/50 rounded-full flex items-center justify-center w-[230px]">
            <label className="font-extrabold text-gray-600">Melhores Boladas</label>
          </div>
          <Link to={`/p/${provincia}`}>
            <div className="hover:bg-white/50 rounded-full flex items-center justify-center w-[230px] gap-2">
                <FiMapPin/>
                <label className="font-extrabold text-gray-600">Da Sua Provincia</label>
            </div>
          </Link>
    </div>
  )
}
