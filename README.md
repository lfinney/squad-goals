# Squad Goals

_Application Status: In development_

**Abstract:** Squad Goals is an application geared towards helping groups of
people join groups and issue goal challenges to on another. Through this, groups
of friends can provide some positive peer pressure to help one another stay
accountable to the goals they set.

## Stack
- Backend - PostgreSQL database linked to Node-Express server via Knex
- Frontend - React frontend via the create-react-app npm

## Backend
- Schema designed using dbdesigner.net:
![squad-goals-schema](https://user-images.githubusercontent.com/22566946/34962195-f2f2d8ea-f9ff-11e7-89d9-fa3c196cac35.png)
- Uses Google Firebase for OAuth as well as leveraging a user's Firebase id to retrieve and serve up user specific information while using the site.

## Frontend
- Frontend designed to be mobile-first
- React-Router used to facilitate user navigation


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
