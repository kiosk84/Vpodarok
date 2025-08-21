
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { OrderDetails } from '../types';

interface OrderContextType {
    orderDetails: OrderDetails;
    setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetails>>;
    resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialOrderDetails: OrderDetails = {
    categoryId: undefined,
    selectedOptionId: undefined,
    uploadedFile: undefined,
    textDetails: '',
    contactInfo: '',
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails>(initialOrderDetails);
    
    const resetOrder = () => {
        setOrderDetails(initialOrderDetails);
    };

    return (
        <OrderContext.Provider value={{ orderDetails, setOrderDetails, resetOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};