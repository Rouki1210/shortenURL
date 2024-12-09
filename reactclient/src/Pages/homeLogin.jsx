import { Button, Input } from "antd";

const HomeLogin = () => {
    return (
        <div>
            <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1 style={{ margin: '13px' }}>Shorten URL</h1>
                <div className="user" style={{margin: '13px' ,border:'1px solid black', borderRadius:'10px' }}>
                    <span style={{ fontSize: '14px' }}>User</span>
                </div>
            </div>

            <div className="shortenURL" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '13%' }}>
                <h1 style={{ fontSize: '40px' }}>Start cooking</h1>
                <Input
                    placeholder="Enter the URL"
                    style={{ marginBottom: '10px', width: '75%', height: '40px' }}
                />
                <Button style={{ width: '75%', height: '40px' }}>Shorten URL</Button>
            </div>
        </div> 
    );
}

export default HomeLogin