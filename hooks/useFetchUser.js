import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchUser = () => {
    const [userData, setUserData] = useState([]); // Stores fetched user data
    const [currentIndex, setCurrentIndex] = useState(0); // Tracks current user index
    const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
    const [error, setError] = useState(null); // Stores any errors from API call

    // Function to fetch user data from API or cache
    const fetchUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Check if data is already cached
            const cachedData = await AsyncStorage.getItem("userData");
            if (cachedData) {
                console.log("Loading data from cache");
                setUserData(JSON.parse(cachedData));
                setCurrentIndex(0);
                return;
            }

            console.log("Fetching new data");
            const response = await fetch("https://randomuser.me/api/?results=20");
            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await response.json();
            setUserData(data.results);
            setCurrentIndex(0);

            // Store data in cache
            await AsyncStorage.setItem("userData", JSON.stringify(data.results));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user data when the component mounts
    useEffect(() => {
        fetchUser();
    }, []); // Runs only on the first render

    // Function to navigate to the previous user
    const previousUser = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    // Function to navigate to the next user
    const nextUser = () => {
        setCurrentIndex((prevIndex) => (prevIndex < userData.length - 1 ? prevIndex + 1 : prevIndex));
    };

    return { userData, currentIndex, isLoading, error, fetchUser, previousUser, nextUser };
};

export default useFetchUser;
