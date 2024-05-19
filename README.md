**Video Link**
Instructions on setup and start of docker containers


## Introduction

This project consisted of 3 main parts with each part having its own section within this report. The first part consisted of breaking down a "monolithic" app into 3 microservices within docker, consisting of the frontend, backend and the postgresql database. For the next step the postgresql data had to be split with some of the data being stored in a mongodb database in a separate container, resulting in 4 total containers with the original functionality of the app still in effect. The last part of the project involves cross functionality between this now 4 container app and a different single container app while not impacting the performance of either app.

## Monolith to microservices

The project in its initial state has a ```Dockerfile``` which creates a single docker container as an ubuntu image. The first step was to create a ```docker-compose.yml``` file that would handle the creation of the containers and turn the project into a mutli container application. In the ```yml``` file the services can be defined to separate what is in each container and how the frontend, backend and postgresql database will be defined.

![docker-compose img](https://github.com/23011985uhi/wad2/blob/main/docker%20compose%20yaml.PNG)

The image is from the final iteration but still clearly displays the backend service being defined in the yml file , it shows the directory to get the data from for the container and...
