import { useState } from "react";
import "./styles.scss";
import LoginBanner from "../../Assets/Images/LoginBanner.PNG";
import BajajLoginLogo from "../../Assets/Images/BajajLoginLogo.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignin = () => {
    navigate("/dashboard");
    console.log("sign in clicked");
  };
  return (
    <div className="login-container">
      <div className="login-image-container">
        <img
          className="login-image-banner"
          src={LoginBanner}
          alt="bajaj-banner"
        ></img>
      </div>
      <div className="login-details-container">
        <div className="login-page-logo">
          <img src={BajajLoginLogo} alt="login-logo" className="login-logo" />
        </div>
        <div className="login-text">
          <h4>
            <b>Let's Get Started</b>
          </h4>
        </div>
        <div className="email-input-box">
          <input
            type="text"
            placeholder="Email address"
            className="login-input-box"
          />
        </div>
        <div className="passowrd-input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="login-input-box"
          />
          <i onClick={onShowPassword}>
            {showPassword ? (
              <>
                <AiFillEyeInvisible size={20} />
              </>
            ) : (
              <>
                <AiFillEye size={20} />
              </>
            )}
          </i>
          <p className="forgot-password">Forget Password?</p>
        </div>
        <div className="signup-btn" onClick={onSignin}>
          Sign In
        </div>
      </div>
    </div>
  );
};

export default Login;
