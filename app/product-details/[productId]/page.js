'use client'
import BreadCrumb from '@/app/_components/BreadCrumb'
import ProductApis from '@/app/_utils/ProductApis'
import React, { useEffect, useState } from 'react'
import ProductInfo from '../_components/ProductInfo'
import ProductBanner from '../_components/ProductBanner'
import ProductList from '@/app/_components/ProductList'
import { usePathname } from "next/navigation";

const ProductDetails = ({params}) => {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProductById_()
  }, [params?.productId])
  const getProductById_= () => {
    ProductApis.getProductById(params?.productId).then( (res) => {
      console.log("product item", res.data.data)
      setProductDetails(res.data.data)
      getProductListByCategory(res.data.data);
    })
  }
  const getProductListByCategory = (product) => {
    ProductApis.getProductsByCategory(product?.attributes.category).then(
      (res) => {
        console.log(res?.data?.data);
        setProductList(res?.data?.data);
      }
    );
  };
  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} />
      <div className="grid justify-around grid-cols-1 gap-5 mt-10 sm:gap-0 sm:grid-cols-2">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  )
}

export default ProductDetails