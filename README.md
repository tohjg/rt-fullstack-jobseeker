# rt-fullstack-jobseeker
Mini project for employer to request talent search for their business or project to recruitment consultant.

## Objective
Basic job vacancy submission form, where clients can send us details of job vacancies that they would like us to help fill.

## Demo
Check out live app @ https://rt-fullstack-job.herokuapp.com/

## Features
1. Submit new vacancies which contents:
    * Existing form fields (such as Company contact person, number and email)
    * Skills related to the vacancy (can be from list of industry skills - e.g. IT industry skills)
    * Salary range
    * Job location
    * Form validation

2. View a list of submitted vacancies

## Framework/technology stack used
* Angular 4
* CSS/SASS + Bootstrap 4
* GraphQL
* Express
* MongoDB

## Quick install
```
# clone this repository
git clone https://github.com/tohjg/rt-fullstack-jobseeker
cd rt-fullstack-jobseeker

# install Angular CLI
npm install -g @angular/cli

# install add required dependencies
npm install
```

## Local deployment
```
# run development environment for frontend and backend
npm run dev

# run development environment for backend
npm run dev:backend
```

## Deploy
Make sure you have Heroku CLI and account logged in. Create an app on Heroku
```
heroku git:remote -a your-app-name
npm run build-and-deploy
git add .
git commit -m "deploy to heroku"
git push heroku master
```

## Learning and side notes
During development, I saved blogs/material/docs link while learning and solving problems. It will be my own future references as well as sharing. Please refer [LEARNING.md](https://github.com/tohjg/rt-fullstack-jobseeker/blob/master/LEARNING.md)
