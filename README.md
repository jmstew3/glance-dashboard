# Docker Dashboard

This project provides a comprehensive dashboard for managing and accessing Docker containers running on various URLs. It combines Portainer for container management and Traefik for traffic routing.

## Components

1. **Portainer**: A web-based container management tool that provides a UI for managing Docker containers, images, networks, and volumes.
2. **Traefik**: A modern HTTP reverse proxy and load balancer that makes managing traffic to your containers easy.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone this repository:
   ```bash
   git clone <your-repository-url>
   cd docker-dashboard
   ```

2. Start the dashboard services:
   ```bash
   docker-compose up -d
   ```

3. Access the dashboards:
   - Portainer: http://localhost:9000
   - Traefik Dashboard: http://traefik.localhost:8080

## Adding Remote Docker Hosts

1. Log in to Portainer at http://localhost:9000
2. Navigate to "Environments" in the sidebar
3. Click "Add environment"
4. Choose "Docker" as environment type
5. For remote Docker hosts:
   - Select "Docker API"
   - Enter the URL endpoint of your remote Docker host (e.g., http://your-remote-host:2375)
   - Provide any necessary authentication details
   - Click "Add environment"

## Connecting Containers to Traefik

To add a container to your Traefik routing:

1. Add the following labels to your container in its docker-compose file:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.[service-name].rule=Host(`[subdomain].yourdomain.com`)"
  - "traefik.http.routers.[service-name].entrypoints=websecure"
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

## Additional Features

- **Container Monitoring**: View CPU, memory, and network usage of containers
- **Access Control**: Add users with different permission levels
- **Visual Editor**: Edit container configurations through the UI
- **Event Logging**: Track changes and events in your Docker environment
