import React from 'react';

export default function Errors(props){
    return(
        <div className="table-page">
        <div className="headline">
            <label>
                <u><h1 >דיווח תקלות</h1></u>
            </label>
        </div>
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">תקציר התקלה</th>
                        <th scope="col">תאריך דיווח</th>
                        <th scope="col">עדיפות</th>
                        <th scope="col">סוג המדווח</th>
                        <th scope="col">המדווח</th>
                        <th scope="col">פלטפורמה</th>
                        <th scope="col">סטאטוס</th>
                    </tr>
                </thead>
                <tbody>
                    {props.renderTableData()}
                </tbody>
            </table>
        </div>
    </div>
    )
}
