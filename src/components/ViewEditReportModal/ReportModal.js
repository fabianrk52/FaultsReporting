import React, { useEffect } from 'react';
import Modal from 'react-modal'
// import '../styles/MainPage.css';
import '../MainPage/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function ReportModal(props) {
    var rtlDetect = require('rtl-detect');
    const isRightToLeft = rtlDetect.isRtlLang(navigator.language);
    const closeButtonStyle = isRightToLeft ? {position: "absolute", top: "5px", right: "5px", fontSize: "26px", backgroundColor: 'transparent', borderRadius: 0, padding: 0}
                                             : {position: "absolute", top: "5px", left: "5px", fontSize: "26px", backgroundColor: 'transparent', borderRadius: 0, padding: 0}

    // Handle Props
    const isReportModalOpen = props.isOpen;
    const closeReportModal = props.onRequestClose;
    const modalTitle = props.title;
    const HostedComponent = props.HostedComponent;
    const appElement = props.appElement;
    const getSystems = props.getSystems;
    const getPlatforms = props.getPlatforms;
    const getSubPlatforms = props.getSubPlatforms;
    ////

    useEffect(() => {
        getSystems();
        getPlatforms();
        getSubPlatforms();
    }, []);
    
    return (
        <Modal
                id="report-modal"
                isOpen={isReportModalOpen}
                onRequestClose={closeReportModal}
                contentLabel="Report Modal"
                className="Modal container"
                overlayClassName="Overlay"
                appElement={appElement}
            >
            <div className="container" style={{position: "relative"}}>
                <label className="headline text-center" style={{fontSize: "22px", paddingBottom: 0, paddingTop: ".5rem"}}>
                    <p style={{marginBottom: 0}}>{modalTitle}</p>
                </label>
                <button className='btn' style={closeButtonStyle} onClick={closeReportModal}>
                    <FontAwesomeIcon icon={faTimes}/> 
                </button>
            </div>
            <div>{HostedComponent}</div>
        </Modal>
    )
}