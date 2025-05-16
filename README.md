# Docker Dashboard

This project provides a comprehensive dashboard for managing and accessing Docker containers running on various URLs. It offers two options:

1. **Portainer-based dashboard**: Quick setup with Portainer and Traefik (recommended for beginners)
2. **Custom React dashboard**: More customizable solution with React frontend and Node.js backend

## Components

### Option 1: Portainer Dashboard
1. **Portainer**: A web-based container management tool that provides a UI for managing Docker containers, images, networks, and volumes.
2. **Traefik**: A modern HTTP reverse proxy and load balancer that makes managing traffic to your containers easy.

### Option 2: Custom Dashboard
1. **React Frontend**: Modern, responsive UI for container management
2. **Node.js Backend**: Express API for Docker operations using Dockerode
3. **Traefik**: For traffic routing and load balancing

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone this repository:
   ```bash
   git clone <your-repository-url>
   cd docker-dashboard
   ```

2. Use our setup script to choose your preferred option:
   ```bash
   ./start.sh
   ```
   
   Or manually start the services:
   
   **Option 1 (Portainer):**
   ```bash
   docker-compose up -d
   ```
   
   **Option 2 (Custom Dashboard):**
   ```bash
   docker-compose -f custom-docker-compose.yml up -d
   ```

3. Access your chosen dashboard:
   
   **Option 1 (Portainer):**
   - Portainer: http://localhost:9000
   - Traefik Dashboard: http://traefik.localhost:8080
   
   **Option 2 (Custom Dashboard):**
   - Dashboard UI: http://dashboard.localhost
   - Traefik Dashboard: http://traefik.localhost:8080

## Adding Remote Docker Hosts

### Option 1: Using Portainer

1. Log in to Portainer at http://localhost:9000
2. Navigate to "Environments" in the sidebar
3. Click "Add environment"
4. Choose "Docker" as environment type
5. For remote Docker hosts:
   - Select "Docker API"
   - Enter the URL endpoint of your remote Docker host (e.g., http://your-remote-host:2375)
   - Provide any necessary authentication details
   - Click "Add environment"

### Option 2: Using Custom Dashboard

1. Access the dashboard at http://dashboard.localhost
2. Navigate to the "Remote Hosts" section
3. Fill in the form with:
   - Host Name: A friendly name for your remote host
   - Docker API URL: The URL endpoint of your remote Docker host (e.g., http://your-remote-host:2375)
4. Click "Add Host"

## Connecting Containers to Traefik

To add a container to your Traefik routing:

1. Add the following labels to your container in its docker-compose file:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.[service-name].rule=Host(`[subdomain].yourdomain.com`)"
  - "traefik.http.routers.[service-name].entrypoints=web"
```

2. Deploy your container using Docker Compose
3. The container will automatically be added to Traefik's routing table

## Security Considerations

- This setup is designed for local or development use
- For production deployment:
  - Secure the Traefik dashboard with authentication
  - Enable HTTPS with SSL certificates
  - Configure proper firewall rules
  - Use Docker secrets for sensitive information
  - Set up proper authentication for Docker API access

## Features

### Common Features (Both Options)
- **Container Management**: Start, stop, and restart containers
- **Traffic Routing**: Automatic routing through Traefik
- **Remote Host Integration**: Connect to Docker hosts running on different URLs

### Portainer-Specific Features
- **Stack Management**: Deploy and manage Docker Compose stacks
- **Resource Controls**: Limit CPU, memory for containers
- **Container Console**: Access container terminals directly
- **Image Management**: Pull, build, and remove Docker images

### Custom Dashboard Features
- **Modern UI**: Clean, responsive React-based interface
- **Quick Access**: Dashboard designed for rapid container access
- **Extensible Backend**: Node.js API that can be easily extended
- **Customizable**: Full source code access for any modifications

## Extending the Dashboard

### Portainer Extensions
- Install plugins through the Portainer UI
- Configure external authentication providers
- Set up custom templates for container deployment

### Custom Dashboard Extensions
- Modify the React frontend in the `/frontend` directory
- Extend the API endpoints in `/backend/server.js`
- Add new services to the `custom-docker-compose.yml` file
