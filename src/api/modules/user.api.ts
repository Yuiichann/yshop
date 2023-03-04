import privateClient from '../clients/private.clients';

interface IFormDataUpdatePassword {
  password: string;
  newPassword: string;
  confirm_newPassword: string;
}

const userEndpoints = {
  info: () => `users/info`,
  updatePassword: () => 'users/update-password',
};

const userApi = {
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.info());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  updatePassword: async (formData: IFormDataUpdatePassword) => {
    try {
      const response = await privateClient.put(
        userEndpoints.updatePassword(),
        formData
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default userApi;
