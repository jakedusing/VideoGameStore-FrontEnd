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
    <div>
      <h2>Profile</h2>
      <p>
        <strong>Name:</strong> {user.firstName} {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {user.phoneNumber}{" "}
      </p>
      <p>
        <strong>Salary:</strong> ${user.salary}
      </p>
    </div>
  );
};

export default Profile;
