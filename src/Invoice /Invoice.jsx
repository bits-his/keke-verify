import React, { useState } from 'react';
import img from '../assets/kirs.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import kanoState from '../assets/Kano-state-logo.png';
import brainstormLogo from '../assets/logo.png';

function Invoice() {
    const [refNo, setRefNo] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setRefNo(e.target.value);
    };

    const handleVerify = async () => {
        navigate(`/${refNo}/tax/type/clearance-certificate/invoice/view`);
    };

    return (
        <>
            <div className="position-relative container-field card shadow px-md-4 pb-md-4 px-sm-4 pb-sm-4">
                <img src={img} width={150} height={150} className="position-absolute kirs-logo pb-2 mx-auto" />
                <h3 className="pb-4">Verify Tax Clearance Certificate</h3>
                <form>
                    <div className="mb-3 text-start">
                        <label htmlFor="assessment-no" className="form-label">
                            Invoice Reference Number:{' '}
                        </label>
                        <input
                            type="text"
                            className="form-control text-center"
                            id="assessment-no"
                            value={refNo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input type="button" className="btn btn-success py-1 px-4" value="Verify" onClick={handleVerify} />
                </form>
            </div>
            <div className="altered-footer w-100">
                <div className="left1">
                    <img src={kanoState} alt="Kano state logo" className="altered-footer-logo" />
                    <p>POWERED BY</p>
                    <p>KANO STATE GOVERNMENT</p>
                </div>
                <div className="right2">
                    <img src={brainstormLogo} alt="Brainstorm logo" className="altered-footer-logo" />
                    <p>DEVELOPED BY</p>
                    <p>BRAINSTORM IT SOLUTIONS</p>
                </div>
            </div>
        </>
    );
}

export default Invoice;
