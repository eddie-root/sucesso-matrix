import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { categories } from '../../assets/assets';
import GlobalContext from '../../context/GlobalContext';

const AddProduct = () => {
    const { navigate, axios } = useContext(GlobalContext);
    const [formData, setFormData] = useState({
        cod: '',
        name: '',
        category: '',
        isNewProduct: false,
        tecidos: [],
        priceCents: {},
        image: [],
        description: [''],
    });

    const [selectedTecidos, setSelectedTecidos] = useState([]);
    const [tecidosPrices, setTecidosPrices] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTecidoChange = (e) => {
        const tecido = e.target.value;
        if (e.target.checked) {
            setSelectedTecidos(prev => [...prev, tecido]);
            setTecidosPrices(prev => ({ ...prev, [tecido]: 0 }));
        } else {
            setSelectedTecidos(prev => prev.filter(t => t !== tecido));
            setTecidosPrices(prev => {
                const newPrices = { ...prev };
                delete newPrices[tecido];
                return newPrices;
            });
        }
    };

    const handlePriceChange = (tecido, value) => {
        setTecidosPrices(prev => ({
            ...prev,
            [tecido]: Number(value)
        }));
    };

    const handleDescriptionChange = (index, value) => {
        const newDescription = [...formData.description];
        newDescription[index] = value;
        setFormData(prev => ({
            ...prev,
            description: newDescription
        }));
    };

    const addDescriptionField = () => {
        setFormData(prev => ({
            ...prev,
            description: [...prev.description, '']
        }));
    };

    const removeDescriptionField = (index) => {
        setFormData(prev => ({
            ...prev,
            description: prev.description.filter((_, i) => i !== index)
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            image: [...prev.image, ...newImages]
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index)
        }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            // Validate required fields
            if (!formData.cod || !formData.name || !formData.category || selectedTecidos.length === 0) {
                toast.error('Por favor, preencha todos os campos obrigatórios');
                setLoading(false);
                return;
            }

            // Validate if any tecido has no price
            const tecidosWithoutPrice = selectedTecidos.filter(tecido => !tecidosPrices[tecido] && tecidosPrices[tecido] !== 0);
            if (tecidosWithoutPrice.length > 0) {
                toast.error(`Por favor, defina o preço para os tecidos: ${tecidosWithoutPrice.join(', ')}`);
                setLoading(false);
                return;
            }

            // Create FormData for file upload
            const formDataToSend = new FormData();
            
            // Add all product data
            const productData = {
                cod: formData.cod.trim(),
                name: formData.name.trim(),
                category: formData.category.trim(),
                isNewProduct: formData.isNewProduct,
                tecidos: selectedTecidos,
                priceCents: tecidosPrices,
                description: formData.description.filter(desc => desc.trim() !== ''),
                inStock: true
            };

            // Append product data as JSON string
            formDataToSend.append('productData', JSON.stringify(productData));

            // Get the actual files from the input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput && fileInput.files.length > 0) {
                Array.from(fileInput.files).forEach((file) => {
                    formDataToSend.append('images', file);
                });
            }

            const { data } = await axios.post('/api/product/add', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.success) {
                toast.success('Produto adicionado com sucesso!');
                navigate('/seller/product-list');
            } else {
                toast.error(data.message || 'Erro ao adicionar produto');
            }
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            if (error.response?.data?.code === 11000) {
                toast.error('Este código de produto já existe. Por favor, use outro código.');
            } else {
                toast.error(error.response?.data?.message || 'Erro ao adicionar produto');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-medium">Adicionar Novo Produto</h1>
                <button 
                    onClick={() => navigate('/seller/product-list')}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Voltar
                </button>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-6">
                {/* Dados Básicos */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Dados Básicos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Código *
                            </label>
                            <input
                                type="text"
                                name="cod"
                                value={formData.cod}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome do Produto *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoria *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat.path}>{cat.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isNewProduct"
                                name="isNewProduct"
                                checked={formData.isNewProduct}
                                onChange={handleChange}
                                className="rounded"
                            />
                            <label htmlFor="isNew">Novo Lançamento</label>
                        </div>
                    </div>
                </div>

                {/* Tecidos e Preços */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Tecidos e Preços</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {['B', 'C', 'D', 'E', 'F', 'G', 'I', 'L'].map((tecido) => (
                            <div key={tecido} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`tecido-${tecido}`}
                                    value={tecido}
                                    onChange={handleTecidoChange}
                                    className="rounded"
                                />
                                <label htmlFor={`tecido-${tecido}`}>{tecido}</label>
                            </div>
                        ))}
                    </div>

                    {selectedTecidos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {selectedTecidos.map((tecido) => (
                                <div key={tecido}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preço Tecido {tecido}
                                    </label>
                                    <input
                                        type="number"
                                        value={tecidosPrices[tecido] || ''}
                                        onChange={(e) => handlePriceChange(tecido, e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Descrição */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Descrição</h2>
                    <div className="space-y-4">
                        {formData.description.map((desc, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded-md"
                                    placeholder="Adicione uma descrição"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDescriptionField(index)}
                                        className="px-3 py-2 text-red-500 hover:text-red-700"
                                    >
                                        Remover
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addDescriptionField}
                            className="text-primary hover:text-primary/80"
                        >
                            + Adicionar descrição
                        </button>
                    </div>
                </div>

                {/* Imagens */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Imagens</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.image.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-32 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <span className="text-gray-500">+ Adicionar imagem</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/seller/product-list')}
                        className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Salvando...' : 'Salvar Produto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
