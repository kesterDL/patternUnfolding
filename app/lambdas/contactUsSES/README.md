# NAME OF APP

## How to Run Locally

### Start a Docker Container

#### Build the Docker Containers

1. Make sure docker is running
2. run build command: `docker build -t <name>:<tag> .`

#### Run the container you built

1. Once the container is built with the latest changes and docker is running
2. Run the container with a the container files bound to the host files. [Link to Docker Volume Mounts](https://docs.docker.com/engine/containers/run/#volume-mounts)  
    `docker run -p 9000:8080 \
contactus:latest`

- The **source path** is a the location on the host that you want to bind mount into the container.
- The **target path** is the mount destination inside the container.

### Make a POST Call

3. Open Postman or use a second terminal `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'`
