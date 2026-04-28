# Deployment Guide

This guide explains how to set up and run this project on an Ubuntu server using Docker.

## Prerequisites

Ensure you have Docker and Docker Compose installed on your Ubuntu server.

### Install Docker (if not installed)
```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Setup and Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KauTryKauCuba/jg-employee.git
   cd jg-employee
   ```

2. **Run with Docker Compose:**
   ```bash
   sudo docker compose up -d --build
   ```

3. **Access the application:**
   The application will be running on port **3005**.
   You can access it at `http://your-server-ip:3005`.

## Useful Commands

- **View logs:**
  ```bash
  sudo docker compose logs -f
  ```

- **Stop the application:**
  ```bash
  sudo docker compose down
  ```

- **Update the application (after pushing changes):**
  ```bash
  git pull origin main
  sudo docker compose up -d --build
  ```
