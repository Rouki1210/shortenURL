import { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [form] = Form.useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        const { username, password } = values;

        try {
            const response = await fetch('https://localhost:7136/api/Users/login', {    
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed, please try again');
            }

            const data = await response.json();
            if (data.userID) {
                localStorage.setItem('token', data.userID);
                alert('Login successful! Your userID is: ' + localStorage.getItem('token'));
                navigate('/shortenPage');
            } else {
                setError('Login failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred, please try again');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5', // Light background for the page
            }}
        >
            <Form
                form={form}
                name="loginForm"
                layout="vertical"
                onFinish={handleLogin}
                style={{
                    maxWidth: 400,
                    padding: '20px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
            >
                <h2
                    style={{
                        fontSize: '30px',
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: '#1890ff',
                    }}
                >
                    Login
                </h2>

                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        closable
                        style={{ marginBottom: '16px' }}
                        onClose={() => setError('')}
                    />
                )}

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Enter your username" style={{ padding: '10px' }} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" style={{ padding: '10px' }} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            height: '40px',
                            fontSize: '16px',
                            backgroundColor: '#1890ff',
                            borderRadius: '8px',
                            border: 'none',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#40a9ff')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#1890ff')}
                    >
                        Submit
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Link to="/Register">
                        <Button
                            type="default"
                            style={{
                                width: '100%',
                                height: '40px',
                                fontSize: '16px',
                                backgroundColor: '#1890ff',
                                color: 'white',
                                borderRadius: '8px',
                                border: 'none',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#40a9ff')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#1890ff')}
                        >
                            Register
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
