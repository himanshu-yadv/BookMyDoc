import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-3 mb-6">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer">
            <img className="w-36 h-36 rounded-full object-cover opacity-80" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 absolute bottom-1 right-1" src={assets.upload_icon} alt="" />
            <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
          </label>
        ) : (
          <img className="w-36 h-36 rounded-full object-cover" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="text-3xl font-bold text-center border-b w-64"
            type="text"
            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            value={userData.name}
          />
        ) : (
          <p className="text-3xl font-bold text-center text-[#262626]">{userData.name}</p>
        )}
      </div>

      <hr className="mb-4" />

      {/* Contact Information */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2 underline">Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-sm">
          <p className="font-semibold">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-semibold">Phone:</p>
          {isEdit ? (
            <input
              className="border px-2 py-1 rounded bg-gray-50"
              type="text"
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              value={userData.phone}
            />
          ) : (
            <p className="text-gray-600">{userData.phone}</p>
          )}

          <p className="font-semibold">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                className="border px-2 py-1 rounded bg-gray-50"
                type="text"
                placeholder="Line 1"
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                value={userData.address.line1}
              />
              <input
                className="border px-2 py-1 rounded bg-gray-50"
                type="text"
                placeholder="Line 2"
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                value={userData.address.line2}
              />
            </div>
          ) : (
            <p className="text-gray-600">{userData.address.line1} <br /> {userData.address.line2}</p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2 underline">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-sm">
          <p className="font-semibold">Gender:</p>
          {isEdit ? (
            <select
              className="border px-2 py-1 rounded bg-gray-50 max-w-[120px]"
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}

          <p className="font-semibold">Birthday:</p>
          {isEdit ? (
            <input
              className="border px-2 py-1 rounded bg-gray-50 max-w-[140px]"
              type="date"
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Save/Edit Button */}
      <div className="flex justify-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Save Information
          </button>
        ) : (
          <button
  onClick={() => setIsEdit(true)}
  className="bg-blue-600 text-white px-6 py-2 rounded-full"
>
  Edit
</button>


        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
