#!/bin/zsh

echo "🐳 Docker Dashboard Setup Script 🐳"
echo "==================================="
echo ""
echo "This script will help you set up your Docker container dashboard."
echo ""
echo "Please choose an option:"
echo "1) Simple setup with Portainer (recommended for beginners)"
echo "2) Custom React dashboard (more features, more complex)"
echo ""

read -p "Enter your choice (1 or 2): " choice

case $choice in
  1)
    echo "👉 Setting up Portainer dashboard..."
    docker-compose up -d
    echo ""
    echo "✅ Portainer has been set up successfully!"
    echo "🌐 You can access it at: http://localhost:9000"
    echo "🌐 Traefik dashboard available at: http://traefik.localhost:8080"
    ;;
  2)
    echo "👉 Setting up custom React dashboard..."
    docker-compose -f custom-docker-compose.yml up -d
    echo ""
    echo "✅ Custom dashboard has been set up successfully!"
    echo "🌐 You can access it at: http://dashboard.localhost"
    echo "🌐 API available at: http://api.dashboard.localhost"
    echo "🌐 Traefik dashboard available at: http://traefik.localhost:8080"
    ;;
  *)
    echo "❌ Invalid choice. Please run the script again."
    exit 1
    ;;
esac

echo ""
echo "📝 Note: Make sure to add the following entries to your /etc/hosts file if needed:"
echo "127.0.0.1 dashboard.localhost api.dashboard.localhost traefik.localhost"
echo ""
echo "Thank you for using Docker Dashboard! 🚀"
