import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";

    const addToCart = async (itemId) => {
        // Update local state
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        // Update backend
        if (token) {
            try {
                const response = await axios.post(url + "/api/cart/add", { productId: itemId, quantity: 1 }, { headers: {Authorization: `Bearer ${token}`}});
                if (!response.data.success) {
                    console.error("Failed to add to cart:", response.data.message);
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    }

    const removeFromCart = async (itemId) => {
        // Update local state
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });

        // Update backend
        if (token) {
            try {
                const response = await axios.post(url + "/api/cart/remove", { productId: itemId, quantity: 1 }, { headers: {Authorization: `Bearer ${token}`}});
                if (!response.data.success) {
                    console.error("Failed to remove from cart:", response.data.message);
                }
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchProductList = async () => {
        try {
            const response = await axios.get(url + "/api/meat/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: {Authorization: `Bearer ${token}`}});
            if (response.data.success) {
                const fetchedItems = response.data.cartItems.reduce((acc, item) => {
                    acc[item.productId._id] = item.quantity; // Ensure productId is correctly referenced
                    return acc;
                }, {});
                setCartItems(fetchedItems);
            } else {
                console.error("Failed to load cart data:", response.data.message);
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    }    

    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;