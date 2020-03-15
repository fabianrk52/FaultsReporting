import React, { useEffect, useState } from 'react';
import { CheckBox, Option, DropDown, OptionGroup } from 'react-form-elements/'
import fire from './fire'
import './MainPage.css';
import { Popout } from 'react-popout-component';
import HyperModal from 'react-hyper-modal';

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
        system: '0',
        platform: '0',
        topic: '',
        tankId: '',
        reporterName: '',
        reporterPhone: '',
        date: new Date(),
        description: '',
        isRepeatable: '0',
        isRepeatableOnOtherTanks: '0',
        errorReason: '',
        solvedInTheField: '0',
        isInErrorTable: '0'
    })
    const [investigateDetails, setInvestigateDetails] = useState({
        errorId: '',
        investigator: '',
        errorReason: '',
        solution: '',
        description: ''
    })
    const [tableData, setTableData] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [systems, setSystems] = useState([]);
    const [selectedError, setSelectedError] = useState(null)
    const [investigations, setInvestigations] = useState([])

    const validateForm = () => {
        const { system, platform, topic, tankId, reporterName, reporterPhone, description, isRepeatable, isRepeatableOnOtherTanks, errorReason, solvedInTheField, isInErrorTable } = details

        return (system == 0 || platform == 0 || topic == '' || tankId == '' || reporterName == '' ||
            reporterPhone == '' || description == '' || isRepeatable == '0' || isRepeatableOnOtherTanks == '0' ||
            errorReason == '' || solvedInTheField == '0' || isInErrorTable == '0')

    }

    const validateInvesigateForm = () => {
        const { investigator, errorReason, solution, description } = investigateDetails

        return (investigator == '' || errorReason == '' || solution == '' || description == '')

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
    }

    function goToTable() {
        setVisibleTable(true)
    }

    function renderTableData() {
        return tableData.map((report, index) => {
            const { topic, tankId, reporterName, isChecked } = report //destructuring
            return (
                <tr onDoubleClick={() => setSelectedError(report)}>
                    <td>{index + 1}</td>
                    <td>{topic}</td>
                    <td>{tankId}</td>
                    <td>{reporterName}</td>
                    <td>{investigations.includes(report.id) ? "כן" : "לא"}</td>
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
        else alert('תקלה')
    }

    const newReport = () => {
        if (!validateForm()) {
            fire.firestore().collection("reports").add(details)
            goToTable()
        }
        else alert('תקלה')
    }

    const getReports = async () => {
        const data = await fire.firestore().collection("reports").get()
        const reports = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTableData(reports)
    }

    const getSystems = async () => {
        const data = await fire.firestore().collection("systems").get()
        const systems = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setSystems(systems)
    }

    const getVehicles = async () => {
        const data = await fire.firestore().collection("vehicles").get()
        const vehicles = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setVehicles(vehicles)
    }

    const getInvestigations = async () => {
        const data = await fire.firestore().collection("investigations").get()
        const investigations = data.docs.map(doc => doc.data().errorId);
        setInvestigations(investigations)
    }

    useEffect(() => {
        getReports()
        getSystems()
        getVehicles()
        getInvestigations()
    }, [])

    return (
        <div className="contact-page">
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
                        <button onClick={showFinalStage} type="button" class="btn btn-outline-primary padding">עבור לחקר התקלה -></button>
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
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">הנדון</th>
                                <th scope="col">מספר כלי</th>
                                <th scope="col">המדווח</th>
                                <th scope="col">עבר תחקיר</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableData()}
                        </tbody>
                    </table>
                </div>
                <div className="button-wrapper">
                    <button onClick={goToFirstStage} type="button" class="btn btn-outline-primary">פתח תקלה חדשה -></button>
                </div>
            </div>
            <form style={styleFirst} className="form-wrapper">
                <label className="headline">
                    <u >דיווח תקלות</u>
                </label>
                <div class="form-group">
                    <select value={details.system} onChange={({ target: { value } }) => setDetails(details => ({ ...details, system: value }))} class="custom-select custom-select-lg mb-3">
                        <option value="0" selected disabled>באיזו מערכת התקלה?</option>
                        {
                            systems.map((system, index) =>
                                <option value={system.id}>{system.name}</option>
                            )
                        }
                    </select>
                    <select value={details.platform} onChange={({ target: { value } }) => setDetails(details => ({ ...details, platform: value }))} class="custom-select custom-select-lg mb-3">
                        <option value="0" selected disabled>פלטפורמה</option>
                        {
                            vehicles.map((system, index) =>
                                <option value={system.id}>{system.name}</option>
                            )
                        }
                    </select>
                </div>
                <div class="form-group">
                    <input value={details.topic} onChange={({ target: { value } }) => setDetails(details => ({ ...details, topic: value }))} type="text" class="form-control" placeholder="נושא התקלה" />
                </div>
                <div class="form-group">
                    <input value={details.tankId} onChange={({ target: { value } }) => setDetails(details => ({ ...details, tankId: value }))} type="number" class="form-control" placeholder="מספר כלי" />
                </div>
                <div class="form-group">
                    <label >
                        פרטי המדווח:
                </label>
                    <input value={details.reporterName} onChange={({ target: { value } }) => setDetails(details => ({ ...details, reporterName: value }))} type="text" class="form-control" placeholder="שם המדווח" />
                    <input value={details.reporterPhone} onChange={({ target: { value } }) => setDetails(details => ({ ...details, reporterPhone: value }))} type="text" class="form-control" placeholder="טלפון" />
                </div>
                <div class="form-group">
                    <label >
                        תאריך:
                </label>
                    <input onChange={({ target: { value } }) => setDetails(details => ({ ...details, date: value }))} type="date" class="form-control" placeholder="שם המדווח" />
                </div>
                <div class="form-group">
                    <textarea value={details.description} onChange={({ target: { value } }) => setDetails(details => ({ ...details, description: value }))} class="form-control" placeholder="תיאור התקלה (בפירוט)" rows="3"></textarea>
                </div>
                <div className="buttons-wrapper">
                    <button onClick={goToTable} type="button" class="btn btn-outline-primary"> {"<- חזור "} </button>
                    <button onClick={showSecondStage} type="button" class="btn btn-outline-primary">עבור לשלב הבא -></button>
                </div>
            </form>

            <form style={styleSecond} className="form-wrapper">
                <div class="form-group">
                    <label className="headline">
                        <u >שחזור התקלה</u>
                    </label>
                    <select value={details.isRepeatable} onChange={({ target: { value } }) => setDetails(details => ({ ...details, isRepeatable: value }))} class="custom-select custom-select-lg mb-3">
                        <option value="0" selected disabled>האם התקלה משתחזרת על הכלי?</option>
                        <option value="1">כן</option>
                        <option value="2">לא</option>
                    </select>
                    <select value={details.isRepeatableOnOtherTanks} onChange={({ target: { value } }) => setDetails(details => ({ ...details, isRepeatableOnOtherTanks: value }))} class="custom-select custom-select-lg mb-3">
                        <option value="0" selected disabled>האם התקלה משתחזרת על כלים נוספים?</option>
                        <option value="1">כן</option>
                        <option value="2">לא</option>
                    </select>
                    <textarea value={details.errorReason} onChange={({ target: { value } }) => setDetails(details => ({ ...details, errorReason: value }))} class="form-control" placeholder="תיאור התרחיש המתאר את התקלה" rows="3"></textarea>
                </div>
                <select value={details.solvedInTheField} onChange={({ target: { value } }) => setDetails(details => ({ ...details, solvedInTheField: value }))} class="custom-select custom-select-lg mb-3">
                    <option value="0" selected disabled>האם מצאו פתרון זמני לתקלה בשטח?</option>
                    <option value="1">כן</option>
                    <option value="2">לא</option>
                </select>
                <select value={details.isInErrorTable} onChange={({ target: { value } }) => setDetails(details => ({ ...details, isInErrorTable: value }))} class="custom-select custom-select-lg mb-3">
                    <option value="0" selected disabled>האם התקלה מופיעה בקובץ התקלות של המערכת הרלוונטית?</option>
                    <option value="1">כן</option>
                    <option value="2">לא</option>
                </select>
                <div className="buttons-wrapper">
                    <button onClick={goToFirstStage} type="button" class="btn btn-outline-primary"> {"<- חזור לשלב הקודם "} </button>
                    <button onClick={newReport} type="button" class="btn btn-outline-success">שלח דיווח -></button>
                </div>
            </form>

            <form style={styleFinal} className="form-wrapper">
                <label className="headline">
                    <u >חקר התקלה</u>
                </label>
                <div class="form-group">
                    <input value={investigateDetails.investigator} onChange={({ target: { value } }) => setInvestigateDetails(investigateDetails => ({ ...investigateDetails, investigator: value }))} type="text" class="form-control" placeholder="שם המתחקר" />
                </div>
                <div class="form-group">
                    <textarea value={investigateDetails.errorReason} onChange={({ target: { value } }) => setInvestigateDetails(investigateDetails => ({ ...investigateDetails, errorReason: value }))} class="form-control" placeholder="סיבת התקלה" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <textarea value={investigateDetails.solution} onChange={({ target: { value } }) => setInvestigateDetails(investigateDetails => ({ ...investigateDetails, solution: value }))} class="form-control" placeholder="פיתרון התקלה" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <textarea value={investigateDetails.description} onChange={({ target: { value } }) => setInvestigateDetails(investigateDetails => ({ ...investigateDetails, description: value }))} class="form-control" placeholder="טקסט חופשי" rows="3"></textarea>
                </div>
                <button onClick={finishInvesigate} type="button" class="btn btn-outline-success">סיים תחקור</button>
            </form>
        </div>
    )
}
