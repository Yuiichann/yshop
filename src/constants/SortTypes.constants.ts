const SortTypes = [
  {
    label: 'Tên: A-Z',
    value: 'title',
  },
  {
    label: 'Tên: Z-A',
    value: 'title,desc',
  },
  {
    label: 'Bán chạy nhất',
    value: 'sold,desc',
  },
  {
    label: 'Mới nhất',
    value: 'createdAt,desc',
  },
  {
    label: 'Cũ nhất',
    value: 'createdAt',
  },
  {
    label: 'Giá: Tăng dần',
    value: 'price',
  },
  {
    label: 'Giá: Giảm dần',
    value: 'price,desc',
  },
];

export default SortTypes;
