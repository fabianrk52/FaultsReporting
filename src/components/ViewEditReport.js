import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import '../styles/MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ViewEditReport(props) {
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

    const [details, setDetails] = useState(emptyDetails);

    useEffect(() => {
        if (reportDetails) {
            setDetails(reportDetails)
        }
    });
    
    return (
        <Modal
                id="view-edit-report-modal"
                isOpen={isViewEditReportModalOpen}
                onRequestClose={closeViewEditReportModal}
                contentLabel="Report new fault"
                className="Modal container"
                overlayClassName="Overlay"
                parentSelector = {
                    () => document.getElementById("main-page")
                }
            >
                <form className="form-wrapper">
                    <label className="headline text-center" style={{fontSize: "22px", paddingBottom: 0, paddingTop: ".5rem"}}>
                        <p style={{marginBottom: 0}}>{reportDetails ? `צפייה בתקלה - ${reportDetails._id}#` : null}</p>
                    </label>
                    <div className="form-group">
                        <label className="form-label form-label-sm">תקציר התקלה</label>
                        <input value={details ? details.report_summary : null} 
                            onChange={
                                ({ target: { value } }) => setDetails(details => ({ ...details, report_summary: value }))
                            } type="text" className="form-control form-control-sm" placeholder="תקציר התקלה" readOnly disabled/>
                    </div>
                    <div className="form-group">
                        <label className="form-label form-label-sm">תיאור התקלה</label>
                        <textarea value={details ? details.report_description : null} rows="3" 
                        onChange={
                            ({ target: { value } }) => setDetails(details => ({ ...details, report_description: value }))
                            } type="text" className="form-control form-control-sm" placeholder="תיאור התקלה (בפירוט)" readOnly disabled/>
                    </div>
                    <div className="form-group" style={{marginBottom: "1rem"}}>
                        <label className="form-label form-label-sm">המדווח על התקלה</label>
                        <input value={reportDetails ? reportDetails.report_reporter_username : null} 
                            type="text" className="form-control form-control-sm" placeholder="תקציר התקלה" readOnly disabled/>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label form-label-sm">פלטפורמה</label>
                                <select value={details ? details.report_platform : null} onChange={({ target: { value } }) => setDetails(details => ({ ...details, report_platform: value }))} className="form-control form-control-sm" readOnly disabled>
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
                                <select value={details ? details.report_system : null} onChange={({ target: { value } }) => setDetails(details => ({ ...details, report_system: value }))} className="form-control form-control-sm" readOnly disabled>
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
                                } className="form-control form-control-sm" readOnly disabled>
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
                                <input value={details ? details.report_fault_date : null} 
                                onChange={
                                    ({ target: { value } }) => setDetails(details => ({ ...details, report_fault_date: value }))
                                } type="date" className="form-control form-control-sm" placeholder="תאריך התקלה" readOnly disabled/>
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
                                } type="number" className="form-control form-control-sm" placeholder="מספר פלטפורמה" readOnly disabled/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label form-label-sm">מיקום</label>
                                <input value={details ? details.report_location : null} 
                                onChange={
                                    ({ target: { value } }) => setDetails(details => ({ ...details, report_location: value }))
                                } type="text" className="form-control form-control-sm" placeholder="מיקום" readOnly disabled/>
                            </div>
                        </div>                         
                    </div>

                    <div className="buttons-wrapper">
                        <button onClick={closeViewEditReportModal} type="button" className="btn btn-outline-primary"> {"<- חזור "} </button>
                        {/* <button onClick={showSecondStage} type="button" className="btn btn-primary">המשך -></button> */}
                        {/* <button onClick={newReport} type="button" className="btn btn-primary">שלח דיווח -></button> */}
                    </div>
                </form>
            </Modal>
    )
}
