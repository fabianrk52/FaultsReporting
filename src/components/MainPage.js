import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import '../styles/Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ServerConnection from '../utils/ServerConnection';
import ViewEditReportModal from './ViewEditReportModal';
import ErrorReportModal from './ErrorReportModal';
import Errors from './Errors';
import {Route, BrowserRouter} from "react-router-dom";
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
        <div id="main-page" className="container-fluid" style={{paddingRight: 0, paddingLeft: 0}}>
            <nav className="navbar navbar-dark bg-primary sticky-top pull-right">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars}/>
                </button>
            </nav>
            <div id="main-container" className="container-fluid">
                <BrowserRouter basename="/app">
                    <Route exact path="/" render={() => <Errors openNewReportModal={openNewReportModal} renderTableData={renderTableData} />}></Route>
                </BrowserRouter>
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
                
                <div className="button-wrapper">
                    <button onClick={openNewReportModal} type="button" className="btn btn-outline-primary">פתח תקלה חדשה -></button>
                </div>
            </div>
        </div>
    )
}
