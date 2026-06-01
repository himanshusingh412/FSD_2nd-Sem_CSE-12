import './studentcard.css';

function StudentCard({ name, marks, grade }) {
    return (
        <div className="student-card">
            <h2 className="student-name">Name : {name}</h2>
            <p className="student-info"><span>Marks :</span> <span>{marks}</span></p>
            <p className="student-info"><span>Grade :</span> <span>{grade}</span></p>
        </div>
    );
}
export default StudentCard;