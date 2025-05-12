import { useNavigate, Link } from "react-router-dom";
import "./HomePage.css"; // Import CSS file

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="HomePage">
      <h1 className="HomePage-title">Welcome</h1>

      {/* Button to navigate to user registration */}
      <button
        className="HomePage-btn HomePage-user-btn"
        onClick={() => navigate("/signup")}
      >
        User
      </button>

      {/* Button to navigate to admin page */}
      <button
        className="HomePage-btn HomePage-admin-btn"
        onClick={() => navigate("/admin")}
      >
        Admin
      </button>
    </div>
  );
}

export default HomePage; // Default export
