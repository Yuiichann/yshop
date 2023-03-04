import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

interface Props {
  path: {
    label: string;
    url?: string;
  }[];
}

const Breadcumb = ({ path }: Props) => {
  return (
    <nav className="mb-2">
      <div className="container">
        <ul className="py-2 text-sub-color tracking-wide text-16 flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary effect">
              <AiFillHome className="" />
            </Link>
          </li>

          <li className="select-none">/</li>

          {path.map((item, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <li key={index}>
                {item.url ? (
                  <Link
                    to={item.url}
                    className="hover:text-primary effect capitalize line-clamp-1"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="select-none line-clamp-1">{item.label}</span>
                )}
              </li>

              {index + 1 !== path.length && <li className="select-none">/</li>}
            </div>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default memo(Breadcumb);
