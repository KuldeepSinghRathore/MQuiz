import { CategoryCard } from "components/CategoryCard"
import { Modal } from "components/Modal"
import { useStateContext } from "context/StateProvider"
import React from "react"

export const CategoryPage = () => {
  const { state, dispatch } = useStateContext()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  //   const navigate = useNavigate()
  return (
    <div className="bg-black min-w-full  flex item min-h-screen md:px-10 items-center">
      {showModal && <Modal closeModal={setShowModal} />}
      <div className="flex gap-8 items-center justify-center h-full w-full p-5 flex-wrap">
        {state?.quizData?.map((category) => {
          return (
            <div
              className="flex border-2 border-yellow-400 rounded-lg min-w-[330px] "
              key={category._id}
              onClick={() => {
                dispatch({ type: "SET_CURRENT_CATEGORY", payload: category })
                state.currentCategory && setShowModal(true)
                //   navigate(`quiz`)
              }}
            >
              <CategoryCard key={category._id} {...category} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
