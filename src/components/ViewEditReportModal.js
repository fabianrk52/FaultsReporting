import React, { useState } from 'react';
import '../styles/MainPage.css';
import ReportModal from './ReportModal';
import ViewEditReportForm from './ViewEditReportForm';

export default function ViewEditReportModal(props) {
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails;
    const isModalOpen = props.isModalOpen;
    const closeModal = props.closeModal;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    const appElement = props.appElement;

    const [titleText, setTitleText] = useState("צפייה בתקלה");

    const onEditingEnabled = () => {
        setTitleText("עריכת תקלה");
    }

    const FormComponent = <ViewEditReportForm 
        serverConnection = {serverConnection} 
        reportDetails = {reportDetails} 
        platforms = {platforms} 
        subPlatforms = {subPlatforms} 
        systems = {systems} 
        onEditingEnabled = {onEditingEnabled} 
        closeViewEditReportModal = {closeModal}
    />;
    
    return (
        <ReportModal
            isOpen = {isModalOpen} 
            onRequestClose = {closeModal} 
            title = {titleText} 
            HostedComponent = {FormComponent}
            appElement = {appElement}
        />
    )
}
