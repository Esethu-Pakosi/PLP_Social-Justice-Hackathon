import Image from "next/image";

export default function Home() {
  // async function testLogin() {
  //   const email = "email@example.com";
  //   const password = "password123";

  //   // Sending POST request with fetch
  //   const response = await fetch('http://localhost:3000/api/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, password }), // Send the data as JSON
  //   });

  //   const data = await response.json();
  //   return data.message; // Display the response message
  // };

  return (
    <div>
      <h1>Welcome to the Early Warning System API Documentation</h1>
      {/* <span>Testing Login: {testLogin()}</span> */}
    </div>
  );
}
