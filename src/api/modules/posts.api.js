import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";

const postsEndpoints = {
  create: "posts/create",
  getAll: "posts/getAll",
  getById: "posts/getById",
  getByUser: "posts/getByUser",
  delete: "posts/",
};

const postsApi = {
  create: async (params) => {
    try {
      const response = await privateClient.post(postsEndpoints.create, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },

  getAll: async (params) => {
    try {
      const response = await privateClient.get(postsEndpoints.getAll, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },

  getById: async (id) => {
    try {
      const response = await privateClient.get(
        `${postsEndpoints.getById}/${id}`
      );
      return response;
    } catch (err) {
      return err;
    }
  },

  getByUser: async (params) => {
    try {
      const response = await privateClient.get(postsEndpoints.getByUser, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },

  delete: async (id) => {
    try {
      const response = await privateClient.delete(postsEndpoints.delete + id);
      return response;
    } catch (err) {
      return err;
    }
  },
};

export default postsApi;
