import parts from "./parts.json";

const initialState = {
    title: 'My Parts List',
    token: '',
    parts,
    addPartView: false,
    error: '',
    user: false,
    loading: false,
    machineNumberUnitNumberOrRego: 'Testing add with fields 6',
    oilFIlter1: 'test oil filter 1',
    oilFilter2: 'test oil filter 2',
    fuelFilter1: 'test fuel filter 1',
    fuelFilter2: 'test fuel filter 2',
    airFilterInner: 'test air filter inner',
    airFilterOuter: 'test air filter outer',
    hydraulicFilter1: 'test hydraulic filter 1',
    hydraulicFilter2: 'test hydraulic filter 2',
    transmissionFilter: 'test transmission filter',
    steeringFilter: 'test steering filter',
    coolantFilter: 'test cooland filter',
    cabinAirFilter: 'test cabin filter',
    serviceInterval: 'test service interval',
    companyName: 'test comapny name',
    partCreated: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'UPDATE_TITLE':
            return {
                ...state,
                title: action.payload
            };
        case 'LOADER_SHOW':
            return {
                ...state,
                loading: true
            };
        case 'LOADER_HIDE':
            return {
                ...state,
                loading: false
            };
        case 'OPEN_DRAWER':
            return {
                ...state,
                drawerOpen: true
            };
        case 'FORM_UPDATE':
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        case 'CREATE_NEW_PART':
            return {
                ...state,
                loading: false,
                addPartView: false,
                title: 'My Parts List'
            };
        case 'FORM_ADD_PART':
            return {
                ...state,
                addPartView: true
            };
        case 'REPLACE_INITIAL_PARTS':
            return {
                ...state,
                parts: action.payload,
                loading: false
            };
        case 'ERROR_FETCHING_PARTS':
            return {
                ...state,
                parts,
                loading: false,
                error: action.payload
            };
        case 'PART_FORM_SHOW':
            return {
                ...state,
                addPartView: true
            };
        case 'PART_FORM_HIDE':
            return {
                ...state,
                addPartView: false
            };
        case "UPDATE_ERROR_MESSAGE":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}