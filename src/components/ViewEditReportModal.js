import React, { useState } from 'react';
import '../styles/MainPage.css';
import ReportModal from './ReportModal';
import ViewEditReportForm from './ViewEditReportForm';

export default function ViewEditReportModal(props) {
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

    // State
    const [titleText, setTitleText] = useState("צפייה בתקלה");
    ////

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
            getSystems = {getSystems}
            getPlatforms = {getPlatforms}
            getSubPlatforms = {getSubPlatforms}
        />
    )
}
