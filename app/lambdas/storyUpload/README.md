# NAME OF APP

## How to Run Locally

### Start a Docker Container

1. `docker build -t pattern:latest .`
2. Run the container with a the container files bound to the host files. [Link to Docker Volume Mounts](https://docs.docker.com/engine/containers/run/#volume-mounts)  
    `docker run -p 9000:8080 \
--mount type=bind,source="$(pwd)"/data,target=/var/task/data \
pattern:latest`

- The **source path** is a the location on the host that you want to bind mount into the container.
- The **target path** is the mount destination inside the container.

### Make a POST Call

3. Open Postman or use a second terminal `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'`
