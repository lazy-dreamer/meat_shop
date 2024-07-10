import React, {useEffect, useState} from "react";
import {ProductService} from "../services/product.service";

export function CartItemDescription({features}) {
  const [fieldsDescriptor, setFieldsDescriptor] = useState('')
  useEffect(() => {
    const fetchDescriptors = async () => {
      const data = await ProductService.getDescriptors()
      setFieldsDescriptor(data)
    }
    fetchDescriptors()
  }, []);
  return(
    Object.keys(features).map(function(key, index) {
      if (features[key].length>0){
        return <p key={index}>{`${fieldsDescriptor[key]}: ${features[key]}`}</p>
      }
    })
  )
}