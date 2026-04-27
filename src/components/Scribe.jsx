
import React, { useState ,useEffect} from 'react';
import scribeBackgroundImage from '../assets/scribe.jpeg';
import axios from 'axios';                                 
import { useLocation } from 'react-router-dom';
import whatsapp from '../assets/whatsapp1.png';
const App = () => {       
  const location = useLocation();                              
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email'); 
  const [usersWithDates, setUsersWithDates] = useState([]);     
  const signedInUserEmail = searchParams.get('email');                 
  const [userName, setUserName] = useState('');                            
 
  

  const [dates, setDates] = useState(['']);
  const [showBottomBoxLeft, setShowBottomBoxLeft] = useState(true);
  const [showBottomBoxRight, setShowBottomBoxRight] = useState(false);
  
  const handleDateChange = (index, value) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleAddDate = () => {
    setDates([...dates, '']);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://mern-backend-u7se.onrender.com/updateDates/${signedInUserEmail}`, { dates });
      // Assuming you have a function to fetch updated data
      fetchData();
    } catch (error) {
      console.error('Error updating dates:', error);
    }
  };

    const fetchData = async () => {
      try {
        const response = await axios.get('https://mern-backend-u7se.onrender.com/usersWithDates');
        setUsersWithDates(response.data);
        } catch (error) {
        console.error('Error fetching users with dates:', error);
        }
      };
      useEffect(() => {                                                            
      fetchData();
    }, []);                                                                       

  const handleAccept = async (signedInUserEmail, userToAcceptEmail, date) => {
    try {
      await axios.put(`https://mern-backend-u7se.onrender.com/updateAccept/${signedInUserEmail}`, { userToAcceptEmail, date });
      // Assuming you have a function to fetch updated data
      fetchData();
    } catch (error) {
      console.error('Error updating accept status:', error);
    }
  };
  
  const [userNames, setUserNames] = useState([]);
  const [userContact, setUserContact] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mern-backend-u7se.onrender.com/getUserName?email=${signedInUserEmail}`);
        setUserNames(response.data.names);
        setUserContact(response.data.contact);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };
    fetchData();
  }, [signedInUserEmail]);









  

  
  

  const formatDate = (dateString) => {                                             
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };                                                                                

  
  const handleRemoveDate = (index) => {
    if (index === 0) {
      // Clear the value of the first date input instead of removing it fully
      const newDates = [...dates];
      newDates[index] = '';
      setDates(newDates);
    } else {
      const newDates = [...dates];
      newDates.splice(index, 1);
      setDates(newDates);
    }
  };

  const textStyle = {
    fontSize: '1.6rem',
    fontFamily: 'serif', 
  };

  const textStyle2 = {
    fontSize: '1.4rem',  
  };

  const buttonStyle ={
    fontSize: '1.1rem',
    backgroundColor:'#181B30',
  }

  const handleRightDivClick = () => {
      setDates(['']); // Clear the dates
      setShowBottomBoxLeft(false); // Hide the bottom box Left
      setShowBottomBoxRight(true); // Show the bottom box Right
  };

  const handleLeftDivClick = () => {
    setShowBottomBoxLeft(true); // Show the bottom box Left
    setShowBottomBoxRight(false); // Hide the bottom box Right
  };

  return (
    
    <div className='mainbox w-screen h-screen ' >

      <div className="topbox w-screen h-24"style={{backgroundColor:'#181B30'}}>

        {/* left Div */}
        <div className="float-left w-1/2 h-full flex justify-center items-center border border-black"
          onClick={handleLeftDivClick} 
          style={{}} onMouseOver={(e) => {e.target.style.backgroundColor = '#2C2948'}}
          onMouseOut={(e) => {e.target.style.backgroundColor = ''}}>
          <p className="text-white text-lg font-bold transition-transform duration-300 transform hover:scale-110" 
          style={textStyle2}>Do you need a scribe?</p>
        </div>

        {/* right Div */}
        <div className="float-left w-1/2 h-full flex justify-center items-center border border-black"
          onClick={handleRightDivClick}
          style={{}} onMouseOver={(e) => {e.target.style.backgroundColor = '#2C2948'}}
          onMouseOut={(e) => {e.target.style.backgroundColor = ''}}>
          <p className="text-white text-lg font-bold transition-transform duration-300 transform hover:scale-110" style={textStyle2}>Do you want to act as a scribe?</p>
        </div>
      </div>

      {/* bottom div */}
      {showBottomBoxLeft && (
      <div className="bottombox w-screen h-5/6 "style={{backgroundColor:'white'}}>

        {/* choosedatetext div */}
        <div className='float-left w-1/4 h-30 flex justify-center items-center' style={{marginLeft:576}}>
          <p className='text-black text-lg font-size-15 pt-24'style={textStyle}>Choose The Date</p>
        </div>

        {/* contacttext div */}
        <div className='float-left h-30 flex justify-center items-center' style={{marginLeft:70,width:400}}>   {/*ml-56*/} 
          <p className='text-black text-lg font-size-15 flex justify-center items-center pt-24 pb-6'style={textStyle}>Contact</p>
        </div>

        {/* Picture Div */}
        <div className='float-left h-2/3 rounded-full'style={{
          marginLeft:100,
          width:400,
          marginTop:0,
          backgroundImage:`url(${scribeBackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition:'center'
          }}>  
          </div>
  
        {/* Central Div */}
        <div className="float-left w-70  border border-black  flex flex-col justify-between flex justify-center items-center " //w-1/6
         style={{
          marginLeft:115, //150
          marginRight:'auto',
          marginTop:40,
          }}>

          <div className="mx-5 mt-5">
            {dates.map((date, index) => (
              <div key={index} className="flex items-center mb-4">

                {index !== -1 && ( // Render '-' button for all dates except the first one  
                  <button
                   onClick={() => handleRemoveDate(index)}
                    className="border border-black text-black px-4 py-2 rounded hover:text-white transition-transform duration-300 transform hover:scale-110"
                    style={{}} onMouseOver={(e) => {e.target.style.backgroundColor = '#181B30'}}
                    onMouseOut={(e) => {e.target.style.backgroundColor = ''}}>
                    -
                  </button>
                )}

                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  className="border border-gray-400 rounded px-3 py-2 mr-2 ml-2"/>

                {index === dates.length - 1 && (
                  <button
                   onClick={handleAddDate}
                    className="border border-black text-black px-4 py-2 rounded hover:text-white transition-transform duration-300 transform hover:scale-110"
                    style={{}} onMouseOver={(e) => {e.target.style.backgroundColor = '#181B30'}}
                    onMouseOut={(e) => {e.target.style.backgroundColor = ''}}>
                    +
                  </button>
                )}

              </div>
            ))}
          </div>
          <button className="text-white px-4 py-2 rounded mx-5 mb-5 transition-transform duration-300 transform hover:scale-110 rounded-full"style={buttonStyle}onClick={handleSubmit}>Submit</button>
        </div>

        {/*Contact Div*/}
        <div className='float-left h-2/3 border border-black'style={{
          marginLeft: 110,
          width:400,
          }}> 
        <p className='font-bold text-xl p-5 '>Connect Available Scribes:</p>
        <ul>
  {userNames.map((name, index) => (
    <li key={index}>
      <div className='user-info border-black mt-2'  style={{ border: '1px solid black',minHeight: '70px' }}>
        <span className='pl-3 pt-3 mr-auto mx-auto mt-3' style={{fontSize:'18px'}}>{name}</span>
        <div
          className='icon float-right'
          style={{
            width: 80,
            height: 70,
            backgroundImage: `url(${whatsapp})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer'
          }}
          onClick={() => window.open(`https://api.whatsapp.com/send?phone=${userContact[index]}`, '_blank')}
        ></div>
      </div>
    </li>
  ))}
</ul>

        
      </div>
        
      </div>

      )}

      {showBottomBoxRight && (
      <div className="bottombox w-screen h-5/6 "style={{backgroundColor:'white'}}>

        {/*Selectiontext Div*/}
        <div className='h-30 flex justify-center items-center' style={{marginLeft:850,width:400}}>
          <p className='text-black text-lg font-size-15 flex justify-center items-center pt-24 pb-10'style={textStyle}>Select Dates you prefer</p>
        </div>

        {/* Picture Div */}
        <div className='float-left h-2/3 rounded-full'style={{
          marginLeft:100,
          width:400,
          backgroundImage:`url(${scribeBackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition:'center'
          }}>  
        </div>
        
        {/*Selection Div*/}
        <div className='float-left h-2/3'style={{
          marginLeft: 350,
          width:400
          }}> 

          {usersWithDates.map((user) => (
            <div key={user.email}style={{ 
              fontSize: '1.2rem',
              border: '1px solid black',
              marginLeft: '20px' ,
              padding:'10px'
              }}>
              <h2 style={{
                font:'bold',
                fontSize: '1.4rem',
                marginTop:20
                }}>{user.name} 
              </h2>
              <ul>
              {user.dates.map((date, index) => (
                 <li key={index}style={{marginLeft:40}}>{formatDate(date)}          
                  <button className='border rounded text-white transition-transform duration-300 transform hover:scale-110'style={{
                    width:64,
                    fontWeight:'bold',
                    height:32,
                    fontSize: '1.0rem',
                    marginLeft:40,
                    marginRight: 35,
                    paddingLeft:2,
                    paddingRight:2,
                    backgroundColor:'blue'
                  }}onClick={() => handleAccept(signedInUserEmail,user.email,date)}>Accept 
                  </button>
                  {/*{formatDate(date)}*/}
                 </li>
               ))}
              </ul>
            </div>
          ))} 

        </div>
      </div>
      )}
    </div>
  );
};

export default App;
