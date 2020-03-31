import axios from 'axios'

export default class ServerConnection {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }

    getReports = (callback) => {
        const getReports_IP = `${this.ip}:${this.port}/reports/`;
        axios
        .get(getReports_IP, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => console.error(err));
    }

    updateReport = (callback, id, report) => {
        const updateReport_IP = `${this.ip}:${this.port}/reports/update/${id}`;
        axios
        .put(updateReport_IP, report, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => console.error(err));
    }

    newReport = (callback, report) => {
        const newReport_IP = `${this.ip}:${this.port}/reports/add`;
        axios
        .post(newReport_IP, report, {
            timeout: 5000
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }
}

