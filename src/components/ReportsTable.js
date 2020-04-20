import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import ViewEditReportModal from './ViewEditReportModal';
import '../styles/Table.css';

export default function ReportsTable(props){
    // Handle Props
    const getReports = props.getReports;
    const serverConnection = props.serverConnection;
    const tableData = props.tableData;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    const appElement = props.appElement;
    const getSystems = props.getSystems;
    const getPlatforms = props.getPlatforms;
    const getSubPlatforms = props.getSubPlatforms;
    ////

    // State
    const [selectedReport, setSelectedReport] = useState(null);
    const [isViewEditReportModalOpen, setIsViewEditReportModalOpen] = useState(false);
    ////

    // Custom Styles
    const StyledTableCell = withStyles((theme) => ({
        head: {
            fontSize: "1.1rem", 
            fontWeight: "bold", 
            padding: 8,  
            color: theme.palette.common.white
        },
        body: {
            fontSize: "1.1rem", 
            padding: 8
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }))(TableRow);

    const tableWrapperStyle = {
        paddingBottom: "2%", 
        paddingTop: "2%", 
        paddingLeft: "2%", 
        paddingRight: "2%"
    };
    ////

    function onSelectReportOnTable(report) {
        setSelectedReport(report);
        openViewEditReportModal();
    }

    function openViewEditReportModal() {
        setIsViewEditReportModalOpen(true);
    }

    function closeViewEditReportModal() {
        getReports(() => {
            setIsViewEditReportModalOpen(false);
        }); 
    }

    useEffect(() => {
        getReports();
    }, []);

    function renderTableData() {
        return tableData.map((report, index) => {
            const { 
                _id, 
                report_summary, 
                report_reporting_date, 
                report_priority, 
                report_reporter_username, 
                report_platform, 
                report_status
            } = report //destructuring
            return (
                <StyledTableRow key={_id}>
                    <StyledTableCell align="center"><span className="HyperlinkText" onClick={() => onSelectReportOnTable(report)}>{_id}</span></StyledTableCell>
                    <StyledTableCell align="center">{report_summary}</StyledTableCell>
                    <StyledTableCell align="center">{new Date(report_reporting_date).toLocaleDateString("he-IL", "short") || "-"}</StyledTableCell>
                    <StyledTableCell align="center">{report_priority || "טרם הוגדר"}</StyledTableCell>
                    <StyledTableCell align="center">{"-"}</StyledTableCell>  
                    <StyledTableCell align="center">{report_reporter_username}</StyledTableCell>
                    <StyledTableCell align="center">{report_platform}</StyledTableCell>
                    <StyledTableCell align="center">{report_status || "טרם עודכן"}</StyledTableCell>
                </StyledTableRow>
            )
        })
    }

    return(
        <div className="table-page">
            <ViewEditReportModal 
                    id="view-edit-report-modal" 
                    serverConnection={serverConnection}
                    reportDetails={selectedReport} 
                    isModalOpen={isViewEditReportModalOpen} 
                    closeModal={closeViewEditReportModal} 
                    platforms = {platforms} 
                    subPlatforms = {subPlatforms} 
                    systems = {systems}     
                    appElement={appElement} 
                    getSystems = {getSystems}
                    getPlatforms = {getPlatforms}
                    getSubPlatforms = {getSubPlatforms}/>
            <div>
                <h2 style={{fontWeight: "bold", textAlign: "center", marginTop: "1.1rem"}}>דיווח תקלות</h2>
            </div>
            <TableContainer style={tableWrapperStyle}>
                <Table>
                    <TableHead className="bg-primary">
                        <TableRow>
                            <StyledTableCell align="center" scope="col">#</StyledTableCell>
                            <StyledTableCell align="center" scope="col">תקציר התקלה</StyledTableCell>
                            <StyledTableCell align="center" scope="col">תאריך דיווח</StyledTableCell>
                            <StyledTableCell align="center" scope="col">עדיפות</StyledTableCell>
                            <StyledTableCell align="center" scope="col">סוג המדווח</StyledTableCell>
                            <StyledTableCell align="center" scope="col">המדווח</StyledTableCell>
                            <StyledTableCell align="center" scope="col">פלטפורמה</StyledTableCell>
                            <StyledTableCell align="center" scope="col">סטאטוס</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableData()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
