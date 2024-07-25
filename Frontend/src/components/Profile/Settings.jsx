
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue ({ ...value, [name]: value });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
     
        const response = await axios.get("http://localhost:3002/users/get-user-information", { headers });
        setProfileData(response.data);
        setValue({ address: response.data.address });
      
    };

    fetchProfileData();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put("http://localhost:3002/users/updateaddress", value, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  if (!profileData) {
    return (
      <div className="w-full h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
    <div className="h-[100%] p-4 md:p-8 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Settings</h1>
      <div className="flex gap-12">
        <div>
          <label htmlFor="username">Username</label>
          <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{profileData.username}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{profileData.email}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <label htmlFor="address">Address</label>
        <textarea
          className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
          rows="5"
          placeholder="Address"
          name="address"
          value={value.address}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
          onClick={submitAddress}
        >
          Update
        </button>
      </div>
    </div>
    </>
  );
};

export default Settings;