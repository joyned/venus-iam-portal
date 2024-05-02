import { useEffect, useState } from 'react';
import './IAMLogin.scss';
import { useSearchParams } from 'react-router-dom';

export default function IAMLogin() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error] = useState("");

    useEffect(() => {
        const clientId = searchParams.get("clientId");
        const clientSecret = searchParams.get("clientSecret");
        console.log(clientId, clientSecret);
    })

    const login = async () => {
    };

    return (
        <div className="IAMLogin">
            <div className="IAMLogin__container">
                <h1 className="IAMLogin__title">Login</h1>
                <input
                    className="IAMLogin__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="IAMLogin__input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="IAMLogin__button" onClick={login}>
                    Login
                </button>
                <p className="IAMLogin__error">{error}</p>
            </div>
        </div>
    );
}