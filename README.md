# Glance Dashboard

A self-hosted dashboard for quick access to information and services, powered by [Glance](https://github.com/glanceapp/glance) and Traefik.

## Overview

This repository contains a configuration for running Glance dashboard with Traefik as a reverse proxy. Glance provides a customizable dashboard interface with various widgets including Docker container status, bookmarks, monitoring tools, and more.

## Features

- **Docker Integration**: Monitor your Docker containers directly from the dashboard
- **Traefik Integration**: Secure access with Traefik reverse proxy
- **Customizable**: Easy configuration through YAML files
- **Responsive**: Works on desktop and mobile devices

## Prerequisites

- Docker and Docker Compose
- Traefik setup with a network named `traefik-general`
- A domain or subdomain for accessing the dashboard (configured as `glance.tawson.top` by default)

## Directory Structure

```
docker-dashboard/
├── docker-compose.yml          # Docker Compose configuration
├── .gitignore                  # Git ignore file
├── README.md                   # This documentation
└── glance/                     # Glance-specific files
    ├── config/                 # Configuration directory 
    │   └── glance.yml          # Main Glance configuration
    └── assets/                 # Custom assets
        └── user.css            # Custom CSS styling
```

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/docker-dashboard.git
   cd docker-dashboard
   ```

2. Configure your domain in `docker-compose.yml` if needed (default is `glance.tawson.top`)

3. Customize the Glance configuration in `glance/config/glance.yml` as needed

4. Add any custom styling in `glance/assets/user.css`

5. Start the service:
   ```bash
   docker-compose up -d
   ```

6. Access your dashboard at https://glance.tawson.top (or your configured domain)

## Configuration

The main configuration file is located at `glance/config/glance.yml`. Refer to the [Glance documentation](https://github.com/glanceapp/glance/tree/main/docs) for detailed configuration options.

### Example Configuration

```yaml
# Basic configuration example
title: "My Dashboard"
theme: "dark"
pages:
  - title: "Home"
    columns:
      - widgets:
          - type: "clock"
          - type: "docker-containers"
```

## Customization

### CSS Customization

You can customize the appearance by editing `glance/assets/user.css`.

### Adding Widgets

Edit `glance/config/glance.yml` to add or modify widgets. Available widgets include:
- Docker containers
- System monitoring
- RSS feeds
- Bookmarks
- And many more

## Updating

To update Glance to the latest version:

```bash
docker-compose pull
docker-compose up -d
```

## Troubleshooting

- **Dashboard not loading**: Check if Traefik is running and properly configured
- **Widgets not displaying properly**: Verify the configuration in `glance/config/glance.yml`
- **Docker containers not showing**: Make sure the Docker socket is properly mounted

## License

This setup uses Glance, which is licensed under the MIT License. See [Glance's LICENSE](https://github.com/glanceapp/glance/blob/main/LICENSE) for details.