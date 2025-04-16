# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the client and server directories into the container
COPY ./client ./client
COPY ./server ./server



ENV REACT_APP_SERVER_IP=http://127.0.0.1:3020
ENV PORT=3020

# Copy the build-run.sh script into the container
COPY ./build-run.sh ./build-run.sh

# Make the build-run.sh script executable
RUN chmod +x ./build-run.sh

# Expose the necessary port (you can change this based on your app's requirements)
EXPOSE 3000

# Command to run the application (adjust this to your needs)
CMD ["./build-run.sh"]
