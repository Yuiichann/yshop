import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import homeApi from '../api/modules/home.api';
import BannerSlider from '../components/BannerSlider';
import FigureSlider from '../components/FigureSlider';
import CategoryBanner from '../constants/CategoryBanner.constants';
import { IHomeResponse } from '../types';

const Home = () => {
  const [homeResponse, setHomeResponse] = useState<IHomeResponse[]>();

  useEffect(() => {
    const fetchDataHome = async () => {
      const { response, error } = await homeApi.getHome();

      if (error && error.message) {
        toast.error(error.message);
        return;
      }

      setHomeResponse(response?.data);
    };

    fetchDataHome();
  }, []);

  return (
    <section className="">
      {/* Home banner */}
      <div className="">
        <BannerSlider />
      </div>

      <div className="container">
        {homeResponse &&
          homeResponse.map((item, index) => (
            <div key={item.title} className="mt-8">
              <h1 className="text-2xl font-bold mb-4 tracking-widest">
                {item.title}
                {index === 0 && <span>❤️❤️❤️</span>}
                {index === 1 && <span>💸💸💸</span>}
              </h1>

              <FigureSlider products={item.items} />
            </div>
          ))}
      </div>

      {/* category banner */}
      <div className="max-w-[2460px] mx-auto mt-14">
        <h1 className="text-center text-2xl font-semibold tracking-widest mb-4">
          DANH MỤC SẢN PHẨM
        </h1>
        {CategoryBanner.map((banner, index) => (
          <div className="overflow-hidden" key={index}>
            <Link
              to={banner.link}
              className="block bg-center bg-cover bg-no-repeat pt-[130px] sm:pt-[170px] md:pt-[200px] lg:pt-[330px] xl:pt-[450px] hover:scale-105 effect duration-300"
              style={{ backgroundImage: `url(${banner.banner})` }}
            ></Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
