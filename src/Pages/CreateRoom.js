import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../helper/utils';
import { createRoom , reset } from '../features/room/roomSlice';

const CreateRoom = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { isSuccess } = useSelector((state) => state.room);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        name: "test",
        price: 123,
        desc: "sth",
        roomNumbers: "401, 203, 232, 234",
    });

    console.log(user);
    

    const { name, price, desc, roomNumbers } = formData;

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, dispatch, navigate]);

    useEffect(() => {
        if (isSuccess === true) {
            console.log("Navigation to dashboard triggered.");
            dispatch(reset());
            navigate('/dashboard');
        }
    }, [isSuccess, dispatch, navigate]);
    
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }));
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !price || !roomNumbers) {
            return;
        }
    
        const roomArray = roomNumbers.split(",").map((item) => {
            return {
                number: parseInt(item.trim()),
                unavailableDate: [],
            }
        });
    
        let list = [];
        
            list = await Promise.all(Object.values(files).map(async (file) => {
                const url= await uploadImage(file);
                return url
            }));
            
        
    
        const dataToSubmit = { name, price, desc, roomNumbers: roomArray, images: list };
    
        // Gọi dispatch với hàm createRoom
       
        console.log("Submitting room data:", dataToSubmit);
        dispatch(createRoom(dataToSubmit));
    };

    return (
        <div className='container'>
            <h1 className='heading center'>Create Room</h1>
            <div className='form-wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' value={name} placeholder='Enter room name' onChange={handleChange} />
                    </div>

                    <div className='input-group'>
                        <label htmlFor='price'>Price</label>
                        <input type='text' name='price' value={price} placeholder='Enter the price' onChange={handleChange} />
                    </div>

                    <div className='input-group'>
                        <label htmlFor='desc'>Description</label>
                        <textarea name='desc' onChange={handleChange} value={desc}></textarea>
                    </div>

                    <div className='input-group'>
                        <label htmlFor='roomNumbers'>Room Numbers</label>
                        <textarea name='roomNumbers' onChange={handleChange} value={roomNumbers} placeholder='Enter room numbers separated by commas (e.g., 202, 203, 204)'></textarea>
                    </div>

                    <div className='input-group'>
                        <label htmlFor='file'>Images</label>
                        <input type='file' name='file' multiple onChange={handleFileChange} />
                    </div>

                    <button  type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;