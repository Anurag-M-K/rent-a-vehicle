import instance from "../config/axiosInstance";

export const getVehicleTypeByNumberOfWheels = async (number_of_wheels: string, ) => {
    try {
        const res = await instance({
            url: `${import.meta.env.VITE_APP_BACKEND_URL}/api/rent/fetch-vehicle-by-number-of-wheels/${number_of_wheels}`,
            method: 'get',
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchVehiclesByModelType = async (type:string) => {
    try {
        const res = await instance({
            url: `${import.meta.env.VITE_APP_BACKEND_URL}/api/rent/fetch-vehicle-by-model-type/${type}`,
            method: 'GET'
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const bookVehicle = async (payload:any) => {
try {
    const res = await instance({
        url: `${import.meta.env.VITE_APP_BACKEND_URL}/api/rent/book-a-vehicle`,
        method:'POST',
        data:payload
    })
    return res;
} catch (error) {
    return error
}
}