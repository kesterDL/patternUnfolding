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

```
{
    "type": "person_to_place",
    "persons": ["aldrin caldevwin", "galladrian", "barthanes"],
    "connection": ["cairhien"]
}

{
    "type": "person_to_person",
    "persons": ["bayle domon", "egeanin", "turak"],
    "connections": ["huan"]
}

{
  "type": "new_person",
  "name": "lamgwin dorn",
  "role": "Bouncer at The Queen's Blessing",
  "people": ["rand al'thor", "matrim cauthon", "basil gill"],
  "places": ["the queen's blessing"],
  "things": [],
  "description": "Heavy lidded eyes and bullish bulk with sunken knuckles, but can move like a cat. Thinks the queen is the light made flesh."
}

{
  "type": "update_person",
  "name": "cloud",
  "description": "Horse Rand rode out of Emond's field, that loved to run. Rand was forced to abandoned him outside shadar logoth. Assumed to be eaten by trollocs."
}

{
  "type": "person_to_thing",
  "persons": ["moiraine damodred"],
  "things": ["woman in flowing robes"]
}

```
