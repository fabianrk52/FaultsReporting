import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import '../styles/MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faSave } from '@fortawesome/free-solid-svg-icons'


export default function ViewEditReport(props) {
    var rtlDetect = require('rtl-detect');
    const serverConnection = props.serverConnection;
    const isRightToLeft = rtlDetect.isRtlLang(navigator.language);
    const closeButtonStyle = isRightToLeft ? {position: "absolute", top: "5px", right: "5px", fontSize: "26px", backgroundColor: 'transparent', borderRadius: 0, padding: 0}
                                             : {position: "absolute", top: "5px", left: "5px", fontSize: "26px", backgroundColor: 'transparent', borderRadius: 0, padding: 0}
    const reportDetails = props.reportDetails;
    const isViewEditReportModalOpen = props.isViewEditReportModalOpen;
    const closeViewEditReportModal = props.closeViewEditReportModal;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;

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

    const [titleText, setTitleText] = useState("צפייה בתקלה");
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

        setTitleText("עריכת תקלה");
    }

    const updateReport = () => {
        console.log(details);
        serverConnection.updateReport(() => {}, reportDetails._id, details);
        closeViewEditReportModal();
    }

    const formatISODate = (date) => {
        if (date) {
            const dateObj = new Date(date);
            const year = dateObj.getFullYear();
            let month = dateObj.getMonth()+1;
            let dt = dateObj.getDate();
    
            if (dt < 10) {
            dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
    
            return year+'-' + month + '-'+dt;
        }
        
    }
    
    return (
        <Modal
                id="view-edit-report-modal"
                isOpen={isViewEditReportModalOpen}
                onRequestClose={closeViewEditReportModal}
                contentLabel="View or Edit Report"
                className="Modal container"
                overlayClassName="Overlay"
                parentSelector = {
                    () => document.getElementById("main-page")
                }
            >
                <div className="container" style={{position: "relative"}}>
                    <label className="headline text-center" style={{fontSize: "22px", paddingBottom: 0, paddingTop: ".5rem"}}>
                        <p style={{marginBottom: 0}}>{reportDetails ? `${titleText} - ${reportDetails._id}#` : null}</p>
                    </label>
                    {}
                    <button class='btn' style={closeButtonStyle} onClick={closeViewEditReportModal}>
                        <FontAwesomeIcon icon={faTimes}/> 
                    </button>
                </div>
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
                                <select value={details ? details.report_platform : null} onChange={({ target: { value } }) => setDetails(details => ({ ...details, report_platform: value }))} className="form-control form-control-sm" disabled>
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
                                <label className="form-label form-label-sm">מערכת</label>
                                <select value={details ? details.report_system : null} onChange={
                                    ({ target: { value } }) => 
                                        setDetails(details => ({ ...details, report_system: value }))
                                    } className="form-control form-control-sm" disabled>
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

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label form-label-sm">תת-פלטפורמה</label>
                                <select value={details ? details.report_sub_platform : null} onChange={
                                    ({ target: { value } }) => setDetails(details => ({ ...details, report_sub_platform: value }))
                                } className="form-control form-control-sm" disabled>
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
            </Modal>
    )
}
