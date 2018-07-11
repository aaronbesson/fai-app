import { wpApiBaseUrl } from '../../config';
// import firebase from 'firebase';

export const showLoader = () => {
    return {
        type: 'LOADER_SHOW'
    }
}

export const hideLoader = () => {
    return {
        type: 'LOADER_HIDE'
    }
}

export const openDrawer = () => {
    return {
        type: 'OPEN_DRAWER'
    }
}

export const selectPart = (partId) => {
    return {
        type: 'SELECTED_PART',
        payload: partId
    }
}

export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token,
    };
};

export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    };
};

export const formAddPart = () => {
    return {
        type: 'FORM_ADD_PART'
    }
}

export const createNewPart = ({ token, machineNumberUnitNumberOrRego, oilFIlter1, oilFilter2, fuelFilter1, fuelFilter2, airFilterInner, airFilterOuter, hydraulicFilter1, hydraulicFilter2, transmissionFilter, steeringFilter, coolantFilter, cabinAirFilter, serviceInterval, companyName}) => {
    const postTitle = `user-part-entry-${Date.now()}`;
    const newPartUrl =  `${wpApiBaseUrl}/wp/v2/parts?title=${postTitle}&status=publish`;
    const addUrlParams = `${machineNumberUnitNumberOrRego}/${oilFIlter1}/${oilFilter2}/${fuelFilter1}/${fuelFilter2}/${airFilterInner}/${airFilterOuter}/${hydraulicFilter1}/${hydraulicFilter2}/${transmissionFilter}/${steeringFilter}/${coolantFilter}/${cabinAirFilter}/${serviceInterval}/${companyName}`;
    return (dispatch) => {
        fetch(newPartUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((r) => r.json())
        .then((rJson) => {
            // update new part fields
            console.log('add success!');
            let partsFieldUpdate = `${wpApiBaseUrl}/fappconnect/v1/part/update-fields/${rJson.id}/${addUrlParams}`;
            fetch(partsFieldUpdate)
            .then((r) => r.json())
            .then((rjson) => {
                console.log('create fields success')
                dispatch({
                    type: 'CREATE_NEW_PART'
                })
            })
            .catch((e) => console.error(`Error updating new part fields. details: ${e}`));
        })
        .catch((e) => console.error(`Error creating a new part. details: ${e}`));
    }
};

export const replaceInitialParts = () => {
    return (dispatch) => {
        fetch(`${wpApiBaseUrl}/wp/v2/parts`)
        .then((res)=>res.json())
        .then((responseJson) => {
            dispatch({
                type: 'REPLACE_INITIAL_PARTS',
                payload: responseJson
            })
        });
    }
}