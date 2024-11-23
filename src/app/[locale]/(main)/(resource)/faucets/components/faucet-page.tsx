
import FAQS from './faqs'
import FaucetHeader from './faucet-header'
import FaucetTabs from './faucet-tabs'

const FaucetPage = () => {
  return (
    <div>
      <div className="px-6 sm:container">
        <FaucetHeader />
        <FaucetTabs />
        <FAQS />
      </div>
    </div>
  )
}

export default FaucetPage
