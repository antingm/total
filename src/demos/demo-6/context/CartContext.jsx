import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (plan) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === plan.id);
            if (existing) {
                return prev.map(item =>
                    item.id === plan.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...plan, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (planId) => {
        setCartItems(prev => prev.filter(item => item.id !== planId));
    };

    const updateQuantity = (planId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(planId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === planId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
