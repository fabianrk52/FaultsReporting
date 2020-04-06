import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import formatISODate from '../utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'

export default function ViewEditReportForm(props) {
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    
    const onEditingEnabled = props.onEditingEnabled;
    const closeViewEditReportModal = props.closeViewEditReportModal;

    //TODO: Delete this afterwards!
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

    const displayedButtonClass = "btn btn-primary";
    const hiddenButtonClass = "btn btn-primary d-none";

    const [details, setDetails] = useState(emptyDetails)

    useEffect(() => {
        if (reportDetails) {
            setDetails(reportDetails);
        }
    }, [reportDetails]);

    const enableEditing = () => {
        var formControls = document.getElementsByClassName("form-control");
        for(var i = 0; i < formControls.length; i++) {
            formControls[i].disabled = false;
        }

        document.getElementById("edit-button").className = hiddenButtonClass;
        document.getElementById("save-button").className = displayedButtonClass;

        onEditingEnabled();
    }

    const updateReport = () => {
        serverConnection.updateReport((res) => {
            console.log(res);
            closeViewEditReportModal();
        }, reportDetails._id, details);
    }

    return (
        <form className="form-wrapper">
            <div className="form-group">
                <label className="form-label form-label-sm">תקציר התקלה</label>
                <input value={details ? details.report_summary : null} 
                    onChange={
                        ({ target: { value } }) => setDetails(details => ({ ...details, report_summary: value }))
                    } type="text" className="form-control form-control-sm" placeholder="תקציר התקלה" disabled/>
            </div>
            <div className="form-group">
                <label className="form-label form-label-sm">תיאור התקלה</label>
                <textarea value={details ? details.report_description : null} rows="3" 
                onChange={
                    ({ target: { value } }) => setDetails(details => ({ ...details, report_description: value }))
                    } type="text" className="form-control form-control-sm" placeholder="תיאור התקלה (בפירוט)" disabled/>
            </div>
            <div className="form-group" style={{marginBottom: "1rem"}}>
                <label className="form-label form-label-sm">המדווח על התקלה</label>
                <input value={reportDetails ? reportDetails.report_reporter_username : null} 
                    type="text" className="form-control form-control-sm" placeholder="המדווח על התקלה" disabled/>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label form-label-sm">פלטפורמה</label>
                        <select value={details ? details.report_platform : "0"} onChange={({ target: { value } }) => setDetails(details => ({ ...details, report_platform: value }))} className="form-control form-control-sm" disabled>
                            <option value="0" disabled>פלטפורמה</option>
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
                            } className="form-control form-control-sm" disabled>
                            <option value="0" disabled>מערכת</option>
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
                        } className="form-control form-control-sm" disabled>
                            <option value="0" disabled>תת-פלטפורמה</option>
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
                        <input value={details ? formatISODate(details.report_fault_date) : null} 
                        onChange={
                            ({ target: { value } }) => setDetails(details => ({ ...details, report_fault_date: (new Date(value)).toISOString() }))
                        } type="date" className="form-control form-control-sm" placeholder="תאריך התקלה" disabled/>
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
                        } type="number" className="form-control form-control-sm" placeholder="מספר פלטפורמה" disabled/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label form-label-sm">מיקום</label>
                        <input value={details ? details.report_location : null} 
                        onChange={
                            ({ target: { value } }) => setDetails(details => ({ ...details, report_location: value }))
                        } type="text" className="form-control form-control-sm" placeholder="מיקום" disabled/>
                    </div>
                </div>                         
            </div>

            <div className="buttons-wrapper">
                <button id="edit-button" onClick={enableEditing} type="button" className={displayedButtonClass}>
                    <FontAwesomeIcon icon={faEdit}/> ערוך
                </button>
                <button id="save-button" onClick={updateReport} type="button" className={hiddenButtonClass}>
                    <FontAwesomeIcon icon={faSave}/> שמור
                </button>
            </div>
        </form>
    )
}