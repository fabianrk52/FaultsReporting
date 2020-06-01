import React, { useEffect, useState } from 'react';
// import '../styles/MainPage.css';
import './MainPage/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

export default function ErrorReportForm(props) {
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    
    const closeModal = props.closeModal;

    //TODO: Delete this afterwards!
    const emptyDetails = {
        report_appears_in_errors_file: false, 
        report_description: '',
        report_fault_date: new Date(), 
        report_location: '', 
        report_platform: 0, 
        report_platform_num: 0,  
        report_reporting_date: new Date(), 
        report_reporter_username: '', 
        report_sub_platform: 0, 
        report_system: 0, 
        report_reoccuring_on_same_vehicle: false, 
        report_reoccuring_on_other_vehicles: false, 
        report_summary: '', 
        report_temp_solution_description: '', 
        report_temp_solution_found: false
    }

    const displayedFormClass = "form-wrapper";
    const hiddenFormClass = "form-wrapper d-none";

    const [details, setDetails] = useState(emptyDetails)
    const [cachedTempSolutionDescription, setCachedTempSolutionDescription] = useState('');

    const onTempSolutionFoundCheckClicked = ({ target: { value } }) => {
        const newTempSolutionFoundValue = details.report_temp_solution_found === undefined ? true : !details.report_temp_solution_found;
        setDetails(details => ({
            ...details, report_temp_solution_found: newTempSolutionFoundValue }));
        document.getElementById("temp-solution-textarea").disabled = details.report_temp_solution_found;

        setCachedTempSolutionDescription(newTempSolutionFoundValue ? details.report_temp_solution_description : '');
    }

    const goToFirstPage = () => {
        document.getElementById("error-report-form-page1").className = displayedFormClass;
        document.getElementById("error-report-form-page2").className = hiddenFormClass;
    }

    const goToSecondPage = () => {
        document.getElementById("error-report-form-page1").className = hiddenFormClass;
        document.getElementById("error-report-form-page2").className = displayedFormClass;
    }

    const addReport = () => {
        details.report_reporting_date = (new Date()).toISOString();
        details.report_temp_solution_description = cachedTempSolutionDescription;
        console.log(details);
        serverConnection.addReport((res) => {
            if (res.status.toString()[0] === "2") {
                alert("התקלה דווחה בהצלחה!");
            }
            else if (res.status.toString()[0] === "4") {
                alert("קרתה תקלה בדיווח התקלה");
            }
            console.log(res);
            closeModal();
        }, details);
    }

    useEffect(() => {
        if (reportDetails) {
            setDetails(reportDetails);
        }
    }, [reportDetails]);

    return (
        <div>
            <form id="error-report-form-page1" className={displayedFormClass}>
                <div className="form-group">
                    <label className="form-label form-label-sm">תקציר התקלה</label>
                    <input value={details ? details.report_summary : null} 
                        onChange={
                            ({ target: { value } }) => setDetails(details => ({ ...details, report_summary: value }))
                        } type="text" className="form-control form-control-sm" placeholder="תקציר התקלה"/>
                </div>
                <div className="form-group">
                    <label className="form-label form-label-sm">תיאור התקלה</label>
                    <textarea value={details ? details.report_description : null} rows="3" 
                    onChange={
                        ({ target: { value } }) => setDetails(details => ({ ...details, report_description: value }))
                        } type="text" className="form-control form-control-sm" placeholder="תיאור התקלה (בפירוט)"/>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label form-label-sm">פלטפורמה</label>
                            <select value={details ? details.report_platform : "0"} onChange={({ target: { value } }) => setDetails(details => ({ ...details, report_platform: value }))} className="form-control form-control-sm">
                                <option value="0">פלטפורמה</option>
                                {
                                    platforms.map((platform, index) =>
                                        <option key={platform.id} value={platform.id}>{platform.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label form-label-sm">מערכת</label>
                            <select value={details ? details.report_system : "0"} onChange={
                                ({ target: { value } }) => 
                                    setDetails(details => ({ ...details, report_system: value }))
                                } className="form-control form-control-sm">
                                <option value="0">מערכת</option>
                                {
                                    systems.map((system, index) =>
                                        <option key={system.id} value={system.id}>{system.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>                      
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label form-label-sm">תת-פלטפורמה</label>
                            <select value={details ? details.report_sub_platform : "0"} onChange={
                                ({ target: { value } }) => setDetails(details => ({ ...details, report_sub_platform: value }))
                            } className="form-control form-control-sm">
                                <option value="0">תת-פלטפורמה</option>
                                {
                                    subPlatforms.map((sub_platform, index) =>
                                        <option key={sub_platform.id} value={sub_platform.id}>{sub_platform.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                            <label className="form-label form-label-sm">תאריך התקלה</label>
                            <input onChange={({ target: { value } }) => setDetails(details => ({
                                ...details, report_fault_date: (new Date(value)).toISOString() 
                            }))} type="date" className="form-control form-control-sm" placeholder="תאריך התקלה"/>
                        </div>
                    </div>                         
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label form-label-sm">מספר פלטפורמה</label>
                            <input value={details ? details.report_platform_num : null} 
                            onChange=
                                {({ target: { value } }) => setDetails(details => ({ ...details, report_platform_num: value }))
                            } type="number" className="form-control form-control-sm" placeholder="מספר פלטפורמה"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label form-label-sm">מיקום</label>
                            <input value={details ? details.report_location : null} 
                            onChange={
                                ({ target: { value } }) => setDetails(details => ({ ...details, report_location: value }))
                            } type="text" className="form-control form-control-sm" placeholder="מיקום"/>
                        </div>
                    </div>                         
                </div>

                <div className="buttons-wrapper">
                    <button id="finish-button" onClick={goToSecondPage} type="button" className="btn btn-primary">
                        <FontAwesomeIcon icon={faLongArrowAltLeft}/> המשך
                    </button>
                </div>
            </form>
            <form id="error-report-form-page2" className={hiddenFormClass}>
                <div className="row">
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <div className="form-check pull-right">
                            <input className="form-check-input" type="checkbox" onChange={
                            ({ target: { value } }) => setDetails(details => ({
                                 ...details, report_reoccuring_on_same_vehicle: !details.report_reoccuring_on_same_vehicle }))} 
                            checked={details ? details.report_reoccuring_on_same_vehicle : null} id="reoccuring-on-same-vehicle-check"/>
                            
                            <label className="form-check-label" htmlFor="reoccuring-on-same-vehicle-check" style={{marginRight: "1.5rem"}}>
                                התקלה משתחזרת על הכלי
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <div className="form-check pull-right">
                            <input className="form-check-input" type="checkbox" onChange={
                            ({ target: { value } }) => setDetails(details => ({
                                 ...details, report_reoccuring_on_other_vehicles: !details.report_reoccuring_on_other_vehicles }))} 
                            checked={details ? details.report_reoccuring_on_other_vehicles : null} id="reoccuring-on-other-vehicles-check"/>

                            <label className="form-check-label" htmlFor="reoccuring-on-other-vehicles-check" style={{marginRight: "1.5rem"}}>
                                התקלה משתחזרת על כלים אחרים
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <div className="form-check pull-right">
                            <input className="form-check-input" type="checkbox" onChange={
                            ({ target: { value } }) => setDetails(details => ({
                                 ...details, report_appears_in_errors_file: !details.report_appears_in_errors_file }))} 
                            checked={details ? details.report_appears_in_errors_file : null} id="appears-in-errors-file-check"/>

                            <label className="form-check-label" htmlFor="appears-in-errors-file-check" style={{marginRight: "1.5rem"}}>
                                התקלה מופיעה בקובץ התקלות של המערכת
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <div className="form-check pull-right">
                            <input className="form-check-input" type="checkbox" onChange={onTempSolutionFoundCheckClicked} 
                            checked={details ? details.report_temp_solution_found : null} id="temp-solution-found-check"/>

                            <label className="form-check-label" htmlFor="temp-solution-found-check" style={{marginRight: "1.5rem"}}>
                                נמצא פתרון זמני לתקלה אצל המדווח
                            </label>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <label className="form-label form-label-sm">תיאור הפתרון הזמני</label>
                    <textarea value={details ? details.report_temp_solution_description : null} rows="3" 
                    onChange={
                        ({ target: { value } }) => setDetails(details => ({ ...details, report_temp_solution_description: value }))
                        } type="text" className="form-control form-control-sm" placeholder="תיאור הפתרון הזמני" id="temp-solution-textarea" disabled/>
                </div>

                <div className="buttons-wrapper">
                    <button id="back-button" onClick={goToFirstPage} type="button" className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faLongArrowAltRight}/> חזור
                    </button>
                    <button id="finish-button" onClick={addReport} type="submit" className="btn btn-primary">
                        <FontAwesomeIcon icon={faUpload}/> סיים
                    </button>
                </div>
            </form>
        </div>
    )
}