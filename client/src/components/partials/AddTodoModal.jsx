import React, { useState } from 'react'
import { createTodo } from '../../services/api.js';
import { toast } from 'react-toastify';

const AddTodoModal = ({ setRefreshList }) => {

    const [tododesc, setTodoDesc] = useState("");

    const handleTodoSubmit = async (e) => {
        e.preventDefault();

        if (tododesc === '') {
            toast.error("Todo description is required");
            return;
        }

        const result = await createTodo({ desc: tododesc })

        if (result.status === 200 && result.data.status === 200) {
            toast.success("Todo added!")
            setRefreshList(new Date())
            setTodoDesc("");
        } else {
            toast.error(result.data.message);
        }
    }

    return (
        <div className="modal mt-5" id='exampleModal'>
            <div className="modal-dialog" role='document'>
                <div className="modal-content">

                    <div className="modal-header">
                        <div className="modal-title">Add New Todo</div>
                        <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='close'>
                            <span arial-hidden="true"></span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group">

                            <textarea
                                name=""
                                className='form-control'
                                rows={3}
                                placeholder='Write Todos......'
                                onChange={(e) => setTodoDesc(e.target.value)}
                                value={tododesc}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={() => setTodoDesc('')}>Close</button>
                        <button className=' btn btn-secondary' onClick={handleTodoSubmit} data-bs-dismiss="modal" >Save Todo</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddTodoModal