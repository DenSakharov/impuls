import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import Notes from './Notes';

const Demo = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  // function getUser() {
  //   let url_getUser = 'http://${window.location.hostname.toString()}:3010/projects/'
  //   axios({
  //     method: 'get',
  //     url: url_getUser,
  //     headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}
  //   }).then((response: AxiosResponse) => {

  //     // var User = response.data
  //     setNotes(response.data);
  //     // setUserID(User.userid)
  //     // setUserLogin(User.userlogin)
  //     // setUserSurname(User.surname)
  //     // setUserFirstname(User.firstname)
  //     // setUserEmail(User.userEmail)
  //     // setUserDepartment(User.department)
  //   }).catch((reason: AxiosError) => {
  //     console.log(reason)
  //     console.log('1')
  //   })
  // }

  // useEffect(() => {
  //   let userReceived = false
  //   if (!userReceived) {
  //     getUser()
  //     console.log('2')
  //   } 
  //   return () => { userReceived = true; }
  // },[]);

  const fetchData = () => {
     axios
       .get('http://jsonplaceholder.typicode.com/posts')
       .then((response) => {
        setIsLoading(false);
        setNotes(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Список проектов</h1>
      {notes && <Notes data={notes} />}
      {isError && <div>Error fetching data.</div>}
    </div>
  );
};
export default Demo;