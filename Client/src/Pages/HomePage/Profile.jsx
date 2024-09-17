import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
} from '@mui/material';
import UploadFileForm from './upload';
import { setUser } from '../../redux/public_id';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const public_id = useSelector((state) => state.public_id);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('x-access-token'); // or get the token from where it's stored

    if (token) {
      const decodedToken = parseJwt(token); // Assuming the token is a JWT, you can use a JWT library
      const publicIdFromToken = decodedToken.public_id;
      
      if (publicIdFromToken) {
        dispatch(setUser(publicIdFromToken)); // Dispatch the public_id to the Redux store
      }
    }
  }, [dispatch]);

  useEffect(() => {
      fetch(`http://127.0.0.1:5555/profile/${1}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  , []);

  const handleUpdateField = () => {
    const { profile_picture, ...sent_user } = user;
    fetch(`/profile/${public_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sent_user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(sent_user);
        setUser(data);
        setEditing(false);
      })
      .catch((error) => console.error('Error updating user profile:', error));
    };
  
  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  };

  return (
    <Paper elevation={3} style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Times New Roman' }} >
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          User Profile
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationEnabled}
              onChange={handleNotificationToggle}
              color="primary"
            />
          }
          label="Enable Notifications"
        />
      </div>
      {user ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={user.profile_picture}
            alt="Profile"
            sx={{ width: 100, height: 100, marginTop: '20px', marginBottom: '10px' }}
          />
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Username:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                value={user.name || ''}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.name}</Typography>
            )}
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Email:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="email"
                value={user.email || ''}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.email}</Typography>
            )}
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Bio:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="tel"
                value={user.bio || ''}
                onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.bio}</Typography>
            )}
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            {editing ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateField}
                  style={{ marginTop: '10px' }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditing(true)}
                  style={{ marginTop: '10px' }}
                  className='submit-button'
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading student profile...</div>
      )}
      <UploadFileForm/>
    </Paper>
  );
};
// Utility function to decode JWT (if applicable)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return null;
  }
}
export default Profile;
