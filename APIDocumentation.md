# API Documentation

# Fetch API

In creating our website, we utilized Fetch to make requests and handle responses. 

Our endpoints include the following:

1) `post` to `/signup`
- request passes a body containing what the user types into the input fields 
- response checks that the data entered isn't `null`; if it is not `null`, a new user will be added to the users data-store and a 200 OK will be sent
- if it is `null`, a 404 will be sent
- once the response is recieved, the `.then()` of the request will navigate the user back to the sign-in page, where they are now able to sign in with their new credentials

2) `get` from `/currentUser`
- request does not send anything besides specifications for `same-origin` and what type of object should be accepted with `credentials` and `headers`
- response returns a json representation of the current session user

3) `get` from `/currentUserData`
- request is made on profile page to get user info
- the session user info is checked and return as a json response

4) `post` to `/login`
- request passes a body containing what the user typed into the username and password fields
- if the user is `null` a 404 is sent
- else, if the user has the correct password the session user is set to be that user
- else, a 403 is sent

5) `post` to `/recipe`
- when user attempts to create a new recipe, a request is made with a body containing what the user entered into the input fields
- a new `Recipe` object is created
- if the recipe is `null`, a 400 is sent
- else, a json representation of the recipe is sent

6) `put` to `/recipe/:id`
- sends a body with the values entered into the recipe edit form
- the request params are used to find the recipe by ID
- the properties of the found recipe are updated
- a json representation of the new recipe is the response

7) `delete` from `/recipe/:id`
- request asks to delete recipe with current id
- the `Recipe` method to delete is called, which removes the recipe from the recipes data-store

8) `get` from `/logout/`
- request to logout is made
- the current session user is cleared


# Google Maps API

- utilizes `google.maps.Map` and corresponding tools to render a google map and set markers and labels at certain latitudes and longitudes