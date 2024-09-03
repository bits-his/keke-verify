import React, { useEffect, useState } from 'react';
import { Badge, Card, CardBody } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import kanoState from "../assets/Kano-state-logo.png"
import brainstormLogo from "../assets/logo.png"


export function toWordsconver(s) {
  var th_val = ['', 'thousand', 'million', 'billion', 'trillion'];
  var dg_val = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  var tn_val = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var tw_val = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if (s) {
    s = s.toString() || 0;
    s = s.replace(/[\\, ]/g, '');
    if (s != parseInt(s)) return 'not a number ';
    var x_val = s.indexOf('.');
    if (x_val == -1) x_val = s.length;
    if (x_val > 15) return 'too big';
    var n_val = s.split('');
    var str_val = '';
    var sk_val = 0;
    for (var i = 0; i < x_val; i++) {
      if ((x_val - i) % 3 == 2) {
        if (n_val[i] == '1') {
          str_val += tn_val[Number(n_val[i + 1])] + ' ';
          i++;
          sk_val = 1;
        } else if (n_val[i] != 0) {
          str_val += tw_val[n_val[i] - 2] + ' ';
          sk_val = 1;
        }
      } else if (n_val[i] != 0) {
        str_val += dg_val[n_val[i]] + ' ';
        if ((x_val - i) % 3 == 0) str_val += 'hundred ';
        sk_val = 1;
      }
      if ((x_val - i) % 3 == 1) {
        if (sk_val) str_val += th_val[(x_val - i - 1) / 3] + ' ';
        sk_val = 0;
      }
    }
    if (x_val != s.length) {
      var y_val = s.length;
      str_val += 'point ';
      for (var e = x_val + 1; e < y_val; e++) str_val += dg_val[n_val[e]] + ' ';
    }
    return str_val.replace(/\s+/g, ' ');
  }
}

export function Lines(props) {
  return (
    <div className='border d-flex justify-content-between align-items-center mb-2 p-2'>
      <span className='fw-bold text-start left'>{props.left}</span>
      <span className='fw-bold text-end right'>{props.right}</span>
    </div>
  );
}

export function LinesBadge(props) {
  return (
    <div className='border d-flex justify-content-between align-items-center mb-2 p-2'>
      <span className='fw-bold text-start left'>{props.left}</span>
      <span className='rounded-pill bg-info px-2 text-white fw-bold right text-end'>{props.right}</span>
    </div>
  );
}

export default function VerifyInvoice() {
  const { num } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://galaxybis.ebudgetkano.ng/financial-mgt-backend/api/verify/invoice?ref_no=${num}`);
        const data = await response.json();
        if (data.success && data.results && data.results.length > 0) {
          setInvoiceData(data.results[0]);
        } else {
          console.error('No results found');
        }
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [num]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const total = invoiceData?.paymentAmount || '0';
  const integerPart = total.toString().split('.')[0];
  const decimalPart = total.toString().split('.')[1] || '00';
  const amountInWords = `${toWordsconver(integerPart)?.toUpperCase() || ''} NAIRA ${
    decimalPart !== '00' ? `AND ${toWordsconver(decimalPart)?.toUpperCase() || ''} KOBO` : ''
  } ONLY`;

  const receiptType = invoiceData?.status === 'success'
    ? 'ONLINE RECEIPT'
    : invoiceData?.status === 'PAID'
      ? 'EVIDENCE OF PAYMENT'
      : 'INVOICE';

  return (
    <>
      {/* <button className='mb-3 btn btn-success py-1 px-4' onClick={handleBack}  style={{
        marginLeft: "-76%"        
      }}>Back</button> */}
         <div>
        <nav onClick={handleBack} className='text-success text-start fw-bold mx-auto back-text-btn mb-2'>{`<`} Back</nav>
      </div>
      {/* <button className='mb-3 btn btn-success py-1 px-4 position-absolute top-0 start-0' onClick={handleBack}>Back</button> */}
      <Card className='verify-pay-card'>
        <CardBody className='p-0'>
          <div className='card-heading'>
            <h1 className='text-center mb-3 text-capitalize'>VERIFY INVOICE</h1>
            <small className='bg-secondary text-white text-center p-1 text-capitalize'>
              {receiptType}
            </small>
          </div>
          <div className='d-flex flex-column'>
            <Lines left={"Ref No.:"} right={invoiceData?.reference_number || 'N/A'} />
            <Lines left={"Paid By:"} right={invoiceData?.tax_payer || 'N/A'} />
            <Lines left={"Phone:"} right={invoiceData?.phone || 'N/A'} />
            <Lines left={"Revenue Head:"} right={invoiceData?.description || 'N/A'} />
            <LinesBadge left={"Status:"} right={invoiceData?.status || 'N/A'} />
            <Lines left={"Amount:"} right={`₦${invoiceData?.paymentAmount || 'N/A'}`} />
            <Lines left={"Amount in Words:"} right={amountInWords} />
            <Lines left={"MDA:"} right={invoiceData?.mda_name || 'N/A'} />
            <Lines left={"Payment Period:"} right={`${invoiceData?.date_from || 'N/A'} - ${invoiceData?.date_to || 'N/A'}`} />
          </div>
        </CardBody>
      </Card>

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
