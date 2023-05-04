import publicClient from "../client/public.client.js";

const studentEndpoints = {
  login: "auth/login",
  register: "auth/register",
  // getInfo: "user/info",
  // passwordUpdate: "user/update-password",
};

const studentApi = {
  login: async ({ gmail, password }) => {
    try {
      const response = await publicClient.post(studentEndpoints.login, {
        gmail,
        password,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  register: async ({ name, password, gmail, phone }) => {
    try {
      const response = await publicClient.post(studentEndpoints.register, {
        gmail,
        password,
        name,
        phone,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // getInfo: async ({}) => {
  //   try {
  //     const response = await privateClient.get(studentEndpoints.getInfo);
  //     return { response };
  //   } catch (err) {
  //     return { err };
  //   }
  // },
  // passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
  //   try {
  //     const response = await privateClient.put(studentEndpoints.register, {
  //       password,
  //       newPassword,
  //       confirmNewPassword,
  //     });
  //     return { response };
  //   } catch (err) {
  //     return { err };
  //   }
  // },
};

export default studentApi;
