import { useCallback } from "react";

const Data = () => {
    const logData = useCallback(() => {
        console.log("Data", Data);
    }, []);

    logData(); // Calling the function

    return null;
};

export default Data;
