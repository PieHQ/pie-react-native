import React from 'react'

export default ({ onSubmit, sentData, transactionData }) => (
  <div className="row">
    <div className="col-xs-12">
      <form onSubmit={onSubmit}>
        <input type="hidden" name="transactionId" value={transactionData.id} required="required" />
        <input type="hidden" name="publicKey" value={sentData.publicKey} required="required" />
        <div className="col-xs-12">
          <p className="lead text-center">Please enter the OTP sent to you</p>
        </div>
        <div className="col-xs-12">
          <input placeholder="OTP" className="text-center" type="text" name="authValue" autoComplete="off" />
        </div>
        <div className="col-xs-12">
          <button
            type="submit"
            className="btn btn--primary type--uppercase">Confirm payment of {sentData.currencySign}{sentData.amount}</button>
        </div>
      </form>
    </div>
  </div>
)
