import { FireStore } from "../storeFirebase";
import * as ActionTypes from './ActionTypes'

export const LoadProducts = () => {
    return dispatch => {
        FireStore.collection("products").onSnapshot(async (snapshot) => {
            const Products = [];
            snapshot.forEach((doc) => {
                Products.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            dispatch({
                type: ActionTypes.loadProducts,
                payload: Products
            })
        });
    }
}

export const LoadCatagories = () => {
    return dispatch => {
        FireStore.collection("catagories").onSnapshot((snapshot) => {
            const Catagories = [];
            snapshot.forEach((doc) => {
                Catagories.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            dispatch({
                type: ActionTypes.loadCatagories,
                payload: Catagories
            })
        });
    }
}

export const LoadOrders = () => {
    return dispatch => {
        FireStore.collection("orders").onSnapshot(snapshot => {
            const Orders = [];
            snapshot.forEach(doc => {
                doc.data().orders.forEach(order => {
                    Orders.push({
                        userId: doc.id,
                        ...order
                    })
                })
            })
            dispatch({
                type: ActionTypes.loadOrders,
                payload: Orders
            })
        })
    }
}

export const loadUsers = () => {
    return dispatch => {
        FireStore.collection('users').onSnapshot(snapshot => {
            const users = [];
            snapshot.forEach(doc => users.push({ uid: doc.id, ...doc.data() }));
            dispatch({
                type: ActionTypes.loadUsers,
                payload: users
            });
        })
    }
}

export const setUser = (user) => {
    return {
        type: ActionTypes.setUser,
        payload: user
    }
}