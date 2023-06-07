import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";

const newsEndpoints = {
  create: "news/create",
  getAll: "news/getAll",
  getByUser: "news/getByUser",
  delete: "news/",
};

const newsApi = {
  create: async ({
    title,
    thumbnail,
    content,
    slug,
    accountId,
    type,
    isActive,
  }) => {
    try {
      const response = await publicClient.post(newsEndpoints.create, {
        title,
        thumbnail,
        content,
        slug,
        accountId,
        type,
        isActive,
      });
      return response;
    } catch (err) {
      return err;
    }
  },
  getAll: async (params) => {
    try {
      const response = await publicClient.get(newsEndpoints.getAll, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },
  getByUser: async (params) => {
    try {
      const response = await privateClient.get(newsEndpoints.getByUser, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },
  delete: async (id) => {
    try {
      const response = await privateClient.delete(newsEndpoints.delete + id);
      return response;
    } catch (err) {
      return err;
    }
  },
};

export default newsApi;
