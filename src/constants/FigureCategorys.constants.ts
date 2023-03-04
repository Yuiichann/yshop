interface IFigureCategorys {
  label: string;
  value: string;
}

const FigureCategorys: IFigureCategorys[] = [
  {
    label: 'Tất cả',
    value: '',
  },
  {
    label: 'Scale Figure',
    value: 'scale',
  },
  {
    label: 'Nendoroid',
    value: 'nendoroid',
  },
  {
    label: 'Pop Up Parade',
    value: 'pop-up-parade',
  },
  {
    label: 'Figma',
    value: 'figma',
  },
  {
    label: 'R-18',
    value: 'r-18',
  },
  {
    label: 'Các loại figure khác',
    value: 'other',
  },
];

export default FigureCategorys;
