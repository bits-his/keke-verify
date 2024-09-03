import { useEffect, useState } from "react";
import "./App.css";
import { Alert, Col, Container } from "reactstrap";
import { ImCheckmark } from "react-icons/im";
import { useParams } from "react-router-dom";
import moment from "moment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function App() {
  const { id, type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://galaxybis.ebudgetkano.ng/financial-mgt-backend/verify-mda?id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", authorization: "" },
      }
    )
      .then((raw) => raw.json())
      .then((response) => {
        setLoading(false);
        if (response.success) {
          setData(response.results[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, type]);
  return loading ? (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <p>
        <Skeleton count={10} height={50} />
      </p>
    </SkeletonTheme>
  ) : (
    <>
      {data.length ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Col md={3}></Col>
          <Col md={6} className="mt-5">
            {/* {JSON.stringify(data)} */}
            <Container className="mt-5">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border mt-5 rounded border-light p-4 p-lg-5 w-100 fmxw-80 align-items-center justify-content-center mt-5">
                <div className="text-center text-md-center mb-4 mt-md-0 "></div>
                <center>
                  <ImCheckmark color="green" size={80} /> <br />
                  <h1 style={{ color: "green" }}>VERIFIED</h1>
                  <br />
                </center>
                {data && data[0]?.type === "Books" ? (
                  <>
                    <span
                      style={{
                        fontSize: "30px",
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      <b style={{ fontSize: "30px" }}>
                        ORG/INDIVIDUAL NAME: {""}
                      </b>
                      {data && data[0]?.mda_name?.toUpperCase()}{" "}
                    </span>
                    <br />
                  </>
                ) : (
                  <>
                    {" "}
                    <span
                      style={{
                        fontSize: "30px",
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      <b style={{ fontSize: "30px" }}>MDA/LGA Name: {""}</b>
                      {data && data[0]?.mda_name?.toUpperCase()}{" "}
                    </span>
                    <br />
                    <span style={{ fontSize: "30px" }}>
                      <b style={{ fontSize: "30px" }}>MDA/LGA CODE: {""}</b>
                      {data && data[0]?.mda_code}
                    </span>
                  </>
                )}

                <br />
                <span style={{ fontSize: "30px" }}>
                  <b style={{ fontSize: "30px" }}>DATE: {""}</b>
                  {moment(data && data[0]?.created_at).format("D  MMMM, YYYY")}
                </span>
                <br />
                <span style={{ fontSize: "30px" }}>
                  <b style={{ fontSize: "30px" }}>
                    {data && data[0]?.type === "Books"
                      ? "BOOK CODE"
                      : "RECIEPT TYPE"}
                    :{""}
                  </b>
                  {data && data[0]?.type === "Books" ? (
                    <span>{`GP.KAN0 ${data && data[0]?.code}/${
                      data && data[0]?.date
                    }/${data && data[0]?.quantity}-C`}</span>
                  ) : (
                    type
                  )}
                </span>
                <br />
                {/* <span style={{ fontSize: "30px" }}>
                  <b style={{ fontSize: "30px" }}>Number Of Views: {""}</b>
                  {data && data[0]?.num_view}
                </span> */}
              </div>
            </Container>
          </Col>
          <Col md={3}></Col>
          {/* </Row> */}
        </div>
      ) : (
        <center className="d-flex align-items-center justify-content-center mt-5">
          <Alert color="info" className="bg-info">
            <b>
              <i>Record Not found</i>
            </b>
          </Alert>
        </center>
      )}
    </>
  );
}

export default App;
