import publicClient from "../client/public.client.js";

const uploadEndpoints = {
  uploadSingle: "upload/single",
  uploadMultiple: "upload/multiple",
  deleteImage: "upload/delete",
};

const uploadApi = {
  uploadSingle: async (formData) => {
    try {
      const response = await publicClient.post(
        uploadEndpoints.uploadSingle,
        formData
      );
      return response;
    } catch (err) {
      return err;
    }
  },
  uploadMultiple: async (formData) => {
    try {
      const response = await publicClient.post(
        uploadEndpoints.uploadMultiple,
        formData
      );
      return response;
    } catch (err) {
      return err;
    }
  },
  deleteImage: async (path) => {
    try {
      const response = await publicClient.post(uploadEndpoints.deleteImage, {
        path,
      });
      return response;
    } catch (err) {
      return err;
    }
  },
};

export default uploadApi;
