import publicClient from '../clients/public.clients';

const homeEndpoints = {
  home: () => `home-page`,
};

const homeApi = {
  getHome: async () => {
    try {
      const response = await publicClient.get(homeEndpoints.home());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default homeApi;
