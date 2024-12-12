import { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';

const Register = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success'); // 'success' or 'error'

    const handleRegister = async (values) => {
        const { username, password } = values;

        try {
            const response = await fetch('https://localhost:7136/api/Users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed, please try again');
            }

            const data = await response.json();
            if (data.success) {
                setMessageType('success');
                setMessage('Registration successful! You can now log in.');
                form.resetFields(); // Reset form fields on success
            } else {
                setMessageType('error');
                setMessage(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setMessageType('error');
            setMessage(err.message || 'An error occurred during registration.');
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
                name="registerForm"
                layout="vertical"
                onFinish={handleRegister}
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
                    Register
                </h2>

                {message && (
                    <Alert
                        message={message}
                        type={messageType}
                        showIcon
                        closable
                        style={{ marginBottom: '16px' }}
                        onClose={() => setMessage('')}
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
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
