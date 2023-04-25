import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSavingData, LocalizationCate } from "store/reducers/localization";
export const useLocalization = (cate: string) => {
  const dispatch = useDispatch();

  let localizationData: LocalizationCate = useSelector(
    (state: any) => state.localizationData.saved
  );

  const localizer = (str: string) => {
    if (!str || str == "") return str;

    let added = true;

    if (!localizationData) return str;

    var ret: string = str;

    if (!localizationData.hasOwnProperty(cate)) {
      //localizationData[cate] = [{ key: str, value: str }]
      added = false;
    } else {
      let cateValues = localizationData[cate];

      let ext = cateValues.find((v) => v.key == str);

      if (!ext) {
        added = false;
        //cateValues.push({ key: cate, value: cate });
      } else {
        ret = ext.value ? ext.value : str;
      }
    }

    if (!added) {
      dispatch(addSavingData({ cate: cate, value: str }));
    }
    // if (!added)
    //     localization_service.addData(localizationData).then(resp => {
    //         dispatch(setGeneralData({ key: "localization", value: resp }));
    //         localizationData = resp;
    //     });

    return ret;
  };

  return localizer;
};
