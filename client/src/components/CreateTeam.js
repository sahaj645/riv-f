import bg from "../images/bluegrid.png";
import { Button } from "./Button";
import Modal from "./Modal";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTeam({ eventName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomNumber, setRandomNumber] = useState("");

  useEffect(() => {
    const generateRandomNumber = () => {
      const number = Math.floor(10000 + Math.random() * 90000).toString();
      setRandomNumber(number);
    };
    generateRandomNumber();
  }, []);

  const [formData, setFormData] = useState({
    ParticipantName: "",
    RegNo: "",
    VITEmail: "",
    teamId: "",
    TeamName: "",
    teamStrength: null
  });

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      teamId: randomNumber
    }));
  }, [randomNumber]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      teamId: randomNumber
    };
    axios.defaults.withCredentials = true;
    try {
      let response;
      if (eventName === "survival") {
        response = await axios.post('https://riv-backend-b1ck04yg3-sahajs-projects-453c7c18.vercel.app/survival', updatedFormData);
      } else {
        response = await axios.post('https://riv-backend-9ifqklcoc-sahajs-projects-453c7c18.vercel.app/createCortex', updatedFormData);
      }
      

      if (response.status === 201) {
        toast.success(response.data.message);
      } else if (response.status === 400) {
        toast.error(response.data.error);
      } else if (response.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error);
      } else {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      const newRandomNumber = Math.floor(10000 + Math.random() * 90000).toString();
      setRandomNumber(newRandomNumber);
      setFormData({
        ParticipantName: "",
        RegNo: "",
        VITEmail: "",
        teamId: newRandomNumber,
        TeamName: "",
        teamStrength: ""
      });
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-black bg-cover bg-center flex flex-col items-center text-white" style={{ backgroundImage: `url(${bg})` }}>
        <div className="w-11/12 md:w-4/5 lg:w-4/6 bg-cardbg bg-opacity-70 mt-8 md:mt-12 p-4 flex flex-col items-center rounded-lg" style={{ boxShadow: "0 0 10px 1px rgba(138, 30, 30, 0.7)" }}>
          <form className="w-full max-w-3xl">
            <div className="flex flex-col md:flex-row mb-4 md:mb-6 p-3 mx-1">
              <div className="flex p-2 font-normal h-10 flex-1 mb-4 items-center justify-center md:mb-0 md:mr-2 md:justify-normal">
                <span className="bg-gradient-to-r from-red-800 to-red-600 p-2 rounded-xl">Team ID:</span>
                <span className="mx-3">{randomNumber}</span>
              </div>
              <input type="number" placeholder="No. of Team Members" name="teamStrength" value={formData.teamStrength} onChange={handleChange} className="bg-transparent border-b border-solid border-red-600 placeholder:text-red-400 font-extralight p-2 md:p-4 h-10 flex-1 md:ml-2 focus:bg-transparent focus:text-white active:bg-transparent" required />
            </div>
            <div className="flex flex-col md:flex-row mb-4 md:mb-6 p-3">
              <input type="text" placeholder="Participant Name" name="ParticipantName" value={formData.ParticipantName} onChange={handleChange} className="bg-transparent border-b border-solid border-red-600 placeholder:text-red-400 font-extralight p-2 md:p-4 h-10 flex-1 mb-4 md:mb-0 md:mr-2 focus:bg-transparent focus:text-white active:bg-transparent" required />
              <input type="text" placeholder="Reg. No." name="RegNo" value={formData.RegNo} onChange={handleChange} className="bg-transparent border-b border-solid border-red-600 placeholder:text-red-400 font-extralight p-2 md:p-4 h-10 flex-1 md:ml-2 focus:bg-transparent focus:text-white active:bg-transparent" required />
            </div>
            <div className="flex flex-col md:flex-row mb-4 md:mb-6 p-3">
              <input type="email" placeholder="VIT Email ID" name="VITEmail" value={formData.VITEmail} onChange={handleChange} className="bg-transparent border-b border-solid border-red-600 placeholder:text-red-400 font-extralight p-2 md:p-4 h-10 flex-1 mb-4 md:mb-0 md:mr-2 focus:bg-transparent focus:text-white active:bg-transparent" required />
              <input type="text" placeholder="Team Name" name="TeamName" value={formData.TeamName} onChange={handleChange} className="bg-transparent border-b border-solid border-red-600 placeholder:text-red-400 font-extralight p-2 md:p-4 h-10 flex-1 md:ml-2 focus:bg-transparent focus:text-white active:bg-transparent" required />
            </div>
            <div className="flex m-4 justify-around p-6">
              <button type="button" onClick={handleOpenModal} className="bg-gradient-to-r from-red-800 to-red-600 font-light px-4 py-2 rounded-md transform transition-transform duration-300 hover:-translate-y-2 text-white mx-3">How to Fill?</button>
              <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
              <Button what="Submit" extras="mx-3" onClick={handleSubmit} />
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
