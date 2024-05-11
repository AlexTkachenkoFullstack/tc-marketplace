import { useEffect, useState } from 'react';
import {
  getFilterBrands,
  getFilterTypes,
  getSelectedCars,
} from 'redux/filter/selectors';
import { useAppSelector } from 'redux/hooks';
import { fetchModelSList, getCarTypes } from 'services/services';

export const useSearchTitleCreator = () => {
  const [title, setTitle] = useState('');

  // const typesArr = useAppSelector(getFilterTypes);
  const brandsArr = useAppSelector(getFilterBrands);
  const selectedCars = useAppSelector(getSelectedCars);

  useEffect(() => {
    const fetchTitle = async () => {
      const {
        transportTypeId,
        brandId: selectedBrandId,
        modelId: selectedModelId,
      } = selectedCars;
      const typesArr = await getCarTypes();
      const modelListArr = await fetchModelSList(
        transportTypeId!,
        selectedBrandId!,
      );

      const typeName = typesArr.find(
        ({ typeId }: any) => typeId === transportTypeId,
      )?.type;

      const brandNames = brandsArr
        .filter(({ brandId }) => selectedBrandId?.includes(brandId))
        .map(item => item.brand)
        .join(', ');

      const modelNames = modelListArr
        .flatMap(({ models }: any) => models)
        .filter(({ modelId }: any) =>
          selectedModelId.some(id => id === modelId),
        )
        .map(({ model }: any) => model)
        .join(', ');

      const newTitle = `${typeName} ${brandNames} ${modelNames}`;
      setTitle(newTitle);
    };

    fetchTitle();
  }, [brandsArr, selectedCars]);

  return title;
};
