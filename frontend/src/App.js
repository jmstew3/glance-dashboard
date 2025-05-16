import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaDocker, FaServer, FaCloudUploadAlt, FaChartLine, FaCog } from 'react-icons/fa';

// Styled Components
const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2b3a42;
  color: white;
  padding: 20px 0;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 40px;
  
  svg {
    margin-right: 10px;
    font-size: 32px;
  }
`;

const NavItem = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #3c4e58;
  }
  
  svg {
    margin-right: 10px;
  }
  
  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const Header = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 500;
  color: #333;
`;

const ContainerCard = styled.div`
  background: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  &:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }
`;

const ContainerStatus = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${props => 
    props.status === 'running' ? '#28a745' : 
    props.status === 'created' ? '#ffc107' : 
    props.status === 'exited' ? '#dc3545' : '#6c757d'};
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  background-color: ${props => 
    props.primary ? '#0d6efd' : 
    props.success ? '#28a745' : 
    props.danger ? '#dc3545' : 
    props.warning ? '#ffc107' : '#6c757d'};
  color: white;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// App Component
const App = () => {
  return (
    <Router>
      <AppContainer>
        <Sidebar>
          <Logo>
            <FaDocker />
            <span>ContainerHub</span>
          </Logo>
          <NavItem>
            <Link to="/">
              <FaServer />
              <span>Containers</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/hosts">
              <FaCloudUploadAlt />
              <span>Remote Hosts</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/stats">
              <FaChartLine />
              <span>Statistics</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/settings">
              <FaCog />
              <span>Settings</span>
            </Link>
          </NavItem>
        </Sidebar>
        <MainContent>
          <Routes>
            <Route path="/" element={<ContainersPage />} />
            <Route path="/hosts" element={<HostsPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

// Containers Page
const ContainersPage = () => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchContainers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/containers');
        setContainers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch containers. Please check if the Docker daemon is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContainers();
    
    // Refresh every 5 seconds
    const interval = setInterval(fetchContainers, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleContainerAction = async (id, action) => {
    try {
      await axios.post(`/api/containers/${id}/${action}`);
      // Refresh containers after action
      const response = await axios.get('/api/containers');
      setContainers(response.data);
    } catch (err) {
      console.error(`Failed to ${action} container:`, err);
      alert(`Failed to ${action} container. See console for details.`);
    }
  };
  
  const getStatusFromState = (state) => {
    switch (state) {
      case 'running':
        return 'running';
      case 'created':
        return 'created';
      case 'exited':
        return 'exited';
      default:
        return state;
    }
  };
  
  return (
    <div>
      <Header>Containers</Header>
      
      {loading ? (
        <Card>Loading containers...</Card>
      ) : error ? (
        <Card>{error}</Card>
      ) : containers.length === 0 ? (
        <Card>No containers found.</Card>
      ) : (
        containers.map(container => (
          <ContainerCard key={container.Id}>
            <div>
              <h3>{container.Names[0].replace(/^\//, '')}</h3>
              <p>Image: {container.Image}</p>
              <ContainerStatus status={getStatusFromState(container.State)}>
                {container.State}
              </ContainerStatus>
            </div>
            <ButtonGroup>
              {container.State !== 'running' && (
                <Button 
                  primary
                  onClick={() => handleContainerAction(container.Id, 'start')}
                >
                  Start
                </Button>
              )}
              {container.State === 'running' && (
                <>
                  <Button 
                    danger
                    onClick={() => handleContainerAction(container.Id, 'stop')}
                  >
                    Stop
                  </Button>
                  <Button 
                    warning
                    onClick={() => handleContainerAction(container.Id, 'restart')}
                  >
                    Restart
                  </Button>
                </>
              )}
            </ButtonGroup>
          </ContainerCard>
        ))
      )}
    </div>
  );
};

// Hosts Page
const HostsPage = () => {
  const [hosts, setHosts] = useState([]);
  const [newHost, setNewHost] = useState({ name: '', url: '' });
  
  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get('/api/hosts');
        setHosts(response.data);
      } catch (err) {
        console.error('Failed to fetch hosts:', err);
      }
    };
    
    fetchHosts();
  }, []);
  
  const handleAddHost = async (e) => {
    e.preventDefault();
    
    if (!newHost.name || !newHost.url) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      const response = await axios.post('/api/hosts', newHost);
      setHosts([...hosts, response.data]);
      setNewHost({ name: '', url: '' });
    } catch (err) {
      console.error('Failed to add host:', err);
      alert('Failed to add host. See console for details.');
    }
  };
  
  return (
    <div>
      <Header>Remote Docker Hosts</Header>
      
      <Card>
        <h3>Add New Host</h3>
        <form onSubmit={handleAddHost}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Host Name</label>
            <input 
              type="text" 
              id="name"
              value={newHost.name}
              onChange={(e) => setNewHost({ ...newHost, name: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="url" style={{ display: 'block', marginBottom: '5px' }}>Docker API URL</label>
            <input 
              type="text" 
              id="url"
              value={newHost.url}
              onChange={(e) => setNewHost({ ...newHost, url: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder="http://hostname:2375"
            />
          </div>
          
          <Button primary type="submit">Add Host</Button>
        </form>
      </Card>
      
      {hosts.length === 0 ? (
        <Card>No remote hosts configured.</Card>
      ) : (
        hosts.map(host => (
          <ContainerCard key={host.id}>
            <div>
              <h3>{host.name}</h3>
              <p>{host.isSocket ? 'Socket Path' : 'API URL'}: {host.url}</p>
            </div>
            <ButtonGroup>
              <Button primary>Connect</Button>
              <Button danger>Remove</Button>
            </ButtonGroup>
          </ContainerCard>
        ))
      )}
    </div>
  );
};

// Stats Page (Placeholder)
const StatsPage = () => {
  return (
    <div>
      <Header>Container Statistics</Header>
      <Card>Statistics feature coming soon!</Card>
    </div>
  );
};

// Settings Page (Placeholder)
const SettingsPage = () => {
  return (
    <div>
      <Header>Settings</Header>
      <Card>Settings feature coming soon!</Card>
    </div>
  );
};

export default App;
