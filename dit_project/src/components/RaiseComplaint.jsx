import React, { useState } from 'react';
import axiosClient from '../axios-client';

const RaiseComplaint = () => {
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('description', description);

        for (const attachment of attachments) {
            formData.append('attachments[]', attachment);
        }

        try {
            const response = await axiosClient.post('/raiseComplaintFaculty', formData);

            if (response.status === 200) {
                alert('Complaint raised successfully!');
            } else {
                alert('An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        setAttachments(fileArray);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label htmlFor="attachments">Attachments</label>
            <input type="file" name="attachments[]" id="attachments" multiple onChange={handleFileChange} />

            <button type="submit">Raise Complaint</button>
        </form>
    );
};

export default RaiseComplaint;
