import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import '../styles/Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ServerConnection from '../utils/ServerConnection';
import ViewEditReportModal from './ViewEditReportModal';
import ErrorReportModal from './ErrorReportModal';
import Register from './Register';
import Login from './LoginComp';

const server_ip = "http://127.0.0.1"
const server_port = "4000"

export default function MainPage() {
    const self = document.getElementById("main-page"); //Getting current element manually as no better method found
    const serverConnection = new ServerConnection(server_ip, server_port);

    const emptyDetails = {
        report_description: '',
        report_fault_date: null, 
        report_location: '', 
        report_platform: 0, 
        report_platform_num: 0,  
        report_reporting_date: null, 
        report_reporter_username: '', 
        report_sub_platform: 0, 
        report_system: 0, 
        report_summary: ''
    }
    
    const [tableData, setTableData] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [subPlatforms, setSubPlatforms] = useState([]);
    const [systems, setSystems] = useState([]);
    const [selectedFault, setSelectedFault] = useState(null);
    const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
    const [isViewEditReportModalOpen, setIsViewEditReportModalOpen] = useState(false);

    function openNewReportModal() {
        setIsNewReportModalOpen(true);
    }

    function closeNewReportModal() {
        getReports(() => {
            setIsNewReportModalOpen(false);
        });
    }

    function openViewEditReportModal() {
        setIsViewEditReportModalOpen(true);
    }

    function closeViewEditReportModal() {
        getReports(() => {
            setIsViewEditReportModalOpen(false);
        }); 
    }

    function onSelectReportOnTable(report) {
        setSelectedFault(report);
        openViewEditReportModal();
    }

    function renderTableData() {
        return tableData.map((report, index) => {
            const { 
                _id, 
                report_summary, 
                report_reporting_date, 
                report_priority, 
                report_reporter_username, 
                report_platform, 
                report_status
            } = report //destructuring
            return (
                <tr key={_id}>
                    <td><span className="HyperlinkText" onClick={() => onSelectReportOnTable(report)}>{_id}</span></td>
                    <td>{report_summary}</td>
                    <td>{new Date(report_reporting_date).toLocaleDateString("he-IL", "short") || "-"}</td>
                    <td>{report_priority || "טרם הוגדר"}</td>
                    <td>{"-"}</td>  
                    <td>{report_reporter_username}</td>
                    <td>{report_platform}</td>
                    <td>{report_status || "טרם עודכן"}</td>
                </tr>
            )
        })
    }

    const getReports = (callback = null) => {
        serverConnection.getReports(res => {
            const reports = res.data;
            console.log("Reports: " + reports);
            setTableData(reports);
            if (callback) {
                callback();
            }
        });
    }

    const getSystems = (callback = null) => {
        serverConnection.getSystems(res => {
            const systems = res.data;
            console.log("Systems: " + systems);
            setSystems(systems);
            if (callback) {
                callback();
            }
        });
    }

    const getPlatforms = (callback = null) => {
        serverConnection.getPlatforms(res => {
            const platforms = res.data;
            console.log("Platforms: " + platforms);
            setPlatforms(platforms);
            if (callback) {
                callback();
            }
        });
    }

    const getSubPlatforms = (callback = null) => {
        serverConnection.getSubPlatforms(res => {
            const subPlatforms = res.data;
            console.log("Sub-Platforms: " + subPlatforms);
            setSubPlatforms(subPlatforms);
            if (callback) {
                callback();
            }
        });
    }

    useEffect(() => {
        getReports();
        getSystems();
        getPlatforms();
        getSubPlatforms();
    }, []);

    return (
        <div id="main-page">
            <ErrorReportModal
                id="error-report-modal"
                reportDetails={emptyDetails} 
                isModalOpen={isNewReportModalOpen}
                closeModal={closeNewReportModal}
                appElement={self} 
                platforms={platforms} 
                subPlatforms={subPlatforms} 
                systems={systems} 
                serverConnection={serverConnection}/>
            
            <ViewEditReportModal 
                id="view-edit-report-modal" 
                reportDetails={selectedFault} 
                isModalOpen={isViewEditReportModalOpen} 
                closeModal={closeViewEditReportModal} 
                appElement={self} 
                platforms={platforms} 
                subPlatforms={subPlatforms} 
                systems={systems} 
                serverConnection={serverConnection}/>

            <nav className="navbar navbar-dark bg-primary sticky-top pull-right">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars}/>
                </button>
                <a className="navbar-brand" href=".">Curernt User</a>
            </nav>

            <div>
                <div className="table-page">
                    <div className="headline">
                        <label>
                            <u><h1 >דיווח תקלות</h1></u>
                        </label>
                    </div>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">תקציר התקלה</th>
                                    <th scope="col">תאריך דיווח</th>
                                    <th scope="col">עדיפות</th>
                                    <th scope="col">סוג המדווח</th>
                                    <th scope="col">המדווח</th>
                                    <th scope="col">פלטפורמה</th>
                                    <th scope="col">סטאטוס</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    <div className="button-wrapper">
                        <button onClick={openNewReportModal} type="button" className="btn btn-outline-primary">פתח תקלה חדשה -></button>
                    </div>
                </div>
            </div>
            <Register></Register>
            <Login></Login>
        </div>
    )
}
