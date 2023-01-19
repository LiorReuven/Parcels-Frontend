# Parcels Management App

I created this application to give a solution for many problems private stores and companies that serve as a delivery pickup-point face,
there is a lack of management and control over the parcels that go in and out of the store,
in stores such as the one in the images below, you can have a monthly traffic of thousands of parcels,
without a management application, the store cannot know how many parcels came in, how many have been released, and from which delivery company. You cannot solve any dispute that may arise. You don't even have a tool that will point you to the correct storage unit of a parcel.
This parcels management app solves all of that but also more, reducing the average time it takes to give the customer his parcel, preventing potential errors and mistakes from workers at the store,
and giving full historical data of each parcel that has ever entered the store.

## Features

### General:

- Full historical data of every parcel including all vital information
- Storage units management allows you to add/edit and assign parcels
- Quick parcels release - takes you directly to the proper parcel release form, reducing the waiting time of customers
- Reports - print a monthly report of either all parcels or parcels of a specific delivery company
- Multiple error preventing measures(preventing human made errors)
- Storage unit auto assigns itself to a specific delivery company based on parcels inserted
- Live application - can be opened on multiple computers,changes will be updates automatically(no refresh needed)

### Technicalities:
- Made with ReactJs and NodeJs
- MongoDB
  - mongoose
  - users database
  - parcels databse
  - storage units database
- React-Redux
   -Redux persist 
   -Redux toolkit 
   -async api calls from redux(async thunk)
   -multiple global states management and manipulation
- React Howler - for sound queues
- React-To-print
- Css-Modules
- Socket.io
- React Router
- Authentication
  -Jsonwebtoken(with middleware)
- Bcrypt

## Images

I did not want to bloat the file with images,please check them on my portfolio website here:[Parcels App Page](https://lior-reuven.netlify.app/main_projects/6)


