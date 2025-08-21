
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { Service } from '../types';

interface ServiceContextType {
    services: Service[];
    addService: (service: Omit<Service, 'id' | 'status'>) => void;
    updateServiceStatus: (serviceId: string, status: 'approved' | 'rejected') => void;
    isLoading: boolean;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const SERVICES_STORAGE_KEY = 'vpodarke_services_data';

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
            if (storedServices) {
                setServices(JSON.parse(storedServices));
            }
        } catch (error) {
            console.error("Failed to load services from localStorage", error);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
        } catch (error) {
            console.error("Failed to save services to localStorage", error);
        }
    }, [services]);

    const addService = (serviceData: Omit<Service, 'id' | 'status'>) => {
        const newService: Service = {
            ...serviceData,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            status: 'pending',
        };
        setServices(prev => [...prev, newService]);
    };

    const updateServiceStatus = (serviceId: string, status: 'approved' | 'rejected') => {
        setServices(prev =>
            prev.map(s => (s.id === serviceId ? { ...s, status } : s))
        );
    };

    return (
        <ServiceContext.Provider value={{ services, addService, updateServiceStatus, isLoading }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => {
    const context = useContext(ServiceContext);
    if (context === undefined) {
        throw new Error('useServices must be used within a ServiceProvider');
    }
    return context;
};