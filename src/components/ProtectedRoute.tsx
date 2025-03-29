import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Optional: for decoding JWT tokens

// Define a type for the decoded token (adjust based on your token structure)
interface DecodedToken {
    customerId?: string;
    exp?: number; // Expiration timestamp
    [key: string]: any; // Allow other fields
}

const ProtectedRoute: React.FC = () => {
    // Function to check if the user is authenticated
    const isAuthenticated = () => {
        // Check localStorage for customerId
        const customerId = localStorage.getItem('customerId');
        if (customerId) {
            return true; // If customerId exists, user is authenticated
        }

        // Check for a JWT token (optional, if you use tokens)
        const token = localStorage.getItem('token'); // Assuming token is stored as 'token'
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Current time in seconds

                // Check if token has a customerId and isn’t expired
                if (decoded.customerId && decoded.exp && decoded.exp > currentTime) {
                    return true;
                }
            } catch (error) {
                console.error('Invalid token:', error);
                return false;
            }
        }

        return false; // No valid customerId or token found
    };

    // If authenticated, render the child routes (Outlet); otherwise, redirect to login
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;