import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BusRoutes() {
  const [userLocation, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [busType, setBusType] = useState('');
  const navigate = useNavigate();

  const handleBusType = (type) => {
    setBusType(type);
  };

  const handleSubmit = () => {
    if (!userLocation || !destination || !busType) {
      alert('Please fill all the fields!');
      return;
    }
    navigate('/map', {
      state: {
        userLocation,
        destination,
        busType,
      }
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     // justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      paddingTop:'0rem',
      backgroundColor: '#f5f5f5'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '3rem',
        marginBottom: '3rem',
        color: '#333'
      }}>Select Your Route</h1>
      <input
        type="text"
        placeholder="Enter Your Location"
        value={userLocation}
        onChange={(e) => setLocation(e.target.value)}
        style={{
          width: '300px',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          marginBottom: '1rem'
        }}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Choose Your Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{
          width: '300px',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          marginBottom: '1rem'
        }}
      />
      <br />

      <h2 style={{ marginBottom: '2.5rem', 
        color: '#555' }}>
        Tell Your Bus Preference</h2>
     <div style={{
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  marginBottom: '2rem'
}}>
      <button onClick={() => handleBusType('AC')
        
      }
      style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: busType === 'AC' ? '#0077cc' : '#ddd',
        color: busType === 'AC' ? '#fff' : '#000',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        cursor: 'pointer',
        boxShadow: busType === 'AC' ? '0 0 12px #0077cc' : 'none',
        transition: '0.3s ease',
      }}>AC Buses</button>
      <button onClick={() => handleBusType('Non-AC')}
       style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: busType === 'Non-AC' ? '#0077cc' : '#ddd',
        color: busType === 'Non-AC' ? '#fff' : '#000',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        cursor: 'pointer',
        boxShadow: busType === 'Non-AC' ? '0 0 12px #0077cc' : 'none',
        transition: '0.3s ease',
        textAlign: 'center',
        padding: '0 10px'
      }}
        >
          Non-AC Buses</button>
          </div>
      <br /><br />
      <button onClick={handleSubmit}
       style={{
        padding: '12px 24px',
        fontSize: '1rem',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#222'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
      >Get Route</button>
    </div>
  );
}

export default BusRoutes;
