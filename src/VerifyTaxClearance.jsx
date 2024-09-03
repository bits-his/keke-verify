import { useEffect, useState } from "react";
import "./App.css";
import { Alert, Col, Container } from "reactstrap";
import { ImCheckmark } from "react-icons/im";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import kanoState from "./assets/Kano-state-logo.png"
import brainstormLogo from "./assets/logo.png"
export function VerifyTaxClearance() {
  const { num } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://galaxybis.ebudgetkano.ng/financial-mgt-backend/verify-tax_clearance?tcc_ref=${num}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", authorization: "" },
      }
    )
      .then((raw) => raw.json())
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.success) {
          setData(response.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [num]);
  return loading ? (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <p>
        <Skeleton count={10} height={50} />
      </p>
    </SkeletonTheme>
  ) : (
    <>
      <div>
        <nav onClick={handleBackClick} className='text-success text-start fw-bold mx-auto back-text-btn'>{`<`} Back</nav>
      </div>
      {data.length ? (
        <div className="d-flex align-items-center justify-content-center mb-5">
        {/* <Col md={3}></Col> */}
        <Col md={12}>
          <Container>
            <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-lg-5 w-100 fmxw-80 align-items-center justify-content-center">
              <div className="text-center text-md-center mb-4 mt-md-0 "></div>
              <center>
                <ImCheckmark color="green" size={80} /> <br />
                <h1 style={{ color: "green" }}>VERIFIED</h1>
                <br />
              </center>
              <>
                <span
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <b style={{ fontSize: "30px" }}>CERTIFICATE NO.: {""}</b>
                  <br />
                  {data && data[0]?.tcc_ref?.toUpperCase()}{" "}
                </span>
                <br />
              </>
              <>
                <span
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <b style={{ fontSize: "30px" }}>Tax Payer Name: {""}</b>
                  <br />
                  {data && data[0]?.tax_payer?.toUpperCase()}{" "}
                </span>
                <br />
              </>
              <>
                <span
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <b style={{ fontSize: "30px" }}>TYPE:{""}</b> <br />
                  {data && data[0]?.type?.toUpperCase()}{" "}
                </span>
                <br />
              </>
              <>
                <span
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <b style={{ fontSize: "30px" }}>DATE ISSUED:{""}</b>
                  <br />
                  {data && moment(data[0]?.date_issued).format("YYYY-MM-DD")}
                </span>
                <br />
              </>
            </div>
          </Container>
        </Col>
        {/* <Col md={3}></Col> */}
        {/* </Row> */}
      </div>
      ) : (
        <center className="d-flex align-items-center justify-content-center mt-5">
          <Alert color="info" className="bg-white">
            <b>
              <i>Record Not found</i>
            </b>
          </Alert>
        </center>
      )}
      {/* {JSON.stringify( { tax, num, type } )} */}
      <div className="altered-footer w-100">
        <div className="left1">
          <img src={kanoState} alt="Kano state logo"  className="altered-footer-logo" />
          <p>POWERED BY</p>
          <p>KANO STATE GOVERNMENT</p>
        </div>
        <div className="right2">
          <img src={brainstormLogo} alt="Brainstorm logo"  className="altered-footer-logo" />
          <p>DEVELOPED BY</p>
          <p>BRAINSTORM IT SOLUTIONS</p>
        </div>
      </div>
    </>
  );
}
