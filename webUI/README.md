# Unfolding the Weave

`docker build -t pattern:latest .`

```
docker run -p 9000:8080 \
--mount type=bind,source="$(pwd)"/data,target=/var/task/data \
pattern:latest`
```
