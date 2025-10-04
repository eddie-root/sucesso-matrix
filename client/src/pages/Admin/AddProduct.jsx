import React, { useContext, useState } from 'react'
import GlobalContext from '../../context/GlobalContext'

const AddProduct = () => {
  const { navigate, axios } = useContext(GlobalContext);
  const [ loading, setLoading ] = useState(false);
  const [ formData, setFormData ] = useState({
    cod: '',
    name: '',
    category: '',
    tecidos: [],
    priceGroups: [{ name: '', prices: {} }], // <-- Changed state
    image: [],
    description: [''],
    isNewProduct: false,

  });

  // List of available coverages
  const coverages = [
    'B','C','D','E','F','G','I','L'
  ];



  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-medium '>Adicionar Novo Produto</h1>
          <button
            onClick={()=> navigate('/admin/product-list')}
            className='text-gray-500 hover:text-gray-700'
          >
            Voltar
          </button>
        </div>

        <form className='space-y-6' >
          {/* Dados Básicos (No changes here)  */}
          <div className='bg-white p-6 rounded-lg shadow-sm border '>
            <h2 className='text-lg font-semibold mb-4'>Dados Básicos</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1' >Código *</label>
                <input 
                  type="text"
                  name='cod'
                  value={'formData.cod'}
                  onChange={''}
                  required
                  className='w-full px-3 py-2 border rounded-md'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1' >Nome *</label>
                <input 
                  type="text"
                  name='name'
                  value={'formData.name'}
                  onChange={''}
                  required
                  className='w-full px-3 py-2 border rounded-md'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1' >Categoria *</label>
                <input 
                  type="text"
                  name='category'
                  value={'formData.category'}
                  onChange={''}
                  required
                  className='w-full px-3 py-2 border rounded-md'
                />
              </div>
              <div className='flex items-center gap-2'>
                <input 
                  type="checkbox"
                  name='isNewProduct'
                  value={'formData.isNewProduct'}
                  onChange={''}
                  className='rounded'
                />
                <label className='block text-sm font-medium text-gray-700 mb-1' >Novo Lançamento</label>
              </div>


            </div>
          </div>

          {/* --- New Price Groups Section --- */}
          <div className='bg-white p-6 rounded-lg shadow-sm border'>
            <h2 className='text-lg font-semibold mb-4'>Preços e Revestimentos</h2>
            <div className='space-y-6'>
              {formData.priceGroups.map((group, index)=> (
                <div key={index} className='p-4 border rounded-md space-y-4 relative'>
                  {/* {formData.priceGroups.length > 1 && ( 
                    <button 
                      type='button'
                      onClick={()=> 'removePriceGroup'(index)}
                      className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                    >
                      Remover Grupo
                    </button>
                  )} */}
                  {/* <div>
                    <label className=''>
                      Nome do Grupo de Preços (ex: Estrutura Preta)
                    </label>
                    <input 
                      type="text"
                      value={group.name}
                      onChange={()=> 'handlePriceGroupChange'(index, e.target.value)}
                      placeholder='Nome do Grupo'
                      className='w-full px-3 py-2 border rounded-md'
                      required 
                    />
                  </div> */}
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {coverages.map((coverage)=> (
                      <div key={coverage}>
                        <label className='block text-sm font-medium text-gray-700 mb-1' >
                          Preço {coverage}
                        </label>
                        <input 
                          type="number"
                          step='0.01'
                          value={group.prices[coverage] || ''}
                          onChange={(e)=> 'handlePriceChange'(index, coverage, e.target.value)}
                          placeholder='0.00'
                          className='w-full px-3 py-2 border rounded-md' 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>

         {/* Descrição (No changes here) */}
         <div className='bg-white p-6 rounded-lg shadow-sm border'>
              <h2 className='text-lg font-semibold mb-4 '>Descrição</h2>
              <div className='space-y-4 '>
                {formData.description.map((desc, index)=> (
                  <div key={index} className='flex gap-2'>
                    <input 
                      type="text"
                      value={desc}
                      onChange={(e)=> 'handleDescriptionChange'(index, e.target.value)}
                      className='flex-1 px-3 py-2 border rounded-md'
                      placeholder='Adicione uma descrição' 
                    />
                    {index > 0 && (
                      <button
                        type='button'
                        onClick={()=> 'removeDescriptionField'(index)}
                        className='px-3 py-2 text-red-500 hover:text-red-700'
                      >
                        Remover
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type='button'
                  onClick={'addDescriptionField'}
                  className='text-primary hover:text-primary/80'
                >
                   + Adicionar descrição
                </button>
              </div>
         </div>

        {/* Imagens (No changes here) */}
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
           <h2>Imagens</h2>
           <div>
            
           </div>
        </div>       

        </form>
      </div>
    </div>
  )
}

export default AddProduct
