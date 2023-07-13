import { format } from 'date-fns';

export const DateFormat = (date) => {
    if (date) {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        return formattedDate
    }
    return null;
};