import { wpApiBaseUrl } from '../../config';

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const updateTitle = (title) => {
    return {
        type: 'UPDATE_TITLE',
        payload: title
    }
}

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

export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    };
};

export const showAddPartForm = () => {
    return {
        type: 'PART_FORM_SHOW'
    }
}

export const hideAddPartForm = () => {
    return {
        type: 'PART_FORM_HIDE'
    }
}

export const createNewPart = ({ token, machineNumberUnitNumberOrRego, oilFIlter1, oilFilter2, fuelFilter1, fuelFilter2, airFilterInner, airFilterOuter, hydraulicFilter1, hydraulicFilter2, transmissionFilter, steeringFilter, coolantFilter, cabinAirFilter, serviceInterval, companyName}) => {
    const postTitle = machineNumberUnitNumberOrRego;
    const newPartUrl =  `${wpApiBaseUrl}/wp/v2/parts?title=${postTitle}&status=publish`;
    const addUrlParams = `${machineNumberUnitNumberOrRego.replace(/ /g,"-")}/${oilFIlter1.replace(/ /g,"-")}/${oilFilter2.replace(/ /g,"-")}/${fuelFilter1.replace(/ /g,"-")}/${fuelFilter2.replace(/ /g,"-")}/${airFilterInner.replace(/ /g,"-")}/${airFilterOuter.replace(/ /g,"-")}/${hydraulicFilter1.replace(/ /g,"-")}/${hydraulicFilter2.replace(/ /g,"-")}/${transmissionFilter.replace(/ /g,"-")}/${steeringFilter.replace(/ /g,"-")}/${coolantFilter.replace(/ /g,"-")}/${cabinAirFilter.replace(/ /g,"-")}/${serviceInterval.replace(/ /g,"-")}/${companyName.replace(/ /g,"-")}`;
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
            console.log('post created');
            console.log(addUrlParams);
            let partsFieldUpdate = `${wpApiBaseUrl}/fappconnect/v1/part/update-fields/${rJson.id}/${addUrlParams}`;
            fetch(partsFieldUpdate, {method: 'GET'})
            .then((r) => r.json())
            .then((rjson) => {
                console.log(rjson);
                dispatch({
                    type: 'CREATE_NEW_PART'
                })
            })
            .catch((e) => console.error(`Error updating new part fields. details: ${e}`));
        })
        .catch((e) => console.error(`Error creating a new part. details: ${e}`));
    }
};

export const errorFetchingParts = () => {
    return {
        type: 'ERROR_FETCHING_PARTS',
        payload: 'Something went wrong fetching parts data.'
    }
}

export const replaceInitialParts = () => {
    return (dispatch) => {
        fetch(`${wpApiBaseUrl}/wp/v2/parts?author=5&per_page=50`)
        .then((res)=>res.json())
        .then((responseJson) => {
            dispatch({
                type: 'REPLACE_INITIAL_PARTS',
                payload: responseJson
            })
        }).catch((err) => {
            console.log(err);
            errorFetchingParts();
        })
    }
}

export const updateErrorMessage = (errorString) => {
    return {
        type: 'UPDATE_ERROR_MESSAGE',
        payload: errorString
    }
}