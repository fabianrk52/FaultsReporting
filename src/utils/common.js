export default function formatISODat (date) {
    if (date) {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        let month = dateObj.getMonth()+1;
        let dt = dateObj.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return year+'-' + month + '-'+dt;
    }   
}

// sleep time expects milliseconds
export function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}