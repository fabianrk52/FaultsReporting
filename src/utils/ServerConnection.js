import axios from 'axios'

export default class ServerConnection {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }

    getReports = (callback) => {
        const getReports_IP = `${this.ip}:${this.port}/reports/`
        axios
        .get(getReports_IP, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => console.error(err));
    }
}

