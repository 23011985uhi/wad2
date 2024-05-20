**Video Link**
Instructions on setup and start of docker containers


## Introduction

This project consisted of 3 main parts with each part having its own section within this report. The first part consisted of breaking down a "monolithic" app (iwtsc) into 3 microservices within docker, consisting of the frontend, backend and the postgresql database. For the next step the postgresql data had to be split with some of the data being stored in a mongodb database in a separate container, resulting in 4 total containers with the original functionality of the app still in effect. The last part of the project involves cross functionality between this now 4 container app (iwtsc) and a different single container app (alevelcomputing) while not impacting the performance of either app.

## Monolith to microservices

The project in its initial state has a ```Dockerfile``` which creates a single docker container as an ubuntu image. The first step was to create a ```docker-compose.yml``` file that would handle the creation of the containers and turn the project into a mutli container application. In the ```yml``` file the containers for frontend, backend and postgresql database are defined as separate services and given their own port numbers. 

![docker-compose img](https://github.com/23011985uhi/wad2/blob/main/docker%20compose%20yaml.PNG)

The image is from the final iteration but still clearly displays the backend service being defined in the ```yml``` file. It shows the directory to get the data for the container, defines the database by name that was already in the previous codebase and installs all dependencies and runs on startup. Since it has an express backend the containers were given a node image as can been see with the ```node: 18-apline``` in the ```yml``` file. The postgresql database was already in use from the initial single container application and so the details had to be included in the ```yml``` file to create the postgresql database container separately. All the database functionality was already present in the ```server.js``` file , utilising the username, sequelise, models and routes to initialise the database on startup. This functionality was unaffected by the containerisation of the database and not many changes had to be made to get all 3 containers running and working to provide the same service as the single container application.

## Addition of MongoDb

The addition of a 4th container required it being defined in the ```docker-compose.yml``` file as another service just as the other containers were. The image used will be ```mongo: latest``` , then given a container name so it can be easily identified and then give the default mongodb port of 27017. After this, to move the "Questions" part of the postgresql data to the mongodb a new mongoose schema is required to define the shape of the data. It replaces the sequalise schema in the ```activity.model.js``` file required for postgresql data and looks like this:

![mongoose schema](https://github.com/23011985uhi/wad2/blob/main/mongoose%20schema.PNG)

After this the data can be manually entered into the mongodb database using the docker desktop interface and mongosh, taking care that it has the same format as the schema defined in the code. Then  in the ```server.js``` the project has to connect to the mongodb container using :

![mongodb in server](https://github.com/23011985uhi/wad2/blob/main/mongo%20in%20server.PNG)

Since the model was updated to mongose schema, the activity.controller.js is now importing the mongoose schema and the question functionality will still work with minimal changes. Now that the mongodb container and database contain the question data, the hardcoded question data within the ```server.js``` can be deleted as it is no longer needed for the postgresql part of the application. 
The ```docker-compose.yml``` has volumes for the postgresql meaning that data is stored long term within docker, the volume was manually deleted and the containers re-built to test if the question data was actually coming from the mongodb database or the old postgresql volume. The video link at the top will show that when the mongodb container is turned off the question data becomes unavailable showing that it is indeed coming from the correct source.

## Iwtsc and alevelcomputing interaction

The last part of the project was to allow access to the alevelcomputing container from the multicontainer service created earlier without impacting the functionality of either. Since the alevelcomputing container was untouched and is not part of the multicontainer application a docker network was required to allow these containers to interact. It can be seen from the earlier images for the service in the ```docker-compose``` file that each service is connected to the network called test-network. This is achieved simply by created teh network through docker commands and manually adding each container with ```docker network connect test-network 'container name'```. All containers on the multicontainer Iwtsc app and the separate iwantostudycomputing app were added to this network so that all parts of both applications would be able to interact. 

![network image](https://github.com/23011985uhi/wad2/blob/main/network.PNG)

Next an Nginx container was created by adding Nginx as a service to the ```docker-compose``` file with an image of ```nginx:latest``` to define it. The Nginx container was then added to the docker network so that all containers would be able to interact with one another. The alevelcomputing app was made accessible through the Iwtsc by the use of an iframe which was activated through a link on the navbar. When accessed through iwtsc the alevelcomputing content requires a login user details while when accessed on its own port it does not require any form of login. 

## Un-achieved goals and personal review

The final goal of this project was to be able to record question attempts made within the iframe of alevelcomputing through iwtsc using nginx as a reverse proxy. I was able to setup nginx and a default config which I thought was connecting the iwtsc frontend to the alevelcomputing backend when the link for each question was clicked within the iframe.

![config](https://github.com/23011985uhi/wad2/blob/main/nginxconfig.PNG)

I wanted to display a custom question & answer page rather than the original route for the question link and populate it with the question data. I could not quite figure out how to do this without altering the alevelcomputing codebase or effecting its functionality and my attempts to achieve this have been removed from the code due to cleaning. I added the login function required to access the iframe through iwtsc as I wanted to tie the question attempt result to the user similar to the iwtsc question format but again did not finish. 

