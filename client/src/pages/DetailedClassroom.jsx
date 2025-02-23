import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import Loader from "../components/basic/Loader";
import AddPaperModal from "../components/papers/AddPaperModal";
import CreateScheduleModal from "../components/schedule/CreateScheduleModal";
const DetailedClassroom = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPapers, setShowPapers] = useState(false);
  const [showRoutine, setshowRoutine] = useState(false);
  const [papers, setPapers] = useState([]);
  const [classroom, setClassroom] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState(null);
  const [showAddPaperModal, setShowAddPaperModal] = useState(false);
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const fetchClassroom = async () => {
    try {
      const response = await api.get(`/admin/classrooms/${id}`);
      setClassroom(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch classroom");
    } finally {
      setLoading(false);
    }
  };

  const fetchPapers = async () => {
    try {
      const response = await api.get(`/admin/classes/classroom/${id}`);
      setPapers(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch papers");
    }
  };
  useEffect(() => {
    

    fetchClassroom();
    fetchPapers();
  }, [id]);

  const handleDeletePaper = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/admin/classes/${paperToDelete}`);
      setPapers(papers.filter(paper => paper._id !== paperToDelete));
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete paper");
    }
  };
  const handlePaperAdded = (newPaper) => {
    fetchPapers();
  };
  const handleCreateSchedule = async () => {
  }
  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  if (!classroom) {
    return <div className="p-6">Classroom not found</div>;
  }

  return (
    <div className="p-6">
      {/* Classroom Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{classroom.name}</h1>
            <p className="text-blue-100">Department: {classroom.department?.name}</p>
          </div>
          <div className="space-y-2">
            <p>Program: {classroom.program?.name}</p>
            <p>Level: {classroom.level?.name}</p>
          </div>
          <div className="space-y-2">
            <p>Semester: {classroom.semester?.name}</p>
            <p>Course: {classroom.course?.name}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 cursor-pointer"
            onClick={() => setShowAddPaperModal(true)}
            >
              Add Paper
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 cursor-pointer"
             onClick={() => setShowCreateSchedule(true)}
            >
              Add Schedule
            </button>
          </div>
           {/* Add Paper Modal */}
      {showAddPaperModal && (
        <AddPaperModal
          classroomId={id}
          onClose={() => setShowAddPaperModal(false)}
          onPaperAdded={handlePaperAdded}
        />
      )}
      {/* // Render modal */}
{showCreateSchedule && (
  <CreateScheduleModal
    classroomId={id}
    onClose={() => setShowCreateSchedule(false)}
    onScheduleCreated={handleCreateSchedule}
  />
)}
        </div>
      </div>

      {/* Papers Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <button
          onClick={() => setShowPapers(!showPapers)}
          className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold flex items-center justify-between">
            Papers ({papers.length})
            <span className={`transform transition-transform ${showPapers ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </h2>
        </button>

        {showPapers && (
          <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.length > 0 ? (
              papers.map((paper) => (
                <div
                  key={paper._id}
                  className="group flex items-center justify-between p-4 mb-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors "
                >
                  <div className="flex justify-between items-center min-w-64">
                    <h3 className="font-medium">{paper.subject.name}</h3>
                    <p className="text-md text-gray-600 font-bold">{`${paper.subject.code}`.toLocaleUpperCase()}</p>
                  </div>
                  <button
                    onClick={() => {
                      setPaperToDelete(paper._id);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity px-3 py-1.5 hover:bg-red-100 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No papers available for this classroom
              </div>
            )}
          </div>
        )}
      </div>

      {/* show routine */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mt-4">
        <button
          onClick={() => setshowRoutine(!showRoutine)}
          className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold flex items-center justify-between">
            Routine
            <span className={`transform transition-transform ${showRoutine ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </h2>
        </button>

        {showRoutine && (
          <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            Routine will be shown here
          </div>
        )}
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
          <div
        
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-4">Delete Paper</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this paper? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePaper}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedClassroom;