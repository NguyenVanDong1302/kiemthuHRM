import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGeneralData } from 'store/reducers/generalData';
import * as localization_service from 'services/localization_service'
export const useLocalization = (cate) => {
    const dispatch = useDispatch();

    let localizationData = useSelector((state) => state.generalData["localization"]);

    const localizer = (str) => {
        if (!str || str == '') return str;

        if (!localizationData) return str;

        let added = true;
        if (!localizationData.hasOwnProperty(cate)) {

            localizationData = JSON.parse(JSON.stringify(localizationData));
            localizationData[cate] = {}
            localizationData[cate][str] = str;

            added = false;
        }
        else if (!localizationData[cate].hasOwnProperty(str)) {
            added = false;

            localizationData = JSON.parse(JSON.stringify(localizationData));
            localizationData[cate][str] = str;

        }
        if (!added)
            localization_service.addData(localizationData).then(resp => {
                dispatch(setGeneralData({ key: "localization", value: resp }));
                localizationData = resp;
            });

        return localizationData[cate][str];


    };

    return localizer;
};
