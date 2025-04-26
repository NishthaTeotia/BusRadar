import { useNavigate } from 'react-router-dom';

function FrontPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/busroutes');
    };

    return (
        <div 
        style={{
            
            width:'100%',
            
            overflowX:'hidden'
            
        }}
        >
           
            <img
                src="/bus1.webp"
                style={{
                    
                    display:'block',
                    width:'100%',
                    height:'400px',
                    objectFit:'conver',
                    zIndex:-1,
                    margin:0,
                    padding:0,
                    objectPosition:'center',
                  
                }}
                
            />

            
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h1 style={{
                    fontSize:'4rem',
                    margin: '0.5rem 0', 
                    fontWeight: 'bold',
                    

                }}>
                    Begin Your Journey With
                </h1>

                <h1  style={{ 
     fontSize: '5rem',
     fontWeight: '900',
     fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
     background: 'linear-gradient(to right, #0077cc, #00c6ff)',
     WebkitBackgroundClip: 'text',
     WebkitTextFillColor: 'transparent',
     textTransform: 'uppercase',
     letterSpacing: '2px',
     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
     margin: '0.5rem 0 1.5rem', }}>
                    BusRadar
                </h1>

                <p style={{ 
    fontSize: '2rem', 
    color: '#555', 
    margin: '0.5rem 0' }}>
                    Plan and track journeys across all buses.
                </p>

                <p style={{ 
    fontSize: '2rem', 
    color: '#555', 
    margin: '0.5rem 0 2rem' 
  }}>
                    Be on time and never miss your bus again.
                </p>

                <button
                    onClick={handleGetStarted}
                    style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        backgroundColor: '#000',         
                        color: '#fff',                   
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', 
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#222'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default FrontPage;
