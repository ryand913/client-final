import config from './config';

export default class Data {

  //Define api method - that creates the request using parameters from the helper methods below.
  api(path, method = 'POST', body = null, requiresAuth = false, credentials=null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    if(requiresAuth){
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  //Compare the username and password provided from sign in and authenticate.
  async getUser(username,password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  //Take values from sign in form in the user param and add it to data pass, pending form validation
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

//post course values into database
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true,  { username, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //change the values with the correct authentication
  async updateCourse(course, courseid, username, password) {
    const response = await this.api(`/courses/${courseid}`, 'PUT', course, true, {username, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  async deleteCourse(courseid, username, password) {
    const response = await this.api(`/courses/${courseid}`, 'DELETE', null, true, {username, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
