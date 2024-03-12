const storeToken = (value) => {
    if (value) {
      // console.log("Store Token")
      const { access, refresh } = value
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
    }
  }
  
  const getToken = () => {
    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')
    return { access_token, refresh_token }
  }
  
  const removeToken = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  const storeMode = (value) => {
    if (value) {
      localStorage.setItem('mode', value);
    } else {
      localStorage.setItem('mode', 'false');
    }
  };
  
  const getMode = () => {
    let mode = localStorage.getItem('mode');
    return mode; // Return the value directly, not as an object
  };
  const storeActive_Course = (value) =>{
    if (value){
      localStorage.setItem('courseinfo', value);
    }
    else{
      localStorage.setItem('courseinfo', '');
    }
  }
  const getCourse = () =>{
    let courseinfo = localStorage.getItem('courseinfo')
    return courseinfo ? courseinfo : "";
  }
  export { storeToken, getToken, removeToken, storeMode, getMode , storeActive_Course, getCourse}



