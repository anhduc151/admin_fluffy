import Sidebar from '../../components/SideBar/Sidebar';
import Navbar from '../../components/Navbar';
import '../Payment/payment.css'
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table, message, Divider } from 'antd';
import { gql } from '@apollo/client';
import client from "../../configGQL/index"
import dayjs from "dayjs";
import copy from "copy-to-clipboard";


const PAYMENT = gql`
  query getPaymentTransactions($query: QueryFilterDto!){
    getPaymentTransactions(query: $query){
      items{
        id
        createdAt
        tutor{
          lastName
          firstName
        }
        stripePaymentId
        amount
        last4Number
        bookedSession{
          price
          data
          course{
            name
          }
        }
      }
    }
  }
`

function Payment() {
  const [paymentList, setPaymentList] = useState([])
  const [dataMore, setDataMore] = useState()
  // console.log("🚀 ~ file: index.js:46 ~ Payment ~ dataMore:", dataMore)
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = () => {
    const code = "pi_3Mvek7IHWASmV6k..."; // replace with your bill code
    copy(code);
    setIsCopied(true);
    message.success("Code has been copied to clipboard!");
  };

  const dateFormatList = ["DD/MM/YYYY"];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewMoreClick = (record) => {
    setDataMore(record)
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const dataSource = paymentList.map(data => ({
    purchasedate: dayjs(data.createdAt).format("HH:mm, DD/MM/YYYY"),
    total: data.amount + "$",
    tutor: data.tutor?.firstName + ' ' + data.tutor?.lastName,
    courseName: data.bookedSession?.course?.name,
    paymentid: data.id,
    data: data
  }))

  useEffect(() => {
    client
      .query({
        query: PAYMENT,
        variables: {
          query: {
            limit: 99,
            page: 1,
          }
        }
      })
      .then(result => setPaymentList(result.data.getPaymentTransactions.items))
  }, []);

  const columns = [
    {
      title: "Purchase date",
      dataIndex: "purchasedate",
      key: "purchasedate",
    },
    {
      title: "Tutor",
      dataIndex: "tutor",
      key: "tutor",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (text) => {
        const truncatedText = `${text?.substring(0, 30)}...`;
        return <span>{truncatedText}</span>;
      },
    },
    {
      title: "Payment ID",
      dataIndex: "paymentid",
      key: "paymentid",
      render: (text) => {
        const truncatedText = `${text?.substring(0, 20)}...`;
        return <span>{truncatedText}</span>;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Details",
      key: "Details",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleViewMoreClick(record.data)}
          className="view__payment"
        >
          View more
        </Button>
      ),
    },
  ];


  return (
    <div className="AppGlass">
      <Navbar />
      <div className='App_container'>
        <Sidebar />
        <div className='App_content'>
          <h1>Payment</h1>
          <div className='payment_table'>
            <Table dataSource={dataSource} columns={columns} />
            {dataMore &&
              <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                closable={false}
                className="payment__modal"
                footer={
                  <Button onClick={handleCancel}>Cancel</Button>
                }
              >
                <Form name="view-more-form">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 24,
                      }}
                    >
                      <div
                        style={{ flex: 1, marginRight: 24 }}
                        className="payment__bill1"
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 16,
                          }}
                          className="bill__copy"
                        >
                          <div className="bill__ma">
                            <div className="bill__codema">
                              {dataMore?.stripePaymentId?.substring(0, 20) + "..."}
                            </div>
                            <div className="bill__atm">
                              Visa **** **** **** {dataMore?.last4Number}
                            </div>
                          </div>
                          <Button onClick={handleCopyClick}>
                            <i class="bx bx-copy"></i>
                            {isCopied ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                        <div
                          style={{ marginBottom: 16 }}
                          className="payment__flex"
                        >
                          <div className="flex1">
                            <p className="payment__purchase">Purchase date: </p>
                            <p className="payment__2023">
                              {dayjs(dataMore?.createdAt).format("HH:mm, DD/MM/YYYY")}
                            </p>
                          </div>
                          <div className="flex2">
                            <p className="payment__subtotal">Total: </p>
                            <p>{dataMore?.bookedSession?.price}</p>
                          </div>
                          <div className="flex4">
                            <p className="payment__fee">Fee: </p>
                            <p>{100 - (dataMore?.amount / dataMore?.bookedSession?.price) * 100 + "%"}</p>
                          </div>
                          <div className="flex3">
                            <p className="payment__total">Transfer: </p>
                            <p>{dataMore?.amount}</p>
                          </div>
                          <div className="flex3">
                            <p className="payment__total">Received: </p>
                            <p>{dataMore?.bookedSession?.price - dataMore?.amount}</p>
                          </div>
                          <div className="flex5">
                            <p className="payment__currency">Currency: </p>
                            <p>USD</p>
                          </div>
                        </div>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: 16 }}>
                          <h2 className="payment__tutoring">
                            Tutoring session
                          </h2>
                        </div>
                        <div>
                          <Form className="payment__right">
                            <div className="payment__li1">
                              <h4 className="payment__sub">
                                <i className="bx bxs-book-bookmark"></i>Subject:
                              </h4>
                              <p>{dataMore?.bookedSession?.course?.name.substring(0, 40) + "..."}</p>
                            </div>

                            <div className="payment__ttli1">
                              <div className="payment__li2">
                                <h4 className="payment__tutors">
                                  <i class="bx bxs-id-card"></i>Tutor:
                                </h4>
                                <p>{dataMore?.tutor?.firstName + " " + dataMore?.tutor?.lastName}</p>
                              </div>
                              <div className="payment__li3">
                                <h4 className="payment__prices">
                                  <i class="bx bxs-coin"></i>Price:
                                </h4>
                                <p>{dataMore?.bookedSession?.price + "$"}</p>
                              </div>
                            </div>

                            <div className="payment__ttli2">
                              <div className="payment__li4">
                                <h4 className="payment__sessiondates">
                                  <i className='bx bx-calendar-event' ></i>Session date:
                                </h4>
                                <p>{dayjs(dataMore?.bookedSession?.data?.startDate).format("DD/MM/YYYY")} - {dayjs(dataMore?.bookedSession?.data?.endDate).format("DD/MM/YYYY")}</p>
                              </div>
                            </div>

                            <div className="payment__li6">
                              <h4 className="payment__times">
                                <i class="bx bx-hourglass"></i>Session time:
                              </h4>
                              <p>{dayjs(dataMore?.bookedSession?.data?.startDate).format("HH:mm")} - {dayjs(dataMore?.bookedSession?.data?.endDate).format("HH:mm")}</p>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <Divider />
                  </div>
                </Form>
              </Modal>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;