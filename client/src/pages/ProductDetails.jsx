import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../context/ProductContext';

const ProductDetails = () => {
    const { cod } = useParams();
    const { products } = useContext(ProductContext);
    // const { currency } = useContext();

    const [ productData, setProductData ] = useState();
    const [ image, setImage ] = useState();
    // const [ selectedPriceGroup, setSelectedPriceGroup ] = useState(null);

    const fetchProductData = async()=> {
        const product = products.find(item => item.cod === cod);
        if (product) {
            setProductData(product);
            setImage(product.image[0]);
            // Set the first price group as the default
            if (product.priceGroups && product.priceGroups.length > 0) {
                setSelectedPriceGroup(product.priceGroups[0])
            }
        }
    }

    useEffect(()=> {
        fetchProductData();
    }, [cod, products])


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* ------------ Product Data --------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* ---------------- Product Images ------------ */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
           <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
                productData.image.map((item, index)=> (
                    <img 
                        onClick={()=> setImage(item)}
                        src={item} alt="" key={index}
                        className='w-[24%] sm:w-full sm:mb-3 '
                    />
                ))
            }
           </div>
           <div className='w-full sm:w-[60%]'>
                <img
                    className='w-full h-auto' 
                    src={image} alt="" 
                />
           </div> 
        </div>
        {/* ---------------- Product Info ------------ */}
        
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

            <div className='flex items-center gap-0.5 mt-1'>
                <span className='mt-1 text-gray-600'>Código: </span>
                <p className='font-medium text-xl ml-2 mt-2'>{productData.cod}</p>
            </div>

            {/* -------------- New Price Group Selector  ------------ */}
            {/* {productData.priceGroups && productData.productData.length > 1 && (
                <div className='mt-6'>
                    <label>Selecione a Estrutura: </label>
                    <select 
                        id='price-group-selector'
                        value={selectedPriceGroup ? selectedPriceGroup.name : ''}
                        onChange={'handlePriceGroupChange'}
                        className='w-full p-2 mt-2 border rounded-md'
                    >
                        {productData.priceGroups.map(group => (
                            <option value={group.name} key={group.name}>{group.name}</option>
                        ))}
                    </select>
                </div>
            )} */}

            <div className='mt-4'>
                <p className='text-2xl font-medium'>
                    {'currency'} {}
                </p>
            </div>

            <p className='text-base font-medium mt-6'>About Product: </p>
                <ul className='list-disc ml-4 text-gray-600'>
                    {productData.description.map((desc, index)=> (
                        <li key={index}>{desc}</li>
                    ))}
                </ul>

            {/* -------------- Coverages Price Section ------------ */}
            {'selectedPriceGroup' && (
                <div>
                    <p className='mt-6 text-gray-600 md:w-4/5'>Revestimentos Assentos: </p>
                    <div className='flex items-center flex-wrap gap-3 w-full mt-4 cursor-pointer'>

                    </div>
                </div>
            )}
            
            <div className='flex items-center mt-10 gap-4 text-base'>
                <button className='w-full py-3.5 cursor-pointer font-medium bg-gray-300 '>
                    ADICIONAR AO PEDIDO
                </button>
            </div>

        </div>
      </div>
    </div>
  ) : <div className='opacity-0'></div>
} 

export default ProductDetails
