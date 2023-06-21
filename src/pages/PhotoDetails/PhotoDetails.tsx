import { useNavigate } from "react-router-dom";

export default function PhotoDetails() {

    const navigate = useNavigate();
  return <div>PhotoDetails
    <button onClick={() => navigate(-1)}>Back</button>
  </div>;
}
