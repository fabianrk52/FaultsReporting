import axios from 'axios';
import { getRandomInt } from './common';

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

    addReport = (callback, report) => {
        const newReportUrl = `${this.ip}:${this.port}/reports/add`;
        axios
        .post(newReportUrl, report, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => console.error(err));
    }

    getPlatforms = (callback) => {
        const p = new Promise((resolve, reject) => {
            const rand = getRandomInt(0, 10);
            const platforms = [
                {
                    name: "פלטפורמה 1", id: "1"
                }, 
                {
                    name: "פלטפורמה 2", id: "2"
                }];
            const res = {
                data: platforms
            }

            if (rand >= 0) { //Change to "> 0" if you want to simulate a 1:10 chance of failing in getting platforms from server
                resolve(res);
            }
            else {
                reject("Error");
            }
        });
        
        p.then(callback)
        .catch(err => console.error(err));
    }

    getSubPlatforms = (callback) => {
        const p = new Promise((resolve, reject) => {
            const rand = getRandomInt(0, 10);
            const subPlatforms = [
                {
                    name: "תת-פלטפורמה 1", id: "1"
                },
                {
                    name: "תת-פלטפורמה 2", id: "2"
                }, 
                {
                    name: "תת-פלטפורמה 3", id: "3"
                }];
            const res = {
                data: subPlatforms
            }

            if (rand >= 0) { //Change to "> 0" if you want to simulate a 1:10 chance of failing in getting sub-platforms from server
                resolve(res);
            }
            else {
                reject("Error");
            }
        });
        
        p.then(callback)
        .catch(err => console.error(err));
    }

    getSystems = (callback) => {
        const p = new Promise((resolve, reject) => {
            const rand = getRandomInt(0, 10);
            const systems = [
                {
                    name: "מערכת 1", id: "1"
                }, 
                {
                    name: "מערכת 2", id: "2"
                }, 
                {
                    name: "מערכת 3", id: "3"
                }, 
                {
                    name: "מערכת 4", id: "4"
                }];
            const res = {
                data: systems
            }

            if (rand >= 0) { //Change to "> 0" if you want to simulate a 1:10 chance of failing in getting systems from server
                resolve(res);
            }
            else {
                reject("Error");
            }
        });
        
        p.then(callback)
        .catch(err => console.error(err));
    }
}

