import express from 'express';
import cors from 'cors';
import Docker from 'dockerode';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Docker client
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all containers
app.get('/api/containers', async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    res.json(containers);
  } catch (error) {
    console.error('Error fetching containers:', error);
    res.status(500).json({ error: 'Failed to fetch containers' });
  }
});

// Get container details
app.get('/api/containers/:id', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    const info = await container.inspect();
    res.json(info);
  } catch (error) {
    console.error(`Error fetching container ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch container details' });
  }
});

// Start a container
app.post('/api/containers/:id/start', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.start();
    res.json({ message: 'Container started successfully' });
  } catch (error) {
    console.error(`Error starting container ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to start container' });
  }
});

// Stop a container
app.post('/api/containers/:id/stop', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.stop();
    res.json({ message: 'Container stopped successfully' });
  } catch (error) {
    console.error(`Error stopping container ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to stop container' });
  }
});

// Restart a container
app.post('/api/containers/:id/restart', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.restart();
    res.json({ message: 'Container restarted successfully' });
  } catch (error) {
    console.error(`Error restarting container ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to restart container' });
  }
});

// Get container logs
app.get('/api/containers/:id/logs', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    const logs = await container.logs({
      stdout: true,
      stderr: true,
      tail: 100,
      follow: false
    });
    
    res.setHeader('Content-Type', 'text/plain');
    res.send(logs);
  } catch (error) {
    console.error(`Error fetching logs for container ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch container logs' });
  }
});

// Get remote Docker hosts
app.get('/api/hosts', (req, res) => {
  // In a real app, this would fetch from a database
  const hosts = [
    { id: 'local', name: 'Local Docker', url: '/var/run/docker.sock', isSocket: true },
    // Add your remote hosts here
  ];
  
  res.json(hosts);
});

// Add a remote Docker host
app.post('/api/hosts', (req, res) => {
  const { name, url } = req.body;
  
  // In a real app, this would save to a database
  // For now, we just return a success message
  res.status(201).json({ 
    id: Date.now().toString(),
    name, 
    url,
    isSocket: false
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
