import React, { useState } from 'react';
import '../styles/MainPage.css';
import ReportModal from './ReportModal';
import ViewEditReportForm from './ViewEditReportForm';

export default function ViewEditReportModal(props) {
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails;
    const isViewEditReportModalOpen = props.isViewEditReportModalOpen;
    const closeViewEditReportModal = props.closeViewEditReportModal;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;

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
        closeViewEditReportModal = {closeViewEditReportModal}
    />;
    
    return (
        <ReportModal
            isOpen = {isViewEditReportModalOpen} 
            onRequestClose = {closeViewEditReportModal} 
            title = {titleText} 
            HostedComponent = {FormComponent}
        >
            
        </ReportModal>
    )
}
