import React from 'react';
import { Redirect } from 'react-router-dom';

//Redirect a user once they have logged out and had their authenticatedUser state nullified to the user page
export default ({context}) => {
  context.actions.signOut();
  return (
    <Redirect to="/" />
  );
}
  