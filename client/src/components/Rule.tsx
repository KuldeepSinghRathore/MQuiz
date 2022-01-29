import React from "react"
import { Modal } from "./Modal"

export const Rule = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  return (
    <div>
      <button
        className="bg-yellow-400 px-4 py-1 rounded-full  text-black"
        onClick={() => setShowModal(true)}
      >
        Open Modal
      </button>
      {showModal && <Modal closeModal={setShowModal} />}
    </div>
  )
}
