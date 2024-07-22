import React, {useState, useEffect} from "react";

interface IQuantityCounter {
  weight: number;
  increment: number;
  unit: string;
  callback?: (returnedVal: number) => void;
}

export const QuantityCounter: React.FC<IQuantityCounter> = (
  {
    weight,
    increment,
    unit,
    callback = (returnedVal: number) => {
    },
  }) => {
  const [productWeight, setProductWeight] = useState<number>(Number(weight.toFixed(2)));
  
  const addWeight = () => {
    setProductWeight(prevWeight => Number((prevWeight + increment).toFixed(2)));
  };
  
  const removeWeight = () => {
    setProductWeight(prevWeight =>
      prevWeight > increment ? Number((prevWeight - increment).toFixed(2)) : prevWeight
    );
  };
  
  useEffect(() => {
    setProductWeight(Number(weight.toFixed(2)));
  }, [weight]);
  
  useEffect(() => {
    callback(productWeight);
  }, [productWeight, callback]);
  
  return (
    <div className="quantity_wrapper">
      <input
        className="quantity_input"
        type="text"
        name="quantity of items"
        value={`${productWeight} ${unit}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProductWeight(Number(e.target.value))}
        data-value={productWeight}
        readOnly
      />
      <button type="button" onClick={addWeight} className="quant_btn plus_btn transition"/>
      <button type="button" onClick={removeWeight} className="quant_btn minus_btn transition"/>
    </div>
  );
};
