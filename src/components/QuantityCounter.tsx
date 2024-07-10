import React, {useState, useEffect} from "react";

export function QuantityCounter({weight, increment, unit, callback}) {
  if (callback === undefined) {
    callback = function(returnedVal) {
      return returnedVal;
    }
  }

  let firstWeight = parseFloat(weight).toFixed(2);
  const [productWeight, setProductWeight] = useState(firstWeight)
  const addWeight = function() {
    let addedWeight = parseFloat(productWeight) + +increment;
    setProductWeight(addedWeight.toFixed(2))
  }
  const removeWeight = function() {
    if (parseFloat(productWeight) > increment) {
      let removedWeight = parseFloat(productWeight) - +increment;
      setProductWeight(removedWeight.toFixed(2))
    }
  }

  useEffect(() => {
    callback(productWeight)
  }, [productWeight]);
  
  return <div className="quantity_wrapper">
    <input className="quantity_input" type="text" name="quantity of items" value={`${productWeight} ${unit}`} onChange={e=>setProductWeight(e.target.value)} data-value={productWeight} readOnly/>
    <button type="button" onClick={()=>addWeight()} className="quant_btn plus_btn transition" />
    <button type="button" onClick={()=>removeWeight()} className="quant_btn minus_btn transition" />
  </div>
}