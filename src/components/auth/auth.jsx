import "./auth.css";

const Auth = ({ name, onChangeName, onClickAuth, gamerName, onClickYes }) => {
  return (
    <div className="auth-wrapper">
      {gamerName && 
      <>
        <h3 className="auth-text">Do you want to continue with name "{gamerName}"?</h3>
        <button className="auth-button" onClick={onClickYes}>Yes</button>
        <p className="auth-text-else">ELSE</p>
      </>
      }
      <h2 className="auth-text">Enter your name</h2>
      <input className="auth-input" type="text" value={name} onChange={onChangeName} placeholder='Click here' />
      <button className="auth-button" onClick={onClickAuth}>Set</button>
    </div>
  );
};

export default Auth;
