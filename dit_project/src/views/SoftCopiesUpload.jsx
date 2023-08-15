import React, { useState } from 'react';
import axiosClient from '../axios-client';

function SoftCopiesUpload() {
    const [rollNumber, setRollNumber] = useState('');
    const [photo, setPhoto] = useState(null);
    const [aadhar, setAadhar] = useState(null);
    const [sscMemo, setSscMemo] = useState(null);
    const [interMemo, setInterMemo] = useState(null);
    const [gradMemo, setGradMemo] = useState(null);
    const [transfer, setTransfer] = useState(null);
    const [provisional, setProvisional] = useState(null);
    const [community, setCommunity] = useState(null);
    const [income, setIncome] = useState(null);
    const [joining, setJoining] = useState(null);
    const [allotment, setAllotment] = useState(null);
    const [bonafides, setBonafides] = useState([]);
    const [bonafideInter, setBonafideInter] = useState(null);
    const [bonafideGrad, setBonafideGrad] = useState(null);

    const handleFileChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        setBonafides(fileArray);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('roll_num', rollNumber);
        formData.append('photo', photo);
        formData.append('aadhar', aadhar);
        formData.append('ssc_memo', sscMemo);
        formData.append('inter_diploma_memo', interMemo);
        formData.append('grad_memo', gradMemo);
        formData.append('transfer', transfer);
        formData.append('provisional', provisional);
        formData.append('community', community);
        formData.append('income_ews', income);
        formData.append('joining_report', joining);
        formData.append('allotment_order', allotment);
        console.log('Before appending bonafides:', formData.getAll('bonafides[]'));

        for (const bonafide of bonafides) {
            console.log('entered');
            formData.append('bonafides[]', bonafide);
        }
        console.log('After appending bonafides:', formData.getAll('bonafides[]'));

        formData.append('bonafide_inter', bonafideInter);
        formData.append('bonafide_grad', bonafideGrad);

        console.log(bonafides)
        try {
            const response = await axiosClient.post('/uploadSoftCopies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);

            alert('Soft copies saved successfully');
        } catch (error) {
            console.error(error);

            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Student Registration</h1>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="rollNumber">Roll Number : </label>
                <input type="text" name='rollNumber' placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} /><br /><br />

                <label htmlFor="photo">Image : </label>
                <input type="file" name='photo' accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} /><br /><br />
                <label htmlFor="aadhar">Aadhar Card : </label>
                <input type="file" name='aadhar' accept=".pdf" onChange={(e) => setAadhar(e.target.files[0])} /><br /><br />
                <label htmlFor="ssc">SSC Memo : </label>
                <input type="file" name='ssc' accept=".pdf" onChange={(e) => setSscMemo(e.target.files[0])} /><br /><br />
                <label htmlFor="inter">Intermediate or Diploma Memo : </label>
                <input type="file" name='inter' accept=".pdf" onChange={(e) => setInterMemo(e.target.files[0])} /><br /><br />
                <label htmlFor="grad">Graduation Memo : </label>
                <input type="file" name='grad' accept=".pdf" onChange={(e) => setGradMemo(e.target.files[0])} /><br /><br />
                <label htmlFor="transfer">Transfer Certificate : </label>
                <input type="file" name='transfer' accept=".pdf" onChange={(e) => setTransfer(e.target.files[0])} /><br /><br />
                <label htmlFor="provisional">Provisional Certificate : </label>
                <input type="file" name='provisional' accept=".pdf" onChange={(e) => setProvisional(e.target.files[0])} /><br /><br />
                <label htmlFor="community">Community/Caste Certificate : </label>
                <input type="file" name='community' accept=".pdf" onChange={(e) => setCommunity(e.target.files[0])} /><br /><br />
                <label htmlFor="income">Income/EWS Certificate : </label>
                <input type="file" name='income' accept=".pdf" onChange={(e) => setIncome(e.target.files[0])} /><br /><br />
                <label htmlFor="joining">Joining Report : </label>
                <input type="file" name='joining' accept=".pdf" onChange={(e) => setJoining(e.target.files[0])} /><br /><br />
                <label htmlFor="allotment">Allotment Order : </label>
                <input type="file" name='allotment' accept=".pdf" onChange={(e) => setAllotment(e.target.files[0])} /><br /><br />
                <label htmlFor="bonafides">Bonafides Files:</label>
                <input type="file" name="bonafides[]" id="bonafides" multiple onChange={handleFileChange} /><br /><br />
                <label htmlFor="interBonafide">Intermediate/Diploma Bonafide : </label>
                <input type="file" name='interBonafide' accept=".pdf" onChange={(e) => setBonafideInter(e.target.files[0])} /><br /><br />
                <label htmlFor="gradBonafide">Graduation Bonafide : </label>
                <input type="file" name='gradBonafide' accept=".pdf" onChange={(e) => setBonafideGrad(e.target.files[0])} /><br /><br />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default SoftCopiesUpload;
