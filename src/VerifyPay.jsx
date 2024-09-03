import React from 'react'
import { Badge, Card, CardBody } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

export function Lines(props) {
  return(
    <>
      <div className='border d-flex justify-content-between align-items-center mb-2 p-2'>
        <span className='fw-bold text-start left'>{props.left}</span>
        <span className='fw-bold text-end right'>{props.right}</span>
      </div>
    </>
  )
}
export function LinesBadge(props) {
  return(
    <>
      <div className='border d-flex justify-content-between align-items-center mb-2 p-2'>
        <span className='fw-bold text-start left'>{props.left}</span>
        <span className='rounded-pill bg-info px-2 text-white fw-bold right text-end'>{props.right}</span>
      </div>
    </>
  )
}

export default function VerifyPay() {
  return (
    <>
      <Card className='verify-pay-card'>
        <CardBody className='p-0'>
          <div className='card-heading'>
            <h1 className='text-center mb-3 text-capitalize'>VERIFY PAY NOW</h1>
            <small className='bg-secondary text-white text-center p-1 text-capitalize'>ONLINE TREASURY RECEIPT</small>
          </div>
          <div className='d-flex flex-column'>
            <Lines left={"Ref No.:"} right={"333345654345678"}/>
            <Lines left={"Paid By:"} right={"Issa Mustapha"}/>
            <Lines left={"KNID/Tax ID:"} right={"717"}/>
            <Lines left={" "} right={" "}/>
            <Lines left={"Revenue Head:"} right={"Re-certification fees"}/>
            <LinesBadge left={"Status:"} right={"saved"}/>
            <Lines left={"Payment Validation:"} right={""}/>
            <Lines left={"Amount:"} right={"#100"}/>
            <Lines left={"Amount in Words:"} right={"ONE HUNDRED NAIRA only"}/>
            <Lines left={"MDA:"} right={"Ministry of Land and Physical Planning"}/>
            <Lines left={"Payment Period:"} right={"1 May, 2024 - 29 May, 2024"}/>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
