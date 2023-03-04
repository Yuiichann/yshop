interface IMenuItems {
  label: string;
  path: string;
  children?: IMenuItems[];
}

const MenuItems: IMenuItems[] = [
  {
    label: 'trang chủ',
    path: '/',
  },
  {
    label: 'danh mục',
    path: '/danh-muc/all',
    children: [
      {
        label: 'Scale Figure',
        path: '/scale',
      },
      {
        label: 'Nendoroid',
        path: '/nendoroid',
      },
      {
        label: 'Pop Up Parade',
        path: '/pop-up-parade',
      },
      {
        label: 'Figma',
        path: '/figma',
      },
      {
        label: 'R18',
        path: '/r-18',
      },
      {
        label: 'Các loại figure khác',
        path: '/other',
      },
    ],
  },
  {
    label: 'hướng dẫn',
    path: '/huong-dan',
  },
  {
    label: 'giới thiệu',
    path: '/gioi-thieu',
  },
  {
    label: 'liên hệ',
    path: '/lien-he',
  },
];

export default MenuItems;
