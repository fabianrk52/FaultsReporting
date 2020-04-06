export default function formatISODate (date) {
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

//(Math.random() * (maximum - minimum + 1) ) << 0
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}