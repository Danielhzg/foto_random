import React, { useState, useEffect } from 'react';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
      const data = await response.json();
      setUserData(data.results[0]); // Hanya mengambil satu pengguna
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data saat komponen dimuat

  const handleRefresh = () => {
    fetchData(); // Panggil fungsi fetchData untuk mendapatkan data baru
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Data:</h1>
      {userData && (
        <div>
          <img src={userData.picture.large} alt="User" />
          <p>Name: {userData.name.first} {userData.name.last}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
        </div>
      )}
      <button onClick={handleRefresh}>Refresh</button> {/* Tambahkan tombol refresh */}
    </div>
  );
};

export default App;
