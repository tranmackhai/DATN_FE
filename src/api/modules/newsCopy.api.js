import publicClient from "../client/public.client.js";

const newsEndpoints = {
  create: "news/create",
  getAll: "news/getAll",
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
};

export default newsApi;
