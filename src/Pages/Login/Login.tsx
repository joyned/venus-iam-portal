import './Login.scss';

export default function Login() {
    return (
        <div className="loginPage">
            <div className="mainContent">
                <div className="panel">
                    <form className="panelContent">
                        <h1>Venus IAM Portal</h1>
                        <span>Username</span>
                        <input></input>
                        <span>Password</span>
                        <input></input>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}