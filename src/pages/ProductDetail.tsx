import { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import figureApi from '../api/modules/figure.api';
import Breadcumb from '../components/Breadcumb';
import { ProductNotFound } from '../components/Error';
import ImageGallery from '../components/ImageGallery';
import Loading from '../components/Loading';
import { IFigureDetail } from '../types';
import formatPrice from '../utils/formatPrice';

const ProductDetail = () => {
  const { slug } = useParams();

  const [figure, setFigure] = useState<IFigureDetail>();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState();

  // fetch data figure
  useEffect(() => {
    if (!slug) {
      return;
    }

    const fetchDataFigure = async () => {
      const { response, error } = await figureApi.getDetail({ slug });

      if (error && error.message) {
        setErr(error.message);
        setFigure(undefined);
        setIsLoading(false);
        return;
      }

      if (response && response.status === 200) {
        setFigure(response.data);
        setErr(undefined);
        setIsLoading(false);
      }
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
    fetchDataFigure();
  }, [slug]);

  return (
    <section className="mt-12">
      {/* breacumb */}
      <Breadcumb
        path={
          figure
            ? [
                { label: figure.category, url: `/danh-muc/${figure.category}` },
                { label: figure.title },
              ]
            : []
        }
      />

      <div className="container select-none">
        {isLoading ? (
          <Loading />
        ) : err ? (
          <ProductNotFound error={err} />
        ) : (
          figure && (
            <>
              {/* image and info */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* gallery */}
                <div className="w-full md:w-2/5 select-none">
                  <div className="sticky left-0 top-0 pt-1">
                    {figure.collections.length > 0 && (
                      <ImageGallery
                        collections={figure.collections}
                        alt={figure.slug}
                      />
                    )}
                  </div>
                </div>

                {/* info figure */}
                <div className="flex-1">
                  <div>
                    {/* title */}
                    <h1 className="text-2xl text-center md:text-left font-medium tracking-wider my-6">
                      {figure.title}
                    </h1>

                    {/* price */}
                    <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                      {figure.discount > 0 && (
                        <>
                          <span className="bg-[#f9f9f9] rounded-md text-red-500 py-2 px-4 text-14 font-semibold shadow-sm">
                            -{figure.discount}%
                          </span>
                          <span className="text-sub-color tracking-wide relative after:absolute after:inset-x-0 after:top-1/2 after:-translate-y-1/2 after:bg-black after:h-[2px]">
                            {formatPrice(figure.oldPrice)}
                          </span>
                        </>
                      )}
                      <span className="text-2xl text-red-500 tracking-wide font-bold">
                        {formatPrice(figure.price)}
                      </span>
                    </div>

                    {/* button cart */}
                    <div className="flex items-center gap-4 mt-6">
                      <button className="flex-1 md:flex-none md:w-[200px] h-10 px-2 py-4 flex gap-2 items-center justify-center bg-red-500 border border-red-500 text-white rounded-sm font-semibold uppercase tracking-wide hover:opacity-80 effect">
                        <BsCartCheck />
                        <span>Mua ngay</span>
                      </button>
                      <button className="flex-1 md:flex-none md:w-[200px] text-red-500 h-10 px-2 py-4 flex gap-2 items-center justify-center border border-red-500 rounded-sm font-medium uppercase tracking-wide hover:bg-red-500 hover:text-white effect">
                        <FaCartPlus />
                        <span>Th??m v??o gi???</span>
                      </button>
                    </div>

                    {/* ch??nh s??ch ?????m b???o */}
                    <div className="mt-8">
                      <h5 className="mb-4 text-xl text-center md:text-left font-medium tracking-wide">
                        Ch??nh s??ch ?????m b???o & ??i???u kho???n
                      </h5>

                      <ul className="pl-0 md:pl-4">
                        <li className="flex items-center gap-2 pb-2">
                          <AiOutlineCheck className="text-primary font-bold text-xl min-w-[30px]" />
                          <span className="font-medium tracking-wide">
                            S???n ph???m ch??nh h??ng t??? Nh???t B???n.
                          </span>
                        </li>

                        <li className="flex items-center gap-2 pb-2">
                          <AiOutlineCheck className="text-primary font-bold text-xl min-w-[30px]" />
                          <span className="font-medium tracking-wide">
                            Giao h??ng t???n n??i.
                          </span>
                        </li>

                        <li className="flex items-center gap-2 pb-2">
                          <AiOutlineCheck className="text-primary font-bold text-xl min-w-[30px]" />
                          <span className="font-medium tracking-wide">
                            Mi???n ph?? ship v???i c??c ????n h??ng &gt; 1 Tri???u.
                          </span>
                        </li>

                        <li className="flex items-center gap-2 pb-2">
                          <AiOutlineCheck className="text-primary font-bold text-xl min-w-[30px]" />
                          <span className="font-medium tracking-wide">
                            Vui l??ng ki???m tra s???n ph???m khi nh???n b??u ki???n.
                          </span>
                        </li>

                        <li className="flex items-center gap-2 pb-2">
                          <AiOutlineCheck className="text-primary font-bold text-xl min-w-[30px]" />
                          <span className="font-medium tracking-wide">
                            V???i ????n h??ng l???n h??n 10 tri???u. Qu?? kh??ch vui l??ng
                            li??n h??? v???i admin th??ng qua zalo ho???c messenger ?????
                            x??c nh???n ?????t h??ng!
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* info: char, publisher, series, ... */}
                    <div className="mt-8 select-text">
                      <h5 className="mb-2 text-xl text-center md:text-left font-medium tracking-wide">
                        Th??ng tin chi ti???t
                      </h5>

                      <table className="table-fixed border-y w-full">
                        <tbody className="flex flex-col gap-4 py-2">
                          <tr>
                            <td className="min-w-[130px] font-medium">
                              Danh m???c:
                            </td>
                            <td>
                              <Link
                                to={`/danh-muc/${figure.category}`}
                                className="capitalize italic hover:text-primary effect"
                              >
                                {figure.category === 'other'
                                  ? 'C??c lo???i figure kh??c'
                                  : figure.category}
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td className="min-w-[130px] font-medium">
                              T??nh tr???ng:
                            </td>
                            <td className="capitalize">M???i 100%</td>
                          </tr>

                          <tr>
                            <td className="min-w-[130px] font-medium">
                              T??? l???:
                            </td>
                            <td className="capitalize">{figure.scale}</td>
                          </tr>

                          {figure.series && (
                            <tr>
                              <td className="min-w-[130px] font-medium">
                                Series:
                              </td>
                              <td>{figure.series}</td>
                            </tr>
                          )}

                          {figure.publisher && (
                            <tr>
                              <td className="min-w-[130px] font-medium">
                                Nh?? s???n xu???t:
                              </td>
                              <td>{figure.publisher}</td>
                            </tr>
                          )}

                          {figure.character && (
                            <tr>
                              <td className="min-w-[130px] font-medium">
                                Nh??n v???t:
                              </td>
                              <td>
                                <Link
                                  to={`/tim-kiem?q=${figure.character}`}
                                  className="italic hover:text-primary effect"
                                >
                                  {figure.character}
                                </Link>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* figure li??n quan */}
              <div className="mt-12">
                <div className="flex justify-center mb-8">
                  <h3 className="text-2xl font-semibold tracking-wider text-center relative after:absolute after:inset-x-0 after:top-full after:h-[2px] after:bg-primary">
                    S???n ph???m li??n quan
                  </h3>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
