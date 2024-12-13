import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';
import { authenticationAPI } from '../Service/api';

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const values = await form.validateFields();
            await authenticationAPI.register({
                Name: values.username, // Make sure the API uses the correct key
                Password: values.password
            });
            notification.success({ message: 'Register successfully' });
            form.resetFields();
            navigate('/Login')
        } catch (error) {
            notification.error({ message: 'Register failed', description: error.message });
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
                style={{
                    maxWidth: 400,
                    padding: '20px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onFinish={handleRegister} // Move this to trigger form submission
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

                <Form.Item>
                    <Link to="/Login">
                        <span>Already have account? Press here</span>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
