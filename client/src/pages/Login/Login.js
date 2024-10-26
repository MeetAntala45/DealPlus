import React, { useEffect } from "react";
import { Button, Form, Input, message, App } from "antd"; // Import App
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../Apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/LoadersSlice";

const rules = [
  {
    required: true,
    message: "This field is required",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinished = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      if (response.success) {
        dispatch(SetLoader(false));
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <App> {/* Wrap component with App */}
      <div className="h-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome Back
          </h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinished}>
            <FormItem label="Email" name="email" rules={rules}>
              <Input 
                placeholder="Enter your email" 
                className="rounded-md py-2 px-4" 
              />
            </FormItem>

            <FormItem label="Password" name="password" rules={rules}>
              <Input.Password 
                placeholder="Enter your password" 
                className="rounded-md py-2 px-4" 
              />
            </FormItem>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-4 py-2 font-semibold text-white"
              style={{
                backgroundColor: "#4A5568", // Darker Gray (Gray-700)
                borderColor: "#4A5568",
                borderRadius: "8px",
              }}
            >
              Login
            </Button>

            <div className="mt-4 text-center text-gray-600">
              <span>
                Don't have an account?{" "}
                <Link to="/register" className="text-gray-800 hover:underline">
                  Register
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </App>
  );
};

export default Login;
