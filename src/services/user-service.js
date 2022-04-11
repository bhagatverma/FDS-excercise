import Axios from 'axios';
const userServiceUrl = '/api/login';
const UserService = {
    login: (username,password) => {
        return Axios.post(userServiceUrl, {
            username: username,
            password: password
          })
          .then(function (response) {
            let {status, data} = response;
            return {
              status:status,
              data:data
            };
          })
          .catch(function (error) {
            if (error.response) {
            let {status, data, header} = error.response;
              return {
                status:status,
                data:data,
                header:header
              };
            }
          });
    }
};

export default UserService;