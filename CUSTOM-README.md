# Custom Docker Container Dashboard

This project provides a modern, customizable dashboard for managing Docker containers running across multiple hosts. It includes a React frontend and Node.js backend, all containerized with Docker Compose.

## Features

- **Container Management**: Start, stop, restart, and monitor Docker containers
- **Remote Host Integration**: Connect to Docker hosts running on different URLs
- **Traffic Management**: Uses Traefik as a reverse proxy for routing traffic
- **User-friendly UI**: Modern React-based interface with responsive design
- **Real-time Updates**: Container status updates in real-time
- **Customizable**: Easily extendable for additional features

## Architecture

The application consists of three main components:

1. **Frontend**: React-based UI running in an Nginx container
2. **Backend API**: Node.js Express server using Dockerode to interact with Docker
3. **Reverse Proxy**: Traefik for routing and load balancing

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Option 1: Using Portainer (Recommended for quick setup)

For a ready-to-use solution, use our Portainer-based setup:

```bash
cd docker-dashboard
docker-compose up -d
```

Then access Portainer at: http://localhost:9000

### Option 2: Using the Custom Dashboard

For the custom React + Node.js dashboard:

```bash
cd docker-dashboard
docker-compose -f custom-docker-compose.yml up -d
```

Then access:
- Dashboard UI: http://dashboard.localhost
- Traefik Dashboard: http://traefik.localhost:8080

## Development Setup

If you want to develop and extend the dashboard:

### Frontend Development

```bash
cd frontend
npm install
npm start
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

## Adding Remote Docker Hosts

You can add remote Docker hosts through the UI in the "Remote Hosts" section. You'll need:

1. A name for the host
2. The Docker API URL (e.g., http://remote-server:2375)

Note: Make sure your remote Docker hosts have the API exposed securely.

## Docker API Security Considerations

When exposing Docker APIs for remote management:

1. Use TLS encryption
2. Configure proper authentication
3. Use Docker's built-in authorization plugin
4. Consider using SSH tunneling for secure connections

## Customizing the Dashboard

The dashboard is built with React and can be easily customized:

- Edit `frontend/src/App.js` to modify the UI
- Edit `backend/server.js` to add new API endpoints
- Modify `custom-docker-compose.yml` to add additional services

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the MIT License.
