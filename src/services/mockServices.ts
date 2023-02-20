import type { IEquipment, IHistoryLogs, IOrderDetails } from "../types";

const BASE_URL = 'http://localhost:5000';

// get data for all equipments
export const getEquipments = async () => {
    const response = await fetch(`${BASE_URL}/equipments`);

    return response.json();
};

// get data for an equipment with provided id
export const getEquipment = async (id: string) => {
    const response = await fetch(`${BASE_URL}/equipments/${id}?_embed=orders&_embed=historyLogs`);

    return response.json();
};

// Function to update equiment entity
export const updateEquipment = async (payload: IEquipment) => {
    const { id, ...body } = payload;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    const response = await fetch(`${BASE_URL}/equipments/${id}`, requestOptions); 

    return response.json();
};

// Function to update history entity
export const updateHistoryLogs = async (payload: IHistoryLogs) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    const response = await fetch(`${BASE_URL}/historyLogs`, requestOptions);

    return response.json();
};

// Function to update order entity
export const updateOrders = async (payload: IOrderDetails) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    const response = await fetch(`${BASE_URL}/orders`, requestOptions);

    return response.json();
};