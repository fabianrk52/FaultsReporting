import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import formatISODate from '../utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

export default function ErrorReportForm(props) {
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    
    const closeModal = props.closeModal;

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

    const [details, setDetails] = useState(emptyDetails)

    const addReport = () => {
        details.report_reporting_date = (new Date()).toISOString();
        serverConnection.addReport((res) => {
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
        <form className="form-wrapper">
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
                <button id="finish-button" onClick={addReport} type="button" className={displayedButtonClass}>
                    <FontAwesomeIcon icon={faUpload}/> סיים
                </button>
            </div>
        </form>
    )
}