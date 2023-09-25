import { useState } from "react";
import CustomButton, { DELETE_TYPE, EDIT_TYPE, READ_TYPE } from "./CustomButton";

const BookCard = ({ bookInfo, deleteClick, readUpdateClick, handleEdit }) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <div className="d-flex justify-content-between align-items-center border p-3 shadow">
            <div>
                {editMode ? (<form className="d-flex gap-1" onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit(bookInfo, e.target[0].value)
                    setEditMode(false);
                }}>
                    <input className="form-control shadow" defaultValue={bookInfo.bookTitle} />
                    <button className="btn btn-success">save</button>
                </form>
                ) : (<h5 style={{ textDecoration: bookInfo.isRead ? "line-through" : "none" }}>
                    {bookInfo.bookTitle}</h5>
                )}
                <p>{bookInfo.date}</p>

            </div>
            <div className="btn-group">
                <CustomButton onclick={deleteClick} title={'delete'} type={DELETE_TYPE} />
                <CustomButton title={editMode ? 'edit' : 'cancel edit'} type={EDIT_TYPE} onclick={() => { setEditMode(!editMode) }} />
                <CustomButton onclick={readUpdateClick} title={bookInfo.isRead === false ? "unread" : "read"} type={READ_TYPE} />
            </div>
        </div>
    )
}


export default BookCard;