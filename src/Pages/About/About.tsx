import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { getSystemInfo } from "../../Services/SystemService";
import './About.scss';

export default function About() {
    const [systemInfo, setSystemInfo] = useState<any>();

    useEffect(() => {
        getSystemInfo()
            .then((response) => {
                setSystemInfo(response);
            });
    })

    return (
        <Layout>
            <div className="aboutPage">
                <Card title='About'>
                    <div className="description">
                        <p>Our IAM (Identity and Access Management) system, coupled with OAuth 2.0, ensures secure user authentication and access control.</p>
                        <strong><p>How It Works:</p></strong>
                        <ol>
                            <li><strong>Authentication:</strong> IAM verifies user identities.</li>
                            <li><strong>Authorization:</strong> OAuth 2.0 grants limited access to resources without password sharing.</li>
                            <li><strong>Token-based Security:</strong> Temporary access tokens authenticate requests, enhancing security.</li>
                        </ol>
                    </div>

                    {systemInfo && (
                        <div className="systemInfo">
                            <p>System Version: {systemInfo.version}</p>
                        </div>
                    )}
                </Card>
            </div>
        </Layout>
    )
}