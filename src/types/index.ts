export interface IFigureItem {
  id: string;
  discount: number;
  category:
    | 'scale'
    | 'nendoroid'
    | 'pop-up-parade'
    | 'figma'
    | 'r-18'
    | 'other';
  in_stock: number;
  oldPrice: number;
  price: number;
  publisher?: string;
  series?: string;
  character?: string;
  sold: number;
  scale: string;
  slug: string;
  thumbnail: string;
  title: string;
}

export interface IFigureDetail extends IFigureItem {
  description: string;
  collections: string[];
}

export interface IFigureResponse {
  totalItems: number;
  totalPage: number;
  figures: IFigureItem[];
}

export interface IUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  phone_number: string;
  address: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  };
  avatar: string;
}

export interface ICart {
  figure: IFigureItem | IFigureDetail;
  quantity: number;
}

export interface IShoppingCart {
  total: number;
  items: ICart[];
}

export interface IHomeResponse {
  title: string;
  type: 'slider';
  items: IFigureItem[];
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface ISignUp {
  username: string;
  displayName: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;

  // address
  // province: string;
  // district: string;
  // ward: string;
  detail: string;
}

// provinces Vietnam

export interface IVietNamProvinces {
  code: number;
  codename: string;
  division_type: string;
  name: string;
}

export interface IWardVietNam extends IVietNamProvinces {}

export interface IDistrictVietnam extends IVietNamProvinces {
  wards?: IWardVietNam[];
}

export interface IProvinceVietnam extends IVietNamProvinces {
  districts?: IDistrictVietnam[];
}
