# rt-fullstack-jobseeker
Mini project for employer to request talent search for their business or project.

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

2. View a list of submitted vacancies

## Framework/technology stack used
* Angular 4
* SASS
* GraphQL
* Express
* MongoDB

## Quick install
```
npm install -g @angular/cli
npm install
```

## Local deployment
```
npm run dev
```
Open http://localhost:4200 on your browser

## Deploy
Make sure you have heroku CLI and account logged in.
```
heroku git:remote -a your-app-name
npm run build
git add .
git commit -m "deploy to heroku"
git push heroku master
```

## Learning and side notes
During development, I saved blogs/material/docs link as I learn and solve problems. It will be my own future references as well as sharing. Please refer [LEARNING.md](https://github.com/tohjg/rt-fullstack-jobseeker/blob/master/LEARNING.md)
