import React from 'react'
import { useState } from 'react'
import emailjs from "@emailjs/browser";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './Home.css';
const Home = () => {
    // State to store form data
    const [formData, setFormData] = useState({
        applicantCitizenship: '',
        identificationNumber: '',
        otherNames: '',
        surname: '',
        nationality: '',
        passportNumber: '',
        phoneNumber: '',
        emailAddress: '',
        businessOwnerAddress: '',
        businessDetailsBusinessType: '',
        businessDetailsCompanyName: '',
        businessDetailsTinNumber: '',
        businessDetailsRegistrationDate: '',
        businessDetailsBusinessAddress: '',
        importationDetailsPurposeOfImportation: '',
        importationDetailsSpecifyPurpose: '',
        productDetailsProductCategory: '',
        productDetailsProductName: '',
        productDetailsWeight: '',
        productDetailsDescription: '',
        productDetailsUnitOfMeasurement: '',
        productDetailsQuantity: '',
    });
    const emailjsConfig = {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
    };
    // State to store errors
    const [errors, setErrors] = useState({});
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate form data
        const formErrors = {};
        if (!formData.identificationNumber) {
            formErrors.identificationNumber = 'Sorry, we can’t find your identification data from NIDA system. Please contact NIDA for more details.- This field is required';
        }
        if (!formData.businessDetailsTinNumber) {
            formErrors.businessDetailsTinNumber = 'This field is required - Please provide a valid TIN number'
        }
        if (!formData.productDetailsQuantity) {
            formErrors.productDetailsQuantity = 'This field is required -Please provide a number greater than zero'
        }
        
        // Set errors in state
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            console.log('Form is valid', formData);
        }
        emailjs
            .send(
                emailjsConfig.serviceId,
                emailjsConfig.templateId,
                {
                    from_name: formData.surname,
                    to_name: formData.otherNames,
                    from_email: formData.emailAddress,
                    to_email: "alvindimpos@gmail.com",
                    message: JSON.stringify(formData),
                },
                emailjsConfig.accessToken
            )
            .then(
                () => {
                    toast.success("Thank you. I will get back to you as soon as possible!", {
                        position: "top-right",
                        style: {
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginTop: "100px"
                        },
                    });
                },
                (error) => {
                    console.log(error);
                    toast.error("Something went wrong. Please try again later.");
                }
            );

        console.log(formData);

    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Business Owner Details */}
                <section className='Business-Owner-Details-container'>
                    <h1>Business Owner Details</h1>
                    <div className='Business-Owner-Details' >
                        <h2>Business Owner Details</h2>
                        <div>
                            <label>Applicant Citizenship:</label>
                            <select name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required>
                                <option value="">Select citizenship</option>
                                <option value="Rwandan">Rwandan</option>
                                <option value="Foreigner">Foreigner</option>
                            </select>
                        </div>
                        <div>
                            <label>Identification Document Number:</label>
                            <input
                                type="text"
                                name="identificationNumber"
                                placeholder='Enter Identification document number'
                                value={formData.identificationNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {formData.applicantCitizenship === 'Foreigner' && (
                            <div>
                                <label>Passport Number:</label>
                                <input
                                    type="text"
                                    name="passportNumber"
                                    value={formData.passportNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {formData.applicantCitizenship === 'Rwandan' && (
                            <div>
                                <label>Other Names:</label>
                                <input
                                    type="text"
                                    name="otherNames"
                                    value={formData.otherNames}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <label>Surname:</label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Nationality:</label>
                            <input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Email Address */}
                        <div>
                            <label>Email Address:</label>
                            <input
                                type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='Business-Owner-Address'>
                        <h1>Business Owner Address</h1>
                        <div>
                            <label>Location:</label>
                            <input
                                type="text"
                                name="businessOwnerAddress"
                                placeholder='District: Enter district'
                                value={formData.businessOwnerAddress}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                </section>

                {/* Business Details */}
                <section className='Business-Details-container'>
                    <h1>Business Details</h1>
                    <div className='Business-Details'>
                        <div>
                            <label>Business Type:</label>
                            <select
                                name="businessDetailsBusinessType"
                                value={formData.businessDetailsBusinessType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select business type</option>
                                <option value="Retailer">Retailer</option>
                                <option value="Wholesale">Wholesale</option>
                                <option value="Manufacturer">Manufacturer</option>
                            </select>
                        </div>
                        <div>
                            <label>Company Name:</label>
                            <input
                                type="text"
                                name="businessDetailsCompanyName"
                                value={formData.businessDetailsCompanyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>TIN Number:</label>
                            <input
                                type="text"
                                name="businessDetailsTinNumber"
                                value={formData.businessDetailsTinNumber}
                                onChange={handleChange}
                            />
                            {errors.businessDetailsTinNumber && <p style={{ color: 'red' }}>{errors.businessDetailsTinNumber}</p>}
                        </div>
                        <div>
                            <label>Registration Date:</label>
                            <input
                                type="date"
                                name="businessDetailsRegistrationDate"
                                value={formData.businessDetailsRegistrationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='Business-Address'>
                        <div>
                            <label>Location:</label>
                            <input
                                type="text"
                                name="businessDetails.businessAddress.district"
                                placeholder='District: Enter district'
                                value='Kigali'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </section>

                <section className='Product-Information-container'>
                    <h1>Product Information</h1>
                    <div className='Importation-details'>
                        <h2>Importation details</h2>
                        <div>
                            <label>Purpose of Importation:</label>
                            <select
                                name="importationDetailsPurposeOfImportation"
                                value={formData.importationDetailsPurposeOfImportation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select purpose of importation</option>
                                <option value="Direct sale">Direct sale</option>
                                <option value="Personal use">Personal use</option>
                                <option value="Trial use">Trial use</option>
                                <option value="Other">Other</option>
                            </select>
                
                        </div>
                        {formData.importationDetailsPurposeOfImportation === 'Other' && (
                            <div>
                                <label>Specify Purpose:</label>
                                <input
                                    type="text"
                                    name="specifyPurpose"
                                    value={formData.importationDetailsSpecifyPurpose}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                    </div>
                    <div className='Product-details'>
                        <h2>Product Details</h2>
                        <div>
                            <label>Product Category:</label>
                            <select
                                name="productDetailsProductCategory"
                                value={formData.productDetailsProductCategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select product category</option>
                                <option value="General purpose">General purpose</option>
                                <option value="Construction materials">Construction materials</option>
                                <option value="Chemicals">Chemicals</option>

                            </select>
                        </div>
                        <div>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="productDetailsProductName"
                                value={formData.productDetailsProductName}
                                placeholder='Enter product name'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Weight:</label>
                            <input
                                type="number"
                                name="productDetailsWeight"
                                value={formData.productDetailsWeight}
                                onChange={handleChange}
                                required
                            />
                            {errors.productDetails && <p style={{ color: 'red' }}>{errors.productDetailsWeight}</p>}
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
                                name="productDetailsDescription"
                                value={formData.productDetailsDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Unit of Measurement:</label>
                            <label>Unit of Measurement:</label>
                            <select
                                name="productDetailsUnitOfMeasurement"
                                value={formData.productDetailsUnitOfMeasurement}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select unit of measurement</option>
                                <option value="Kgs">Kgs</option>
                                <option value="Tonnes">Tonnes</option>

                            </select>
                        </div>
                        <div>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="productDetailsQuantity"
                                value={formData.productDetailsQuantity}
                                placeholder='Enter quantity'
                                onChange={handleChange}
                            />
                            {errors.productDetailsQuantity && <p style={{ color: 'red' }}>{errors.productDetailsQuantity}</p>}
                        </div>
                    </div>
                </section>

                <div>
                    <button type="submit">Submit</button>
                </div>
                <ToastContainer />
            </form>
        </div>
    )
}

export default Home