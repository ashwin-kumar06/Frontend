import { useState } from 'react';
import axios from 'axios';
import '../styles/AddProduct.css'

export default function AddProducts() {
    const [formData, setFormData] = useState({ title: '', description:'', category:'', condition: '', startingPrice:'', startingDate:'', endingDate:'', sellerId:'1', status:'', image: null });

    const handleChange = (e) => { 
        if (e.target.name === 'image') { 
            setFormData({ ...formData, [e.target.name]: e.target.files[0] }); // Store the selected image file 
        } else { 
            setFormData({ ...formData, [e.target.name]: e.target.value }); 
        }
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const formDataWithImage = new FormData(); // Create FormData object to handle file uploads 
            formDataWithImage.append('userId', formData.sellerId); 
            formDataWithImage.append('title', formData.title); 
            formDataWithImage.append('description', formData.description); 
            formDataWithImage.append('category', formData.category); 
            formDataWithImage.append('condition', formData.condition); 
            formDataWithImage.append('startingPrice', formData.startingPrice); 
            formDataWithImage.append('startingDate', formData.startingDate); 
            formDataWithImage.append('endingDate', formData.endingDate); 
            formDataWithImage.append('status', formData.status); 
            formDataWithImage.append('imagePath', formData.image);
            const response = await axios.post('http://localhost:5269/api/Products?userId=1',formDataWithImage,{
                headers: { 
                    'Content-Type': 'multipart/form-data' // Set content type for FormData 
                } 
            });
            console.log("Product created", response.data);
        }
        catch(error){
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="add-products">
            <div className="sidebar-form d-flex">
                <div className="sidebar">
                    <div>
                        <a href="">Marketing Stratergies</a>
                        <a href="">Analytics</a>
                        <a href="">History</a>
                    </div>
                </div>
                <div className="form container">
                    <form class="form-horizontal row" onSubmit={handleSubmit}>
                        <div class="row-12 d-flex">
                            <div class="form-group col-3">
                                <h2 class="">Fill product details</h2>
                            </div>
                        </div>
                        <div class="row-12 d-flex">
                            <div className='col-7'>
                                <div class="form-group row">
                                    <label class="control-label col-1">Title</label>
                                    <div class="col-6">
                                        <input type="text" class="form-control" placeholder='Product name' name='title' value={formData.title} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Description</label>
                                    <div class="col-7">
                                        <textarea type="text" class="form-control" placeholder='Product brand/model/size/color' name='description' value={formData.description} onChange={handleChange}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='col-5 d-flex'>
                                <div className='col'>
                                    <label class="control-label">Add Image</label>
                                    <input type="file" class="form-control" name='image' onChange={handleChange} accept='image/*'/>
                                </div>
                                
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class=" control-label">Start Date</label>
                                <div class="col-sm-8">
                                    <input type="date" class="date-start ml-5 form-control datepicker" placeholder="Date Start" name='startingDate' value={formData.startingDate} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class=" control-label">Type</label>
                                <div class="col-sm-8">
                                    <select name="category" class="form-control" value={formData.category} onChange={handleChange}>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Art">Art</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Education">Education</option>
                                        <option value="Entertainment">Entertainment</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class=" control-label">Expiry Date</label>
                                <div class="col-sm-8">
                                    <input type="date" class="date-end ml-5 form-control datepicker col-sm-8" placeholder="Date End" name='endingDate' value={formData.endingDate} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class=" control-label">Condition</label>
                                <div class="col-sm-8">
                                    <select name="condition" class="form-control" value={formData.condition} onChange={handleChange}>
                                        <option value="New">New</option>
                                        <option value="Good condition">Good condition</option>
                                        <option value="Little scratches">Little scratches</option>
                                        <option value="One or more years older">One or more years older</option>
                                        <option value="Antique">Antique</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class=" control-label">Starting Price</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name='startingPrice' value={formData.startingPrice} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class=" control-label">Status</label>
                                <div class="col-sm-8">
                                    <select name="status" class="form-control" value={formData.status} onChange={handleChange}>
                                        <option value="Open">Open</option>
                                        <option value="Close">Close</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="start-auction">
                            <button class="btn btn-primary" type='submit'>Start auction</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}