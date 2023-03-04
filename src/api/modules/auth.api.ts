import publicClient from '../clients/public.clients';

interface IFormDataSignUp {
  username: string;
  password: string;
  displayName: string;
  email: string;
  phone_number: string;
  address: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  };
}

interface IFormDataSignIn {
  username: string;
  password: string;
}

const authEndPoints = {
  signup: () => 'auth/signup',
  signin: () => 'auth/signin',
  refreshToken: () => 'auth/refreshToken',
  signout: () => 'auth/signout',
};

const authApi = {
  signup: async (formData: IFormDataSignUp) => {
    try {
      const response = await publicClient.post(
        authEndPoints.signup(),
        formData
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  signin: async (formData: IFormDataSignIn) => {
    try {
      const response = await publicClient.post(
        authEndPoints.signin(),
        formData
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  resfreshToken: async () => {
    try {
      const response = await publicClient.post(authEndPoints.refreshToken());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  signout: async () => {
    try {
      const response = await publicClient.delete(authEndPoints.signout());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default authApi;
