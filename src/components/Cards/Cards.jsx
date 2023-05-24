import React, { useEffect } from "react";
import "./Cards.css";
import { UilUsdSquare, UilMoneyWithdrawal, UilClipboardAlt } from "@iconscout/react-unicons";
import client from "../../configGQL/index"
import Card from "../Card/Card";
import { gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setError } from "../../Redux/feat/notificationSlice"
import { useState } from "react";


const Cards = () => {
  const dispatch = useDispatch()
  const [income, setIncome] = useState()
  const [transfer, setTranfer] = useState()
  const [total, setTotal] = useState()


  const valueCard = (array) => {
    var total = array?.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    return total;
  }



  useEffect(() => {
    client
      .query({
        query: gql`
        query getBalanceInCurrentYear{
          getBalanceInCurrentYear{
            income
            transfer
          }
        }
      `
      }).then(result => {
        setTranfer(result.data.getBalanceInCurrentYear.transfer)
        setIncome(result.data.getBalanceInCurrentYear.income)
      })
      .catch(error => dispatch(setError({ message: error })))


    client
      .query({
        query: gql`
        query getBalances{
          getBalances{
            amount
            currency
          }
        }
      `
      }).then(result => {
        setTotal(result.data.getBalances)
      })
      .catch(error => dispatch(setError({ message: error })))
  }, []);




  const cardsData = [
    {
      title: "InCome",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      value: valueCard(income),
      png: UilUsdSquare,
      series: [
        {
          name: "InCome",
          data: income,
        },
      ],
    },
    {
      title: "Tranfer",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      value: valueCard(transfer),
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Tranfer",
          data: transfer,
        },
      ],
    }, 
    {
      title: "Total",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      value: total?.amount,
      png: UilClipboardAlt,
      series: [
        {
          name: "Total",
          data: [0, 0, 0, 0, parseInt(total?.amount), 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    },
  ];


  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
