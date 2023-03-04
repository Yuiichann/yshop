import publicClient from '../clients/public.clients';

interface IGetListFigure {
  page?: number;
  search?: string;
  category?: string;
  scale?: string;
  sort?: string;
  range_price?: string;
}

interface IGetDetailFigure {
  slug: string;
}

const figureEndpoints = {
  list: (props: IGetListFigure) => {
    const { page, search, category, scale, sort, range_price } = props;

    const queryPage = page ? `&page=${page}` : '';
    const querySearch = search ? `&search=${search}` : '';
    const queryCategory = category ? `&category=${category}` : '';
    const queryScale = scale ? `&scale=${scale}` : '';
    const queryRangePrice = range_price ? `&range_price=${range_price}` : '';
    const querySort = sort ? `&sort=${sort}` : '';

    return `figures?${queryPage}${queryCategory}${queryRangePrice}${queryScale}${querySearch}${querySort}`;
  },

  detail: ({ slug }: IGetDetailFigure) => `figures/details/${slug}`,
};

const figureApi = {
  getList: async (props: IGetListFigure) => {
    const { page, scale, category, search, sort, range_price } = props;

    try {
      const response = await publicClient.get(
        figureEndpoints.list({
          page,
          scale,
          search,
          sort,
          category,
          range_price,
        })
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getDetail: async ({ slug }: IGetDetailFigure) => {
    try {
      const response = await publicClient.get(figureEndpoints.detail({ slug }));

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default figureApi;
