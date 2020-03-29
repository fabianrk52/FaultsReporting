import React, { useEffect, useState } from 'react';
import { CheckBox, Option, DropDown, OptionGroup } from 'react-form-elements/'
import fire from '../utils/fire'
import '../styles/MainPage.css';
import { Popout } from 'react-popout-component';
import HyperModal from 'react-hyper-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import axios from 'axios'
import ServerConnection from '../utils/ServerConnection'

const server_ip = "http://127.0.0.1"
const server_port = "4000"

const dict = {
    1: "כן",
    2: "לא"
}

export default function MainPage() {
    const serverConnection = new ServerConnection(server_ip, server_port);
    const [visibleTable, setVisibleTable] = useState(true);
    const [visibleFirst, setVisibleFirst] = useState(false);
    const [visibleSecond, setVisibleSecond] = useState(false);
    const [errorId, setErrorId] = useState(null);
    const emptyDetails = {
        report_description: '',
        report_fault_date: new Date(), 
        report_location: '', 
        report_platform: 0, 
        report_platform_num: 0,  
        report_reporting_date: new Date(), 
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

    const validateForm = () => {
        const { description, fault_date, location, platform, platform_num, sub_platform, system, summary} = details

        return (description === '' || fault_date === new Date() || location === '' || platform === 0 || platform_num === 0 ||
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
        serverConnection.getReports(res => {
            const reports = res.data;
            setTableData(reports);
        })
        setVisibleTable(true)
        setVisibleFirst(false)
        setVisibleSecond(false)
    }

    function openNewReportModal() {
        setIsNewReportModalOpen(true);
    }

    function closeNewReportModal() {
        goToTable()
        setIsNewReportModalOpen(false);
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
                <tr>
                    <td><span className="HyperlinkText">{_id}</span></td>
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

    // const finishInvesigate = () => {
    //     if (!validateInvesigateForm()) {
    //         fire.firestore().collection("investigations").add({ ...investigateDetails, errorId: errorId })
    //         goToTable()
    //     }
    //     else alert('חסרים ערכים בחקירת התקלה')
    // }

    const newReport = () => {
        if (!validateForm()) {
            const newDetails = {...details};
            newDetails.report_reporting_date = new Date();
            newDetails.reporter_username = 'current';
            //fire.firestore().collection("reports2").add(newDetails);
            axios
                .post(`${server_ip}:${server_port}/reports/add`, newDetails)
                .then(res => console.log(res))
                .catch(err => console.error(err));
            setDetails(emptyDetails);
            closeNewReportModal();
        }
        else alert('חסרים ערכים בדו"ח התקלה')
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
        serverConnection.getReports(res => {
            const reports = res.data;
            setTableData(reports);
        })
        getSystems()
        getPlatforms()
        getSubPlatforms()
        getInvestigations()
        getUsers()
    }, [])

    return (
        <div id="main-page">
            <Modal
                id="error-report-modal"
                isOpen={isNewReportModalOpen}
                onRequestClose={closeNewReportModal}
                contentLabel="Report new fault"
                className="Modal container"
                overlayClassName="Overlay"
                parentSelector = {
                    () => document.getElementById("main-page")
                }
            >
                <form style={styleFirst} className="form-wrapper">
                    <label className="headline text-center" style={{fontSize: "24px"}}>
                        <u >דיווח תקלה</u>
                    </label>
                    <div className="form-group">
                        <label className="form-label">תקציר התקלה</label>
                        <input value={details.report_summary} 
                            onChange={
                                ({ target: { value } }) => setDetails(details => ({ ...details, report_summary: value }))
                            } type="text" className="form-control" placeholder="תקציר התקלה"/>
                    </div>
                    <div className="form-group">
                    <label className="form-label">תיאור התקלה</label>
                        <textarea value={details.report_description} rows="3" 
                        onChange={
                            ({ target: { value } }) => setDetails(details => ({ ...details, report_description: value }))
                            } type="text" className="form-control" placeholder="תיאור התקלה (בפירוט)"/>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">פלטפורמה</label>
                                <select value={details.report_platform} onChange={({ target: { value } }) => setDetails(details => ({ ...details, report_platform: value }))} className="form-control">
                                    <option value="0" selected disabled>פלטפורמה</option>
                                    {
                                        platforms.map((system, index) =>
                                            <option value={system.id}>{system.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">מערכת</label>
                                <select value={details.report_system} onChange={({ target: { value } }) => setDetails(details => ({ ...details, report_system: value }))} className="form-control">
                                    <option value="0" selected disabled>מערכת</option>
                                    {
                                        systems.map((system, index) =>
                                            <option value={system.id}>{system.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>                      
                    </div>

                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">תת-פלטפורמה</label>
                                <select value={details.report_sub_platform} onChange={
                                    ({ target: { value } }) => setDetails(details => ({ ...details, report_sub_platform: value }))
                                } className="form-control">
                                    <option value="0" selected disabled>תת-פלטפורמה</option>
                                    {
                                        subPlatforms.map((sub_platform, index) =>
                                            <option value={sub_platform.id}>{sub_platform.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">תאריך התקלה</label>
                                <input value={details.report_fault_date} 
                                onChange={
                                    ({ target: { value } }) => setDetails(details => ({ ...details, report_fault_date: value }))
                                } type="date" className="form-control" placeholder="תאריך התקלה" />
                            </div>
                        </div>                         
                    </div>

                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">מספר פלטפורמה</label>
                                <input value={details.report_platform_num} 
                                onChange={
                                    ({ target: { value } }) => setDetails(details => ({ ...details, report_platform_num: value }))
                                } type="number" className="form-control" placeholder="מספר פלטפורמה" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">מיקום</label>
                                <input value={details.report_location} 
                                onChange={
                                    ({ target: { value } }) => setDetails(details => ({ ...details, report_location: value }))
                                } type="text" className="form-control" placeholder="מיקום"/>
                            </div>
                        </div>                         
                    </div>

                    <div className="buttons-wrapper">
                        <button onClick={closeNewReportModal} type="button" className="btn btn-outline-primary"> {"<- חזור "} </button>
                        {/* <button onClick={showSecondStage} type="button" className="btn btn-primary">המשך -></button> */}
                        <button onClick={newReport} type="button" className="btn btn-primary">שלח דיווח -></button>
                    </div>
                </form>

                {/* <form style={styleSecond} className="form-wrapper">
                    <div className="form-group">
                        <label className="headline">
                            <u >שחזור התקלה</u>
                        </label>
                        <select value={details.isRepeatable} onChange={({ target: { value } }) => setDetails(details => ({ ...details, isRepeatable: value }))} className="custom-select custom-select-lg mb-3">
                            <option value="0" selected disabled>האם התקלה משתחזרת על הכלי?</option>
                            <option value="1">כן</option>
                            <option value="2">לא</option>
                        </select>
                        <select value={details.isRepeatableOnOtherTanks} onChange={({ target: { value } }) => setDetails(details => ({ ...details, isRepeatableOnOtherTanks: value }))} className="custom-select custom-select-lg mb-3">
                            <option value="0" selected disabled>האם התקלה משתחזרת על כלים נוספים?</option>
                            <option value="1">כן</option>
                            <option value="2">לא</option>
                        </select>
                        <textarea value={details.errorReason} onChange={({ target: { value } }) => setDetails(details => ({ ...details, errorReason: value }))} className="form-control" placeholder="תיאור התרחיש המתאר את התקלה" rows="3"></textarea>
                    </div>
                    <select value={details.solvedInTheField} onChange={({ target: { value } }) => setDetails(details => ({ ...details, solvedInTheField: value }))} className="custom-select custom-select-lg mb-3">
                        <option value="0" selected disabled>האם מצאו פתרון זמני לתקלה בשטח?</option>
                        <option value="1">כן</option>
                        <option value="2">לא</option>
                    </select>
                    <select value={details.isInErrorTable} onChange={({ target: { value } }) => setDetails(details => ({ ...details, isInErrorTable: value }))} className="custom-select custom-select-lg mb-3">
                        <option value="0" selected disabled>האם התקלה מופיעה בקובץ התקלות של המערכת הרלוונטית?</option>
                        <option value="1">כן</option>
                        <option value="2">לא</option>
                    </select>
                    <div className="buttons-wrapper">
                        <button onClick={goToFirstStage} type="button" className="btn btn-outline-primary"> {"<- חזור לשלב הקודם "} </button>
                        <button onClick={newReport} type="button" className="btn btn-outline-success">שלח דיווח -></button>
                    </div>
                </form>

                <form style={styleFinal} className="form-wrapper">
                    <label className="headline">
                        <u >חקר התקלה</u>
                    </label>
                    <div className="form-group">
                        <input value={investigateDetails.investigator} onChange={({ target: { value } }) => setInvestigateDetails(investigateDetails => ({ ...investigateDetails, investigator: value }))} type="text" className="form-control" placeholder="שם המתחקר" />
                    </div>
                    <div className="form-group">
                        <textarea value={investigateDetails.errorReason} onChange={({ target: { value } }) => setInvestigateDetails(investigateDetails => ({ ...investigateDetails, errorReason: value }))} className="form-control" placeholder="סיבת התקלה" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <textarea value={investigateDetails.solution} onChange={({ target: { value } }) => setInvestigateDetails(investigateDetails => ({ ...investigateDetails, solution: value }))} className="form-control" placeholder="פיתרון התקלה" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <textarea value={investigateDetails.description} onChange={({ target: { value } }) => setInvestigateDetails(investigateDetails => ({ ...investigateDetails, description: value }))} className="form-control" placeholder="טקסט חופשי" rows="3"></textarea>
                    </div>
                    <button onClick={finishInvesigate} type="button" className="btn btn-outline-success">סיים תחקור</button>
                </form> */}
            </Modal>
                
            <nav className="navbar navbar-dark bg-primary sticky-top pull-right">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </button>
                <a className="navbar-brand">Curernt User</a>
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
