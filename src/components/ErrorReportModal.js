import React from 'react';
import '../styles/MainPage.css';
import ReportModal from './ReportModal';
import ErrorReportForm from './ErrorReportForm';

export default function ErrorReportModal(props) {
    // Handle Props
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails;
    const isModalOpen = props.isModalOpen;
    const closeModal = props.closeModal;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    const appElement = props.appElement;
    const getSystems = props.getSystems;
    const getPlatforms = props.getPlatforms;
    const getSubPlatforms = props.getSubPlatforms;
    ////

    const FormComponent = <ErrorReportForm 
        serverConnection = {serverConnection} 
        reportDetails = {reportDetails} 
        platforms = {platforms} 
        subPlatforms = {subPlatforms} 
        systems = {systems} 
        closeModal = {closeModal}
    />;
    
    return (
        <ReportModal
            isOpen = {isModalOpen} 
            onRequestClose = {closeModal} 
            title = "דיווח תקלה" 
            HostedComponent = {FormComponent}
            appElement = {appElement}
            getSystems = {getSystems}
            getPlatforms = {getPlatforms}
            getSubPlatforms = {getSubPlatforms}
        />
    )
}
