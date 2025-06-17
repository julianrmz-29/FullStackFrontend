import React, { useState, useEffect } from 'react';
import './TodoModalFormAddEdit.css'

const TaskModal = ({ isOpen, onClose, mode, task, onSave, isLoading}) => {
    const [formData, setFormData] = useState({  id: null, taskName: '', completed: false });

    
    useEffect(() => {
        if (mode === 'edit' && task) {
            setFormData({
                id: task.id,
                taskName: task.taskName,
                completed: task.completed || false
            });
        } else {
            setFormData({
                id: null,
                taskName: '',
                completed: false
            });
        }
    }, [mode, task, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.taskName.trim()) {
            alert('Please enter a name for the task');
            return;
        }
        onSave(formData);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
        if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="Modal-overlay" onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}>
            <div className="Modal-container">
                <button onClick={onClose} className="Modal-close-btn" disabled={isLoading} title="Close">×</button>

                <h3 className="Modal-title"> {mode === 'add' ? 'Add new task' : 'Edit task'}</h3>
                
                <div className="Modal-form">
                    <div className="Form-group">
                        <label htmlFor="taskName" className="Form-label">Task Name:</label>
                        <input id="taskName" type="text" name="taskName" value={formData.taskName} onChange={handleInputChange} onKeyDown={handleKeyDown}
                            className="Form-input" placeholder="Enter the name of the task" disabled={isLoading} autoFocus />
                    </div>
                    
                    {mode === 'edit' && (
                        <div className="Form-group">
                            <label className="Checkbox-container">
                                <input type="checkbox" name="completed" checked={formData.completed} onChange={handleInputChange}
                                    className="Form-checkbox" disabled={isLoading} />
                                <span className="Checkbox-label">Task complete</span>
                            </label>
                        </div>
                    )}
                    
                    <div className="Modal-buttons">
                        <button type="button" onClick={onClose} className="Modal-btn modal-btn-cancel" disabled={isLoading}>Cancel </button>
                        <button type="button" onClick={handleSubmit} className={`Modal-btn Modal-btn-save ${isLoading ? 'Modal-btn-loading' : ''}`}
                            disabled={isLoading}>{isLoading ? 'Saving...' : (mode === 'add' ? 'Add' : 'Update')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;