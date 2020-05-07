mkdir server
cd server
call npm install
call npm install -g yo
call npm install -g generator-spring-initializr
call yo spring-initializr
cd ../generator
node ServerGenerator.js
