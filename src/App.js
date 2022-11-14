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

const DOMEN_SERVER = 'http://37.144.244.116:8000/api/getWalletInfo?wallet=';
const testwallet = '0xce479Ff6fDdC5E162861375E0A230357c101F22e'





function App() {
  const [walletNumber, setWalletNumber] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isHidden, setHidden] = useState(true)
  // const [walletData, setWalletData] = useState([])

  const walletData = [
    {   "balanceNow":{
      "ETH":0.000159846271935,
      "A":11.1,
      "MANA":5.723914651186343,
      "USDT":500.0,
      "BNT":3.095369e-12
   },
   "banned":false,
   "month":{
      
   },
   "year":{
      "income":{
         "ETH":30.04900925181983,
         "USDT":2457.542963,
         "DTRC":161207.09241903663,
         "STM":8170.000000000004,
         "DTX":1825.0,
         "WETH":0.840889592477488,
         "FTM":2000.0,
         "RCN":1000.0,
         "STORM":10000.0,
         "LGO":5e-08,
         "ENG":1e-08,
         "OMG":10.0,
         "ETR":100.0,
         "аNTOK":1.0,
         "CNN":6411421.37035957,
         "CS":7.1137769226e-08,
         "UFR":28575.35972831,
         "betbeb.com":88888.0,
         "CAT":1008575.9884067404,
         "A":11.1,
         "AZ":8888.0,
         "FC24":10000.0,
         "ATL":3045.711419,
         "DTC":26109.7175809,
         "SNM":2126.9436793,
         "tripus.io":5e-13,
         "UBEX":34000.0,
         "blockwell.ai KYC Casper Token":100.0,
         "LPT":2.307387250125189,
         "BIT":20000.0,
         "VIN":7.77,
         "LUCD | play2live.io":777.0
      },
      "outcome":{
         "ETH":26.088481266135478,
         "DTX":1825.0,
         "BNT":284.36265696091294,
         "USDT":880.0,
         "CNN":6411421.37035957,
         "CS":7.1137769226e-08,
         "CRV":1.0,
         "NOTICE":1e-18,
         "STM":2730.0,
         "CAT":1008575.9884067404,
         "ETR":10.0,
         "AZ":8888.0,
         "FTM":2000.0,
         "SNM":2126.9436793,
         "LGO":5e-08,
         "LPT":2.307387250125189,
         "ATL":3045.711419,
         "UBEX":34000.0,
         "DTC":26109.7175809,
         "BIT":20000.0,
         "PNS":8.008135e-12
      }
   },
   "wholetime":{
      "income":{
         "ETH":30.04900925181983,
         "USDT":2457.542963,
         "DTRC":161207.09241903663,
         "STM":8170.000000000004,
         "DTX":1825.0,
         "WETH":0.840889592477488,
         "FTM":2000.0,
         "RCN":1000.0,
         "STORM":10000.0,
         "LGO":5e-08,
         "ENG":1e-08,
         "OMG":10.0,
         "ETR":100.0,
         "аNTOK":1.0,
         "CNN":6411421.37035957,
         "CS":7.1137769226e-08,
         "UFR":28575.35972831,
         "betbeb.com":88888.0,
         "CAT":1008575.9884067404,
         "A":11.1,
         "AZ":8888.0,
         "FC24":10000.0,
         "ATL":3045.711419,
         "DTC":26109.7175809,
         "SNM":2126.9436793,
         "tripus.io":5e-13,
         "UBEX":34000.0,
         "blockwell.ai KYC Casper Token":100.0,
         "LPT":2.307387250125189,
         "BIT":20000.0,
         "VIN":7.77,
         "LUCD | play2live.io":777.0
      },
      "outcome":{
         "ETH":26.088481266135478,
         "DTX":1825.0,
         "BNT":284.36265696091294,
         "USDT":880.0,
         "CNN":6411421.37035957,
         "CS":7.1137769226e-08,
         "CRV":1.0,
         "NOTICE":1e-18,
         "STM":2730.0,
         "CAT":1008575.9884067404,
         "ETR":10.0,
         "AZ":8888.0,
         "FTM":2000.0,
         "SNM":2126.9436793,
         "LGO":5e-08,
         "LPT":2.307387250125189,
         "ATL":3045.711419,
         "UBEX":34000.0,
         "DTC":26109.7175809,
         "BIT":20000.0,
         "PNS":8.008135e-12
      }
   }
}
  ]
  console.log(walletData)

  const postWallet = event => {
    setHidden(false);
    setLoading(true);
    event.preventDefault();
    console.log(walletNumber)
    setTimeout(() => {
      axios.get(DOMEN_SERVER+testwallet) // +walletNumber
      .then(res => {
        console.log(res);
        // setWalletData(res);
        setLoading(false);
      })
      .catch(err => {console.log(err);setLoading(false);})
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
                    {isLoading ? <LoadingSpinner /> : <WalletInfo isHidden={isHidden} data={walletData}/>}
              </div>
          </div>
      </div>
      {/* <!-- /Отчёт --> */}
      <Footer />
    </div>

    
  );
}

export default App;
