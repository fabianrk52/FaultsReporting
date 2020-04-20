import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import '../styles/Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ServerConnection from '../utils/ServerConnection';
import ViewEditReportModal from './ViewEditReportModal';
import ErrorReportModal from './ErrorReportModal';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';


import Errors from './Errors';
import {Route, BrowserRouter} from "react-router-dom";
const server_ip = "http://127.0.0.1"
const server_port = "4000"

export default function MainPage() {
    const self = document.getElementById("main-page"); //Getting current element manually as no better method found
    const serverConnection = new ServerConnection(server_ip, server_port);

    const emptyDetails = {
        report_description: '',
        report_fault_date: null, 
        report_location: '', 
        report_platform: 0, 
        report_platform_num: 0,  
        report_reporting_date: null, 
        report_reporter_username: '', 
        report_sub_platform: 0, 
        report_system: 0, 
        report_summary: ''
    }
    
    const [tableData, setTableData] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [subPlatforms, setSubPlatforms] = useState([]);
    const [systems, setSystems] = useState([]);
    const [selectedFault, setSelectedFault] = useState(null);
    const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
    const [isViewEditReportModalOpen, setIsViewEditReportModalOpen] = useState(false);

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

    function openNewReportModal() {
        setIsNewReportModalOpen(true);
    }

    function closeNewReportModal() {
        getReports(() => {
            setIsNewReportModalOpen(false);
        });
    }

    function openViewEditReportModal() {
        setIsViewEditReportModalOpen(true);
    }

    function closeViewEditReportModal() {
        getReports(() => {
            setIsViewEditReportModalOpen(false);
        }); 
    }

    function onSelectReportOnTable(report) {
        setSelectedFault(report);
        openViewEditReportModal();
    }

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

    const getReports = (callback = null) => {
        serverConnection.getReports(res => {
            const reports = res.data;
            console.log("Reports: " + reports);
            setTableData(reports);
            if (callback) {
                callback();
            }
        });
    }

    const getSystems = (callback = null) => {
        serverConnection.getSystems(res => {
            const systems = res.data;
            console.log("Systems: " + systems);
            setSystems(systems);
            if (callback) {
                callback();
            }
        });
    }

    const getPlatforms = (callback = null) => {
        serverConnection.getPlatforms(res => {
            const platforms = res.data;
            console.log("Platforms: " + platforms);
            setPlatforms(platforms);
            if (callback) {
                callback();
            }
        });
    }

    const getSubPlatforms = (callback = null) => {
        serverConnection.getSubPlatforms(res => {
            const subPlatforms = res.data;
            console.log("Sub-Platforms: " + subPlatforms);
            setSubPlatforms(subPlatforms);
            if (callback) {
                callback();
            }
        });
    }

    useEffect(() => {
        getReports();
        getSystems();
        getPlatforms();
        getSubPlatforms();
    }, []);

    return (
        <div id="main-page" className="container-fluid" style={{paddingRight: 0, paddingLeft: 0}}>
            <nav className="navbar navbar-dark bg-primary sticky-top pull-right">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars}/>
                </button>
            </nav>
			<div id="main-container" className="container-fluid">
                <BrowserRouter basename="/app">
                    <Route exact path="/" render={() => <Errors openNewReportModal={openNewReportModal} renderTableData={renderTableData} />}></Route>
                </BrowserRouter>
                <ErrorReportModal
                    id="error-report-modal"
                    reportDetails={emptyDetails} 
                    isModalOpen={isNewReportModalOpen}
                    closeModal={closeNewReportModal}
                    appElement={self} 
                    platforms={platforms} 
                    subPlatforms={subPlatforms} 
                    systems={systems} 
                    serverConnection={serverConnection}/>
                
                <ViewEditReportModal 
                    id="view-edit-report-modal" 
                    reportDetails={selectedFault} 
                    isModalOpen={isViewEditReportModalOpen} 
                    closeModal={closeViewEditReportModal} 
                    appElement={self} 
                    platforms={platforms} 
                    subPlatforms={subPlatforms} 
                    systems={systems} 
                    serverConnection={serverConnection}/>
                
				<div className="table-page">
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
                    <div className="button-wrapper">
                        <button onClick={openNewReportModal} type="button" className="btn btn-outline-primary">פתח תקלה חדשה -></button>
                    </div>
				</div>
            </div>
        </div>
    )
}
        </div>
    )
}
