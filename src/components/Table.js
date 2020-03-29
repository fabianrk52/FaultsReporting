import React, { useEffect, useState } from 'react';
import { CheckBox, Option, DropDown, OptionGroup } from 'react-form-elements/'
import '../styles/Table.css';


export default function Table() {
    function sendReport() {
        alert(1);
    }
    return (
        <div className="table-page">
            <div className="headline">
                <label>
                    <u><h1 >דיווח תקלות</h1></u>
                </label>
            </div>
            <div className="table-wrapper">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">הנדון</th>
                            <th scope="col">המדווח</th>
                            <th scope="col">קריטיות</th>
                            <th scope="col">עבר תחקיר</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr onDoubleClick={sendReport}>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
