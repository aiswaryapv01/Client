import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

import profile from '../assets/profile.jpeg';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {  useNavigate } from 'react-router-dom';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function App() {
  const [year , setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const location = useLocation();
  const userData = location.state;

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
  }, [userData]);
  const navigate = useNavigate();
  const[newwSkill,setNewwSkill]= useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const[skillOptions,setSkillOptions]= useState([
    { title: 'Dance' },
    { title: 'Music' },
    { title: 'Web Development' },
    { title: 'Artificial Intelligance' },
    { title: 'Flutter' },
    { title: 'Academics' },
    { title: 'Act as Scribe' }
  ]);


  const handleSkillChange = (event, selectedOptions) => {
    
    setSelectedSkills(selectedOptions.map((option) => option.title));
  };

  const handleSkillChange2 = (event) => {
    event.preventDefault();
    setNewwSkill('');
    if (typeof newwSkill === 'string' && newwSkill.trim() !== '' && !skillOptions.some(option => option.title.toLowerCase() === newwSkill.toLowerCase())) {
      setSkillOptions([...skillOptions, { title: newwSkill }]);
    }
  };
  


  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.put('https://mern-backend-u7se.onrender.com/updateUser', { email: userData.email, year, branch,skills: selectedSkills });
      console.log(response.data);
      navigate('/')
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };
  

  

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full max-w-4xl flex-1 flex">
        <div className="w-1/2  bg-white-200 flex flex-col justify-center items-center pt-8">
          <img className='h-28 w-28 rounded-full mb-4 ml-5' src={profile} alt=""  style={{marginLeft:"6rem"}}/>
          <div className="flex flex-col items-center">
            <p className="font-bold mb-2" style={{marginLeft:"6rem"}}>{userData.name}
            
            </p>
            <div className="mb-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"style={{marginLeft:"6rem"}}>
                Follow
              </button>
            </div>
            {/* Rating Option Here */}
          </div>
        </div>
        <div className="w-1/2 bg-white-200 flex flex-col justify-start items-start ml-5 p-8" style={{marginLeft:"22rem"}}>
          <div className="mb-1">
            <p><span className="font-bold">FULLNAME:</span> {userData.name}</p>
            <hr className="mt-1 mb-1 w-full" />
          </div>
          <div className="mb-1">
            <p><span className="font-bold">EMAIL:</span> {userData.email}</p>
            <hr className="mt-1 mb-1 w-full" />
          </div>
          <div className="mb-1">
            <p><span className="font-bold">PHONENO:</span> {userData.contact}</p>
            <hr className="mt-1 mb-1 w-full" />
          </div>
          <form>
          <div className="mb-1">
            
            <label className='font-bold'>Class:</label>
            <input type='text' className='border border-black pl-2'
            onChange={(e) => setYear(e.target.value)}/>
            <hr className="mt-1 mb-1 w-full" />
          </div>
          <div className="mb-1">
          <label className='font-bold'>Branch:</label>
            <input type='text' className='border border-black pl-2'
            onChange={(e) => setBranch(e.target.value)}/>
            <hr className="mt-1 mb-1 w-full" />
          </div>
          </form>
          
        </div>
      </div>
      <div className="w-1/2 h-72 bg-white-200 flex-1p-8" style={{marginLeft:"40rem"}}>
      <div><form><input  className='rounded h-10 border border-gray-400 px-3 mb-5' style={{marginBottom:'2.5rem'}}
     type="text"
     onChange={(e) => setNewwSkill(e.target.value)} value={newwSkill}
     placeholder='Enter Skill Of Your Choice' /><button className='ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSkillChange2} >add</button></form>
     </div>
      <Autocomplete
  multiple
  id="checkboxes-tags-demo"
  options={skillOptions}
  disableCloseOnSelect
  getOptionLabel={(option) => (option ? option.title : '')}
  onChange={handleSkillChange}
  value={selectedSkills.map((skill) => skillOptions.find((option) => option.title === skill))}
  renderOption={(props, option, { selected }) => (
    <li {...props}>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
        checked={selected}
      />
      {option.title}
    </li>
  )}
  style={{ width: '50%' }}
  renderInput={(params) => (
    <TextField {...params} label="Add Skill" placeholder="Favorites" />
  )}
/>

<div className="mt-4">
 

 <button  onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-3 px-4 rounded">
   Add Skills
 </button>
 

         </div>
         </div>
    </div>
  );
}

  

export default App;
