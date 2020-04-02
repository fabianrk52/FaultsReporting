import React, { useEffect, useState } from 'react';
import fire from '../utils/fire'
import '../styles/MainPage.css';
import '../styles/Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import ServerConnection from '../utils/ServerConnection';
import ViewEditReportModal from './ViewEditReportModal';
import ErrorReportModal from './ErrorReportModal';

const server_ip = "http://127.0.0.1"
const server_port = "4000"

const boolean_dict = {
    true: "כן",
    false: "לא"
}

export default function MainPage() {
    const self = document.getElementById("main-page");
    const serverConnection = new ServerConnection(server_ip, server_port);
    const [visibleTable, setVisibleTable] = useState(true);
    const [visibleFirst, setVisibleFirst] = useState(false);
    const [visibleSecond, setVisibleSecond] = useState(false);
    const [errorId, setErrorId] = useState(null);
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
    const [details, setDetails] = useState(emptyDetails)
    const [investigateDetails, setInvestigateDetails] = useState({
        errorId: '',
        investigator: '',
        errorReason: '',
        solution: '',
        description: ''
    })
    const [tableData, setTableData] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [subPlatforms, setSubPlatforms] = useState([]);
    const [systems, setSystems] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedFault, setSelectedFault] = useState(null);
    const [investigations, setInvestigations] = useState([]);
    const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
    const [isViewEditReportModalOpen, setIsViewEditReportModalOpen] = useState(false);

    const validateForm = () => {
        const { description, fault_date, location, platform, platform_num, sub_platform, system, summary} = details

        return !(description === '' || fault_date === new Date() || location === '' || platform === 0 || platform_num === 0 ||
            sub_platform === 0 || system === 0 || summary === '')

    }

    const validateInvesigateForm = () => {
        const { investigator, errorReason, solution, description } = investigateDetails

        return (investigator === '' || errorReason === '' || solution === '' || description === '')

    }

    function showSecondStage() {
        setVisibleFirst(false)
        setVisibleSecond(true)
    }

    function showFinalStage() {
        setErrorId(selectedFault.id)
        setSelectedFault(null)
        setVisibleTable(false)
        setVisibleFirst(false)
        setVisibleSecond(false)
    }

    function goToFirstStage() {
        setVisibleFirst(true)
        setVisibleSecond(false)
        setVisibleTable(false)
        openNewReportModal()
    }

    function goToTable() {
        setVisibleTable(true)
        setVisibleFirst(false)
        setVisibleSecond(false)
    }

    function openNewReportModal() {
        setIsNewReportModalOpen(true);
    }

    function closeNewReportModal() {
        getReportsFromServer(() => {
            goToTable();
            setIsNewReportModalOpen(false);
        });
    }

    function openViewEditReportModal() {
        setIsViewEditReportModalOpen(true);
    }

    function closeViewEditReportModal() {
        getReportsFromServer(() => {
            goToTable();
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

    let styleTable = {}
    let styleFirst = {}
    let styleSecond = {}
    let styleFinal = {}

    if (visibleTable) {
        styleTable.display = "inline"
        styleFirst.display = "none"
        styleSecond.display = "none"
        styleFinal.display = "none"
    }
    else if (visibleFirst) {
        styleTable.display = "none"
        styleFirst.display = "inline"
        styleSecond.display = "none"
        styleFinal.display = "none"
    } else if (visibleSecond) {
        styleTable.display = "none"
        styleFirst.display = "none"
        styleFinal.display = "none"
    } else {
        styleTable.display = "none"
        styleFirst.display = "none"
        styleSecond.display = "none"
        styleFinal.display = "inline"
    }

    const getReportsFromServer = (callback = null) => {
        serverConnection.getReports(res => {
            const reports = res.data;
            console.log(reports);
            setTableData(reports);
            if (callback) {
                callback();
            }
        })
    }

    const getSystems = async () => {
        const data = await fire.firestore().collection("systems").get()
        const systems = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setSystems(systems)
    }

    const getPlatforms = async () => {
        const data = await fire.firestore().collection("platforms").get()
        const platforms = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPlatforms(platforms)
    }

    const getSubPlatforms = async () => {
        const data = await fire.firestore().collection("sub_platforms").get()
        const subPlatforms = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setSubPlatforms(subPlatforms)
    }

    const getInvestigations = async () => {
        const data = await fire.firestore().collection("investigations").get()
        const investigations = data.docs.map(doc => doc.data().errorId);
        setInvestigations(investigations)
    }

    const getUsers = async () => {
        const data = await fire.firestore().collection("users").get()
        const users = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUsers(users)
    }

    useEffect(() => {
        getReportsFromServer();
        getSystems();
        getPlatforms();
        getSubPlatforms();
        getInvestigations();
        getUsers();
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
                <div style={styleTable} className="table-page">
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
                        <button onClick={goToFirstStage} type="button" className="btn btn-outline-primary">פתח תקלה חדשה -></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
