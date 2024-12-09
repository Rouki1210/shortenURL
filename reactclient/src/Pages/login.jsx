import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5', // Light background for the page
        }}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                    maxWidth: 600,
                    padding: '20px', // Increased padding for more spacing
                    border: '1px solid #d9d9d9',
                    borderRadius: '12px', // Rounded corners
                    backgroundColor: '#ffffff', // White background for the form
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Animation for hover effect
                }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <h2 style={{fontSize:'30px' ,textAlign: 'center', marginBottom: '30px', color: '#1890ff' }}>Login</h2>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Enter your username" style={{ padding: '12px', marginBottom:'-4px' }} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" style={{ padding: '12px', marginBottom:'-4px' }} />
                </Form.Item>

                <Form.Item label={null}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            height: '40px',
                            padding: '12px', // Add padding for button
                            fontSize: '16px', // Larger font for the button text
                            backgroundColor: '#1890ff', // Primary color for the button
                            borderRadius: '8px', // Rounded button edges
                            border: 'none', // Remove button border
                            transition: 'background-color 0.3s ease', // Smooth hover effect
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#40a9ff'} // Hover effect
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'} // Hover effect
                    >
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item label={null}>
                    <Link to="/Register">
                        <Button
                            type="default"
                            style={{
                                width: '100%',
                                color: 'white',
                                height: '40px',
                                padding: '12px', // Add padding for button
                                fontSize: '16px', // Larger font for the button text
                                backgroundColor: '#1890ff', // Primary color for the button
                                borderRadius: '8px', // Rounded button edges
                                border: 'none', // Remove button border
                                transition: 'background-color 0.3s ease', // Smooth hover effect
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#40a9ff'} // Hover effect
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'} // Hover effect
                        >
                        Register
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
