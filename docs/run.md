# Run the different components of the solution

## Pre-Requisites
### For the Web App built using nodejs and expressjs
* For this application you need to have [nodejs](https://nodejs.org/en/) installed on your computer with the [npm](https://www.npmjs.com/) installer tool.
* Clone this current repository, or if you want to work on the code, fork it in your own github repository and then clone your forked repository on your local computer. If you used the `fork-repos.sh` script from the [Data & Analytics reference implementation solution](https://github.com/ibm-cloud-architecture/refarch-analytics) main repository, you are already set.

```
git clone https://github.com/ibm-cloud-architecture/refarch-cognitive-analytics
cd refarch-cognitive-analytics/src
npm install
```
* You need to install Angular 4 command line interface if you do not have it yet: see the [cli.angular.io website](http://cli.angular.io) with the following command

 ```
 sudo  npm install -g @angular/cli
 ```
 on Mac, as a global install you need to be `root` user or a "sudoer" user.
* If you want to tune the server code, you need to install [nodemon](https://nodemon.io/) to support server code change without stopping the server. The installation is done with `npm`:
```
sudo npm install -g nodemon
```

## Build
### For the Web App
To build the angular 4 components run the command:
```
$ ng build
or
$ npm run build
```
When involving a continuous integration using Jenkins the jenkins file executes the script in the good order:
```

```
When compiling the angular typescripts the javascript code generated is saved under `dist` folder. It will be packaged when a docker image is built.

## Run
### Run the web application locally

To start the application using node monitoring tool use the command:
```
npm run dev
```
To run in non-development mode
```
npm start
```

The trace should display a message like below with the url to use
```
[1] starting `node server/server server/server`
[1] Server v0.0.1 starting on http://localhost:3001
```

Point your web browser to the url: [http://localhost:3001](http://localhost:3001) to get access to the user interface of the home page.

The demonstration script is described in this [note](docs/demoflow.md)

### Run web app on IBM Cloud Private
