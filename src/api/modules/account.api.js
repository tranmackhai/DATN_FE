import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";

const accountEndpoints = {
  login: "auth/login",
  register: "auth/register",
  logout: "auth/logout",
  getProfile: "auth/getProfile",
  refreshToken: "auth/refreshToken",
  changeProfile: "auth/changeProfile",
  updatePassword: "auth/changePassword",
  // getInfo: "user/info",
};

const accountApi = {
  login: async ({ gmail, password }) => {
    // try {
    //   const response = await publicClient.post(accountEndpoints.login, {
    //     gmail,
    //     password,
    //   });
    //   // console.log(response);
    //   return { response };
    // } catch (err) {
    //   return { err };
    // }
    const response = await publicClient.post(accountEndpoints.login, {
      gmail,
      password,
    });
    // console.log(response);
    return { response };
  },

  register: async ({ name, password, gmail, phone, role }) => {
    try {
      const response = await publicClient.post(accountEndpoints.register, {
        gmail,
        password,
        name,
        phone,
        role,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  logout: async () => {
    try {
      const response = await publicClient.post(accountEndpoints.logout);
      // console.log(response);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  refreshToken: async () => {
    try {
      const response = await privateClient.post(accountEndpoints.refreshToken);
      // console.log(response);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getProfile: async () => {
    try {
      const response = await privateClient.get(accountEndpoints.getProfile);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  changeProfile: async (body) => {
    try {
      const response = await privateClient.patch(
        accountEndpoints.changeProfile,
        body
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  // getInfo: async ({}) => {
  //   try {
  //     const response = await privateClient.get(accountEndpoints.getInfo);
  //     return { response };
  //   } catch (err) {
  //     return { err };
  //   }
  // },
  updatePassword: async ( body ) => {
    try {
      const response = await privateClient.patch(accountEndpoints.updatePassword, body);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default accountApi;
