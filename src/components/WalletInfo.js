import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import bitcoin from '../customImage/bitcoin.svg';
import bnb from '../customImage/bnb.svg';
import cardano from '../customImage/cardano.svg';
import dogecoin from '../customImage/dogecoin.svg';
import ethereum from '../customImage/ethereum.svg';
import polkadot from '../customImage/polkadot.svg';
import polygon from '../customImage/polygon.svg';
import tether from '../customImage/tether.svg';
// import USDCoin from '../customImage/USDCoin.svg';
import xrp from '../customImage/xrp.svg';


import React from 'react';

export default function WalletInfo(props){
    // console.log(props.data)
    return(
        <div className={`hidden ${!props.isHidden ? "nohidden" : ""}`}>
            <div className="container white-wrapper mt-5 text-center">
                      <div className="row py-4">
                          <div className="row col-lg-3 mt-3 d-flex justify-content-between">
                            {
                            props.data.balanceNow.USDT ? 
                            <h3 className="text-dark col-lg-12 col-6 order-2 order-lg-1">{props.data.balanceNow.USDT} $</h3> 
                            : 
                            <h3 className="text-dark col-lg-12 col-6 order-2 order-lg-1">- $</h3>
                            }
                            <h6 className="text-primary col-lg-12 col-6 order-1 order-lg-2">суммарный остаток</h6>
                          </div>
                          <div className="row col-lg-3 mt-3 d-flex justify-content-between">
                            {
                                props.data.wholetime.income.USDT ? 
                                <h3 className="text-dark col-lg-12 col-6 order-2 order-lg-1">{props.data.wholetime.income.USDT} $</h3> 
                                : 
                                <h3 className="text-dark col-lg-12 col-6 order-2 order-lg-1">- $</h3>
                            }
                            <h6 className="text-primary col-lg-12 col-6 order-1 order-lg-2">оборот за всё время</h6>
                          </div>
                          <div className="row col-lg-3 mt-3 d-flex justify-content-between">
                            {
                                props.data.year.income.USDT ? 
                                <h3 className="text-dark col-lg-12 col-6 order-2 order-lg-1">{props.data.year.income.USDT} $</h3> 
                                : 
                                <h3 className="text-dark col-lg-12 col-6 order-2 order-lg-1">- $</h3>
                            }
                            <h6 className="text-primary col-lg-12 col-6 order-1 order-lg-2">среднегодовой оборот</h6>
                          </div>
                          <div className="row col-lg-3 mt-3 d-flex justify-content-between">
                              <h3 className="text-dark col-lg-12 col-6 order-2 order-lg-1">
                                {props.data.banned ? '100%' : '0%'}
                              </h3>
                              {/* <div className="speedometer-wrapper">
                                  датчик в %
                              </div> */}
                              <h6 className="text-primary col-lg-12 col-6 order-1 order-lg-2">степень риска контрагента</h6>
                          </div>
                      </div>
                  </div>
                  <div className="container white-wrapper text-dark mt-5">
                      <div className="container py-5 px-4">
                          <h5 className="text-dark mb-3">Информация по валютам кошелька</h5>
                          <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Валюта</th>
                                    <th scope="col">Суммарный остаток</th>
                                    <th scope="col">Оборот за месяц</th>
                                    <th scope="col">Среднегодовой оборот</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="table">
                                        <th scope="row"><img className="coin" src={ethereum} alt=""/>Ethereum</th>
                                        {props.data.balanceNow.ETH ? <td>{props.data.balanceNow.ETH}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.ETH ? <td>{props.data.wholetime.income.ETH}</td> : <td>no data</td>}
                                        {props.data.year.income.ETH ? <td>{props.data.year.income.ETH}</td> : <td>no data</td>}
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={tether} alt=""/>USDT</th>
                                        {props.data.balanceNow.USDT ? <td>{props.data.balanceNow.USDT}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.USDT ? <td>{props.data.wholetime.income.USDT}</td> : <td>no data</td>}
                                        {props.data.year.income.USDT ? <td>{props.data.year.income.USDT}</td> : <td>no data</td>}
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={bnb} alt=""/>BNB</th>
                                        {props.data.balanceNow.BNB ? <td>{props.data.balanceNow.BNB}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.BNB ? <td>{props.data.wholetime.income.BNB}</td> : <td>no data</td>}
                                        {props.data.year.income.BNB ? <td>{props.data.year.income.BNB}</td> : <td>no data</td>}
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={bitcoin} alt=""/>Bitcoin</th>
                                        {props.data.balanceNow.BTC ? <td>{props.data.balanceNow.BTC}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.BTC ? <td>{props.data.wholetime.income.BTC}</td> : <td>no data</td>}
                                        {props.data.year.income.BTC ? <td>{props.data.year.income.BTC}</td> : <td>no data</td>}
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={cardano} alt=""/>Cardano</th>
                                        {props.data.balanceNow.ADA ? <td>{props.data.balanceNow.ADA}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.ADA ? <td>{props.data.wholetime.income.ADA}</td> : <td>no data</td>}
                                        {props.data.year.income.ADA ? <td>{props.data.year.income.ADA}</td> : <td>no data</td>}
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={dogecoin} alt=""/>Dogecoin</th>
                                        {props.data.balanceNow.DOGE ? <td>{props.data.balanceNow.DOGE}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.DOGE ? <td>{props.data.wholetime.income.DOGE}</td> : <td>no data</td>}
                                        {props.data.year.income.DOGE ? <td>{props.data.year.income.DOGE}</td> : <td>no data</td>}
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={polkadot} alt=""/>Polkadot</th>
                                        {props.data.balanceNow.DOT ? <td>{props.data.balanceNow.DOT}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.DOT ? <td>{props.data.wholetime.income.DOT}</td> : <td>no data</td>}
                                        {props.data.year.income.DOT ? <td>{props.data.year.income.DOT}</td> : <td>no data</td>}
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={polygon} alt=""/>Polygon</th>
                                        {props.data.balanceNow.MATIC ? <td>{props.data.balanceNow.MATIC}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.MATIC ? <td>{props.data.wholetime.income.MATIC}</td> : <td>no data</td>}
                                        {props.data.year.income.MATIC ? <td>{props.data.year.income.MATIC}</td> : <td>no data</td>}
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={xrp} alt=""/>XRP</th>
                                        {props.data.balanceNow.XRP ? <td>{props.data.balanceNow.XRP}</td> : <td>no data</td>}
                                        {props.data.wholetime.income.XRP ? <td>{props.data.wholetime.income.XRP}</td> : <td>no data</td>}
                                        {props.data.year.income.XRP ? <td>{props.data.year.income.XRP}</td> : <td>no data</td>}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                      </div>
                  </div>
        </div>
    )
}