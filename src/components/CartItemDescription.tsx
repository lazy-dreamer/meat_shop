import React, {useEffect, useState} from "react";
import {ProductService} from "../services/product.service";
import {ICartItemFeatures} from "../redux/cartSlice";

interface IItemFeatures {
  features: ICartItemFeatures;
}

interface IFeatureDescriptor {
  sliceType: string;
  sliceThickness: string;
  comment: string;
}

export const CartItemDescription: React.FC<IItemFeatures> = ({features}) => {
  const [fieldsDescriptor, setFieldsDescriptor] = useState<IFeatureDescriptor | null>(null);
  
  useEffect(() => {
    const fetchDescriptors = async () => {
      const data: IFeatureDescriptor = await ProductService.getDescriptors();
      setFieldsDescriptor(data);
    };
    fetchDescriptors();
  }, []);
  
  return (
    <>
      {fieldsDescriptor &&
      Object.keys(features).map((key, index) => {
        const featureValue = features[key as keyof ICartItemFeatures];
        if (typeof featureValue === 'string' && featureValue.length > 0) {
          return <p key={index}>{`${fieldsDescriptor[key as keyof IFeatureDescriptor]}: ${featureValue}`}</p>;
        }
        return null;
      })}
    </>
  );
};
