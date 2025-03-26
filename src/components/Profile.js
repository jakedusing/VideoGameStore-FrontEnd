import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // send token for authorization
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-96 text-white">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Profile
        </h2>
        <div className="space-y-4">
          <p className="text-lg">
            <strong className="font-semibold">Name:</strong> {user.firstName}{" "}
            {user.lastName}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Phone Number:</strong>{" "}
            {user.phoneNumber}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Salary:</strong> ${user.salary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
