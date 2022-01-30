import { useAuthContext } from "context/AuthProvider"
// import { ReactElement } from "react"
import { Navigate, useLocation } from "react-router-dom"

// export function PrivateRoutes({ path, ...props }: PrivateRouteType) {

//   return token ? (
//     <Route path={path} {...props} />
//   ) : (
//     <Navigate replace to="/login" state={{ from: path }} />
//   )
// }
export const PrivateRoutes = ({ children }: any) => {
  const { token } = useAuthContext()
  let location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}
