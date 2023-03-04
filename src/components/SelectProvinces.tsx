import { memo, useEffect, useState } from 'react';
import ProvincesVietnam from '../constants/VietnamProvinces.json';
import CustomSelect from '../custom/CustomInputProvinces';
import { IDistrictVietnam, IProvinceVietnam, IWardVietNam } from '../types';

interface Props {
  setAddress: React.Dispatch<
    React.SetStateAction<{
      province: string;
      district: string;
      ward: string;
    }>
  >;
}

const SelectProvinces = ({ setAddress }: Props) => {
  const provinceList: IProvinceVietnam[] = ProvincesVietnam; // lấy dữ liệu từ file json
  const [districtList, setDistrictList] = useState<IDistrictVietnam[]>(); // list quận huyện
  const [wardList, setWardList] = useState<IWardVietNam[]>(); // líst phường xã

  const [provinceSelected, setProvinceSelected] = useState<IProvinceVietnam>(
    provinceList[0]
  ); // tỉnh thành phố hiện tại ?
  const [districtSelected, setDistrictSelected] = useState<IDistrictVietnam>(); // quận huyện hiện tại
  const [wardSelected, setWardSelected] = useState<IWardVietNam>(); // phường xã hiện tại

  // xử lý khi tỉnh thay đổi thì update lại list quận huyện
  useEffect(() => {
    if (provinceSelected && provinceSelected.districts) {
      setDistrictList(provinceSelected.districts);
      setDistrictSelected(provinceSelected.districts[0]);
    }
  }, [provinceSelected]);

  // khi quận huyện thay đổi thì update lại list phường, xã
  useEffect(() => {
    if (districtSelected && districtSelected.wards) {
      setWardList(districtSelected.wards);
      setWardSelected(districtSelected.wards[0]);
    }
  }, [districtSelected]);

  useEffect(() => {
    setAddress({
      province: provinceSelected.name,
      district: districtSelected?.name || '',
      ward: wardSelected?.name || '',
    });
  }, [provinceSelected, districtSelected, wardSelected, setAddress]);

  return (
    <div className="">
      <CustomSelect
        listOptions={provinceList}
        selected={provinceSelected}
        setSelected={setProvinceSelected}
      />

      {districtSelected && districtList && (
        <CustomSelect
          listOptions={districtList}
          selected={districtSelected}
          setSelected={setDistrictSelected}
        />
      )}

      {wardSelected && wardList && (
        <CustomSelect
          listOptions={wardList}
          selected={wardSelected}
          setSelected={setWardSelected}
        />
      )}
    </div>
  );
};

export default memo(SelectProvinces);
