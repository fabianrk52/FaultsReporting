import axios from 'axios'

export default class ServerConnection {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }

    getReports = (callback) => {
        const getReportsUrl = `${this.ip}:${this.port}/reports/`;
        axios
        .get(getReportsUrl, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => console.error(err));
    }

    getReportById = (callback, id) => {
        const getReportUrl = `${this.ip}:${this.port}/reports/${id}`;
        axios
        .get(getReportUrl, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => console.error(err));
    }

    updateReport = (callback, id, report) => {
        const updateReportUrl = `${this.ip}:${this.port}/reports/update/${id}`;
        axios
        .put(updateReportUrl, report, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => console.error(err));
    }

    newReport = (callback, report) => {
        const newReportUrl = `${this.ip}:${this.port}/reports/add`;
        axios
        .post(newReportUrl, report, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => console.error(err));
    }
}

