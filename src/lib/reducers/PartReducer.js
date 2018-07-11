import parts from "./parts.json";

const initialState = {
    parts,
    addPartView: false,
    token: '',
    error: '',
    user: false,
    loading: false,
    machineNumberUnitNumberOrRego: '1234567',
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
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
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
                addPartView: false
            };
        case 'FORM_ADD_PART':
            return {
                ...state,
                addPartView: true
            }
        case 'REPLACE_INITIAL_PARTS':
            return {
                ...state,
                parts: action.payload,
                loading: false
            }
        default:
            return state;
    }
}