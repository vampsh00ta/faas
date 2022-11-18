import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import searchlogo from './customImage/search.png';

import Header from './components/header';
import Footer from './components/footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import WalletInfo from './components/WalletInfo';

import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const DOMEN_SERVER = 'http://localhost:8000/api/getWalletInfo?format=json&wallet='

const testwallet = '0xce479Ff6fDdC5E162861375E0A230357c101F22e'

// axios.defaults.withCredentials = true;




function App() {
  const [walletNumber, setWalletNumber] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isHidden, setHidden] = useState(true)
  const [walletData, setWalletData] = useState('')
  const [errMsg, setErrMsg] = useState('')

  


  // console.log(walletData)

  const postWallet = event => {
    // setWalletData({"balanceNow":{"ETH":0.8587361588383972,"SOS":11661119.583700001,"NAO":17234242.15},"banned":false,"month":{},"year":{"income":{"ETH":17.6664941994941,"NAO":17234242.15,"SOS":11661119.5837},"outcome":{"ETH":22.244595496889755}},"wholetime":{"income":{"ETH":17.6664941994941,"NAO":17234242.15,"SOS":11661119.5837},"outcome":{"ETH":22.244595496889755}}});
    // console.log(walletData)
    setHidden(false);
    setLoading(true);
    event.preventDefault();
    // console.log(walletNumber)
    setTimeout(() => {
      axios.get(DOMEN_SERVER+walletNumber) // +testwallet
      .then(res => {
        // console.log(res);
        setWalletData(res);
        setLoading(false);
      })
      .catch(err => {
        // console.log(err);
        setLoading(false);
        setErrMsg('Кошелек не найден')
      })
    }, 2000)
  }

  return (
    <div>
      <Header />
      {/* <!-- Отчёт --> */}
      <div className="hero-area white">
        <div className="area-bg"></div>
          <div className="padding-100-50">
              <div className="container grey-wrapper p-lg-5">
                  <div className="container white-wrapper">
                    <div className="row align-items-center justify-content-center p-lg-5">
                      <div className="col-lg-8 pt-3">
                        <form className="input-group input-group-lg mb-3" onSubmit={postWallet}>
                          <input value={walletNumber} onChange={(event) => {setWalletNumber(event.target.value)}} type="text" className="form-control" placeholder="Введите номер кошелька" aria-label="Введите номер кошелька" aria-describedby="button-addon2"/>
                          <button className="btn btn-outline-primary" type="submit" id="button-addon2">Search</button>
                        </form>
                      </div>
                        <div className="col-lg-1 d-none d-lg-block">
                          <img className="magnifier-icon" src={searchlogo} alt=""/>
                        </div>
                    </div>
                  </div>
                    {isLoading ? <LoadingSpinner /> : errMsg ? <h4 className='text-dark mt-3 text-center'>{errMsg}</h4> : walletData ? <WalletInfo isHidden={isHidden} data={walletData}/> : <div/>}

              </div>
          </div>
      </div>
      {/* <!-- /Отчёт --> */}
      <Footer />
    </div>

    
  );
}

export default App;
