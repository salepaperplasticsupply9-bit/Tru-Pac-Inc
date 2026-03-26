const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Member Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded"
        />

        <button className="w-full bg-primary text-white p-3 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
