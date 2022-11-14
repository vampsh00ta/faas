import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import bitcoin from '../customImage/bitcoin.svg';
// import bnb from '../customImage/bnb.svg';
// import cardano from '../customImage/cardano.svg';
// import dogecoin from '../customImage/dogecoin.svg';
import ethereum from '../customImage/ethereum.svg';
// import polkadot from '../customImage/polkadot.svg';
// import polygon from '../customImage/polygon.svg';
import tether from '../customImage/tether.svg';
// import USDCoin from '../customImage/USDCoin.svg';
// import xrp from '../customImage/xrp.svg';


import React from 'react';

export default function WalletInfo(props){
    console.log(props.data[0])
    return(
        <div className={`hidden ${!props.isHidden ? "nohidden" : ""}`}>
            <div className="container white-wrapper mt-5 text-center">
                      <div className="row py-4">
                          <div className="col-lg-3 mt-3 d-flex flex-column justify-content-between">
                              <h3 className="text-dark">{props.data[0].balanceNow.USDT}$</h3>
                              <h5 className="text-primary">суммарный остаток</h5>
                          </div>
                          <div className="col-lg-3 mt-3 d-flex flex-column justify-content-between">
                              <h3 className="text-dark">{props.data[0].wholetime.income.USDT} $</h3>
                              <h5 className="text-primary">оборот за всё время</h5>
                          </div>
                          <div className="col-lg-3 mt-3 d-flex flex-column justify-content-between">
                              <h3 className="text-dark">{props.data[0].year.income.USDT} $</h3>
                              <h5 className="text-primary">среднегодовой оборот</h5>
                          </div>
                          <div className="col-lg-3 mt-3 d-flex flex-column justify-content-between">
                              <h3 className="text-dark">
                                {props.data[0].banned ? '100%' : '0%'}
                              </h3>
                              <div className="speedometer-wrapper">
                                  {/* датчик в % */}
                              </div>
                              <h5 className="text-primary">степень риска контрагента</h5>
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
                                        <td>{props.data[0].balanceNow.ETH}</td>
                                        <td>{props.data[0].wholetime.income.ETH}</td>
                                        <td>{props.data[0].year.income.ETH}</td>
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={tether} alt=""/>USDT</th>
                                        <td>{props.data[0].balanceNow.USDT}</td>
                                        <td>{props.data[0].wholetime.income.USDT}</td>
                                        <td>{props.data[0].year.income.USDT}</td>
                                    </tr>
                                    {/* <tr className="table">
                                        <th scope="row"><img className="coin" src={bnb} alt=""/>BNB</th>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={bitcoin} alt=""/>Bitcoin</th>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={cardano} alt=""/>Cardano</th>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={dogecoin} alt=""/>Dogecoin</th>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={polkadot} alt=""/>Polkadot</th>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={polygon} alt=""/>Polygon</th>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                    </tr>
                                    <tr className="table">
                                        <th scope="row"><img className="coin" src={xrp} alt=""/>XRP</th>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                        <td>322,222$</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                      </div>
                  </div>
        </div>
    )
}