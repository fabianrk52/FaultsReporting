import React, { useEffect, useState } from 'react';
import { CheckBox, Option, DropDown, OptionGroup } from 'react-form-elements/'
import fire from './fire'
import './MainPage.css';
import { Popout } from 'react-popout-component';
import HyperModal from 'react-hyper-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'

const dict = {
    1: "כן",
    2: "לא"
}

export default function MainPage() {
    const [visibleTable, setVisibleTable] = useState(true);
    const [visibleFirst, setVisibleFirst] = useState(false);
    const [visibleSecond, setVisibleSecond] = useState(false);
    const [errorId, setErrorId] = useState(null);
    const [details, setDetails] = useState({
        description: '',
        fault_date: new Date(), 
        location: '', 
        platform: 0, 
        platform_num: 0,  
        report_date: new Date(), 
        reporter_username: '', 
        sub_platform: 0, 
        system: 0, 
        summary: ''
    })
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
    const [selectedError, setSelectedError] = useState(null);
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
        setErrorId(selectedError.id)
        setSelectedError(null)
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
        getReports2()
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
            const { id, summary, report_date, priority, reporter_username, platform, status} = report //destructuring
            return (
                <tr onDoubleClick={() => setSelectedError(report)}>
                    <td>{id}</td>
                    <td>{summary}</td>
                    <td>{new Date(report_date.seconds * 1000).toLocaleDateString("he-IL", "short") || "-"}</td>
                    <td>{priority || "טרם הוגדר"}</td>
                    <td>{"-"}</td>
                    <td>{reporter_username}</td>
                    <td>{platform}</td>
                    <td>{status || "טרם עודכן"}</td>
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

    const finishInvesigate = () => {
        if (!validateInvesigateForm()) {
            fire.firestore().collection("investigations").add({ ...investigateDetails, errorId: errorId })
            goToTable()
        }
        else alert('חסרים ערכים בחקירת התקלה')
    }

    const newReport = () => {
        if (!validateForm()) {
            const newDetails = {...details};
            newDetails.report_date = new Date();
            newDetails.reporter_username = 'current';
            setDetails(newDetails);
            fire.firestore().collection("reports2").add(newDetails);
            closeNewReportModal();
        }
        else alert('חסרים ערכים בדו"ח התקלה')
    }

    const getReports = async () => {
        const data = await fire.firestore().collection("reports").get()
        const reports = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTableData(reports)
    }

    const getReports2 = async () => {
        const data = await fire.firestore().collection("reports2").get()
        const reports = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTableData(reports)
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
        getReports2()
        getSystems()
        getPlatforms()
        getSubPlatforms()
        getInvestigations()
        getUsers()
    }, [])

    return (
        <div className="contact-page">
            <Modal
                isOpen={isNewReportModalOpen}
                onRequestClose={closeNewReportModal}
                contentLabel="Report new fault"
                className="Modal container"
                overlayClassName="Overlay"
            >
                <form style={styleFirst} className="form-wrapper">
                    <label className="headline">
                        <u >דיווח תקלה</u>
                    </label>
                    <input value={details.topic} 
                        onChange={
                            ({ target: { value } }) => setDetails(details => ({ ...details, summary: value }))
                        } type="text" className="form-control" placeholder="תקציר התקלה"/>
                    <br/>
                    <input value={details.description} 
                    onChange={
                        ({ target: { value } }) => setDetails(details => ({ ...details, description: value }))
                        } type="text" className="form-control" placeholder="תיאור התקלה (בפירוט)"/>
                    <br/>
                    <div className="form-row">
                        <div className="col-md-6">
                            <select value={details.platform} onChange={({ target: { value } }) => setDetails(details => ({ ...details, platform: value }))} className="custom-select custom-select-lg mb-3">
                                <option value="0" selected disabled>פלטפורמה</option>
                                {
                                    platforms.map((system, index) =>
                                        <option value={system.id}>{system.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-md-6">
                        <select value={details.system} onChange={({ target: { value } }) => setDetails(details => ({ ...details, system: value }))} className="custom-select custom-select-lg mb-3">
                            <option value="0" selected disabled>מערכת</option>
                            {
                                systems.map((system, index) =>
                                    <option value={system.id}>{system.name}</option>
                                )
                            }
                        </select>
                        </div>                      
                    </div>
                    <br/>
                    <div className="form-row">
                        <div className="col-md-6">
                        <select value={details.sub_platform} onChange={
                                ({ target: { value } }) => setDetails(details => ({ ...details, sub_platform: value }))
                            } className="custom-select custom-select-lg mb-3">
                            <option value="0" selected disabled>תת-פלטפורמה</option>
                            {
                                subPlatforms.map((sub_platform, index) =>
                                    <option value={sub_platform.id}>{sub_platform.name}</option>
                                )
                            }
                        </select>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>תאריך התקלה:</label>
                                <input onChange={({ target: { value } }) => setDetails(details => ({ ...details, fault_date: value }))} type="date" className="form-control" placeholder="תאריך התקלה" />
                            </div>
                        </div>                         
                    </div>
                    <br/>
                    <div className="form-row">
                        <div className="col-md-6">
                        <input value={details.platform_num} onChange={({ target: { value } }) => setDetails(details => ({ ...details, platform_num: value }))} type="number" className="form-control" placeholder="מספר פלטפורמה" />
                        </div>
                        <div className="col-md-6">
                            <input value={details.location} 
                            onChange={
                                ({ target: { value } }) => setDetails(details => ({ ...details, location: value }))
                            } type="text" className="form-control" placeholder="מיקום"/>
                        </div>                         
                    </div>
                    <br/>
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
            {
                selectedError ?
                    <HyperModal contentClassName="wrapper-popup" isOpen={selectedError} requestClose={() => { setErrorId(selectedError.id); setSelectedError(null) }}>
                        <div className="headline"><u><h2>פירוט התקלה</h2></u></div>
                        <div>התקלה במערכת <b>{systems[selectedError.system - 1].name}</b></div>
                        <div>נפתח בתאריך <b>{selectedError.date}</b></div>
                        <div>שם המדווח הוא <b>{selectedError.reporterName}</b></div>
                        <div>טלפון המדווח <b>{selectedError.reporterPhone}</b></div>
                        <div><b>התקלה היא: </b>{selectedError.description}</div>
                        <div>התקלה <b>{dict[selectedError.isRepeatable]} משתחזרת</b> בכלי</div>
                        <div>התקלה <b>{dict[selectedError.isRepeatableOnOtherTanks]}  משתחזרת</b> בכלים אחרים</div>
                        <div>התקלה <b>{dict[selectedError.solvedInTheField]} נפתרה</b> בשטח</div>
                        <div>התקלה <b>{dict[selectedError.isInErrorTable]} מופיעה</b> בקובץ תקלות</div>
                        <button onClick={showFinalStage} type="button" className="btn btn-outline-primary padding">עבור לחקר התקלה -></button>
                    </HyperModal>
                    :
                    null
            }

            
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
    )
}
