import { useSelector , useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector (state => state.auth);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

    }, [user])
  return (
    <div>
        <h1 className="heading center">DashBoard</h1>
    </div>
  )
}

export default Dashboard