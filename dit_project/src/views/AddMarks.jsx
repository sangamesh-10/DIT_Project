import React,{useRef,useState,useEffect} from "react";
import axiosClient from "../axios-client";

export const AddMarks=()=>
{
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [enrolledStudents, setEnrolledStudents] = useState([]);

    useEffect(() => {
        fetchSubjects();
      }, []);
    const fetchSubjects = async () => {
        try {
          const response = await axiosClient.get("/getFacultySubjects");
          setSubjects(response.data);
          setSelectedSubjects([]);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };
      const handleSubjectClick = async (subject) => {
        window.alert(subject);
        try {
          const response = await axiosClient.get(`/getEnrolledStudents?subject_code=${subject}`);
          setEnrolledStudents(response.data);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
      const handleMarksChange = (studentId,marks) => {
        const updatedStudents = enrolledStudents.map(student => {
          if (student.roll_num === studentId) {
            return { ...student,marks: Number(marks) };
          }
          return student;
        });
        setEnrolledStudents(updatedStudents);
      };

    return(
        <div>
            <label>Subjects:</label>
            <div>
                {subjects.map(subject => (
                <button key={subject} className={selectedSubjects.includes(subject) ? 'selected' : ''}
                onClick={() => handleSubjectClick(subject)}>{subject} </button>))}
            </div>
        {enrolledStudents.length > 0 && (
        <div>
          <h2>Add Marks</h2>
          {enrolledStudents.map(student => (
            <div>
                <label>{student} : </label>
                <input type="number" value={student || ''}
                  onChange={(e) => handleMarksChange(student, e.target.value)}
                />
            </div>
          ))}
        </div>
      )}

      </div>
    )

}
