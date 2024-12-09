import { Button, Input } from "antd";
import {Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div>
            <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1 style={{ margin: '13px' }}>Shorten URL</h1>
                <div className="authButton" style={{ display: 'flex', margin: '13px' }}>
                    <Link to="/Login">
                        <Button type="primary" style={{ display: 'flex', marginRight: '10px' }}>Login</Button>
                    </Link>
                    <Link to="/Register">
                        <Button>Register</Button>
                    </Link>
                </div>
            </div>
            
            <div className="shortenURL" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '13%' }}>
                <h1 style={{ fontSize:'40px' }}>Start cooking</h1>
                <Input
                    placeholder="Enter the URL"
                    style={{ marginBottom: '10px', width: '75%', height: '40px' }}
                />
                <Link to="/Login">
                    <Button type="primary" style={{ width: '600px', height: '40px', fontSize:'16px' }}>Shorten URL</Button>
                </Link> 
            </div>
        </div> 
    );
}

export default HomePage