import "./auth.css";

const Auth = ({ name, onChangeName, onClickAuth }) => {
  return (
    <div className="auth-wrapper">
      <h2 className="auth-title">Enter your name</h2>
      <input className="auth-input" type="text" value={name} onChange={onChangeName} />
      <button className="auth-button" onClick={onClickAuth}>Set</button>
    </div>
  );
};

export default Auth;
