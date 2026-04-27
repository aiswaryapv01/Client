import React,{ useState , useEffect } from 'react'
import whatsapp from '../assets/whatsapp1.png';
import contact from '../assets/contact2.png';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from './ResponsiveAppBar';

const textStyle = {
  fontSize: '1.6rem',
  fontFamily: 'serif',
  marginLeft:75,
  marginTop:20,
};

const SkillList = ({setFromSkillList}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStarsMap, setSelectedStarsMap] = useState({}); 
    const [userRating, setUserRating] = useState([0, 0, 0, 0, 0]); // Array to store count of each rating value
    const [userRatingCount, setUserRatingCount] = useState({}); // Object to store the count of each rating value
   
    
    const location = useLocation();                              
  const searchParams = new URLSearchParams(location.search);
    const signedInUserEmail = searchParams.get('email'); 
    let { title } = useParams();
    const navigate = useNavigate();
  
    const [ratingPopups, setRatingPopups] = useState({});

  
    const handleContactClick = (userEmail) => {
        // Navigate to the desired page when a card is clicked
        console.log("Navigating to profile page")
        setFromSkillList(true);
  navigate(`/Main/profile2?email=${userEmail}`); 
      };




    const toggleRatingPopup = (userId) => {
        setSelectedUserId(userId); // Assuming setSelectedUserId is a state setter function
    setShowRatingPopup(!showRatingPopup);
        setRatingPopups(prevState => ({
          ...prevState,
          [userId]: !prevState[userId] // Toggle the popup for the specific user
        }));
      };
      

    const [selectedUserId, setSelectedUserId] = useState(null);

  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);

  useEffect(() => {
    axios.get(`https://mern-backend-u7se.onrender.com/usersBySkill/${title}`)
      .then(response => {
        setUsers(response.data);
        console.log(users);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users by skill:', error);
        setLoading(false);
      });
  }, [title]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (users.length === 0) {
    return<div className='bg-red-200 w-3/4 font-bold text-xl  mx-auto mr-auto rounded h-36 mt-16 align-items-center justify-center text-center pt-12'><p>No users found with the skill {title}</p></div> ;
  }


  const getSelectedStars = (userId) => {
    return selectedStarsMap[userId] || 0;
  };
 
  const handleStarClick = (userId,starValue) => {
    // Update selectedStars to the clicked starValue
    setSelectedStarsMap(prevState => ({
        ...prevState,
        [userId]: starValue
      }));
    //setSelectedStars(starValue);
    console.log(starValue);
  };

  const handleClear = (userId) => {
    setSelectedStarsMap(prevState => ({
      ...prevState,
      [userId]: 0
    }));
  };

  const handleSubmit = async (userId) => {
    try {
      const selectedStars = getSelectedStars(userId);
      console.log(selectedStars);
      if (!selectedStars) {
        console.error('No stars selected for user');
        return;
      }

      // Send a request to the backend to update the user's rating
      const response = await axios.put(`https://mern-backend-u7se.onrender.com/updateRating/${userId}`, {
        rating: selectedStars,
      });
      console.log(response.data);

      // Handle success, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  
  return (
    
    <div className='mainbox w-screen h-screen'>
        <ResponsiveAppBar/>
        <div className='skillname w-3/4 h-20 flex justify-center items-center ml-auto mr-auto mt-5  'style={{backgroundColor:'#181B30', marginBottom:'3rem',marginTop:'3rem'}}>
            <p className='text-white text-lg font-bold  ' style={{fontSize:'22px', fontFamily:'monospace', textTransform:'uppercase',letterSpacing: '1px'}}>{title}</p>
        </div>
        {title === 'Dance' || title === 'Music' ? (
                <div  className=' w-3/4 h-20 border border-black ml-auto mr-auto mt-5 rounded-lg ' style={{marginTop:'2rem', backgroundColor:'black'}} >

<div className='name w-1/2 h-20 float-left'>
 
  <p className='text-white p-5 pl-5' style={{wordSpacing:6, textStyle, fontSize:'20px',fontWeight:'inherit'}}>Join  GCEK {title} Club</p> 
</div>
<div className='connect float-left'style={{
  height:80,
  width:400
}}>
  <p className='pt-5 font-bold'style={{
   fontSize: '1.3rem',
   paddingLeft:310, 
   fontFamily:'monospace'
  }}></p>
</div>
<div className='icon float-left ml-5 'style={{
  width:80,
  height:70,
  marginLeft:'4rem',
  backgroundImage:`url(${whatsapp})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition:'center',
  cursor:'pointer'
}}  > 
</div>

</div>
) : null}
        
        {users.map(user => (
            <div  key={user._id}>
       
        <div key={user._id} className=' w-3/4 h-20 border border-black ml-auto mr-auto mt-5 rounded-lg ' style={{marginTop:'2rem'}} >

          <div className='name w-1/2 h-20 float-left'>
            <div className='contact rounded-full float-left'style={{
             width:50,
             height:50,
             marginLeft:10,
             marginTop:14,
             backgroundImage:`url(${contact})`,
             backgroundRepeat: 'no-repeat',
             backgroundSize: 'cover',
             backgroundPosition:'center',
             cursor: 'pointer' ,
            }} onClick={() => handleContactClick(user.email)}> 
            </div> 
            <p style={textStyle}>{user.name}</p> 
          </div>
          <div className='connect float-left'style={{
            height:80,
            width:400
          }}>
            <p className='pt-5 font-bold'style={{
             fontSize: '1.3rem',
             paddingLeft:310, 
             fontFamily:'monospace'
            }}>Connect</p>
          </div>
          <div className='icon float-left 'style={{
            width:80,
            height:70,
            backgroundImage:`url(${whatsapp})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition:'center',
            cursor:'pointer'
          }} onClick={() => window.open(`https://api.whatsapp.com/send?phone=${user.contact}`, '_blank')} > 
          </div>
          <div
      className={`rate float-left bg-yellow-500 font-bold rounded float-left border border-black mr-2 ${
        signedInUserEmail === user.email ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{
        fontSize: '1.1rem',
        marginTop: 15,
        height: 50,
        width: 70,
      }}
      onClick={() => {
        if (signedInUserEmail !== user.email) {
          toggleRatingPopup(user._id);
        }
      }}
    >
      <p
        style={{
          marginLeft: 17,
          marginTop: 10,
        }}
      >
        Rate
      </p>
    </div>
        </div>
        
        
        {/* Rating popup */}
       {/* {showRatingPopup && (
          <div className="rating-popup">
            <div className="stars">
             {[1, 2, 3, 4, 5].map((value) => (
                <span 
                  key={value} 
                  onClick={() =>  handleStarClick(value)}
                  style={{ color: selectedStars >= value ? 'orange' : 'gray', cursor: 'pointer' }}
                >
                 ★
                </span>
             ))}*/}

{ratingPopups[user._id] && (
          <div className="rating-popup">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  onClick={() => handleStarClick(user._id, value)} 
                  style={{ color: getSelectedStars(user._id) >= value ? 'orange' : 'gray', cursor: 'pointer' }}
                
                >
                  ★
                </span>
              ))}
            <button className="submit-button font-bold bg-blue-500 rounded px-4 py-2 ml-2 mt-2 hover:text-white transition-transform duration-300 transform hover:scale-110"
           onClick={() => handleSubmit(user._id)}>Submit</button>
            <button className="clear-button font-bold bg-blue-500 rounded px-4 py-2 ml-2 mt-2 hover:text-white transition-transform duration-300 transform hover:scale-110"onClick={() => handleClear(user._id)}>Clear</button>
          </div>
          
        </div>
        
      )}
      
      </div>
         ))}  
  
    </div>
  );
}

export default SkillList
