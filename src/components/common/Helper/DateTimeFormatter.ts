const getMonth = (date: Date) => {
    return ("0" + (date.getMonth() + 1)).slice(-2)
}

// Helper function to extract date and time in more readable format
export const dateTimeFromTimeStamp = (date: string) => {
    const dateObject = new Date(date);

    return {
        date: `${dateObject.getDate()}/${(getMonth(dateObject))}/${dateObject.getFullYear()}`,
        time: dateObject.toLocaleTimeString('en-US'),
    }
};
