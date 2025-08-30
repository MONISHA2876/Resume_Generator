import { useState, useRef } from 'react';
import { Plus, X, User, Mail, Phone, FileText, GraduationCap, Briefcase, Award } from 'lucide-react';
import DownloadBtn from './SubComponents/DownloadBtn.jsx';
import '../App.css';

const ResumeGenerator = () => {

    //Form Data
  const [resumeData, setResumeData] = useState({
    //Photo can be added later if needed
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    education: [{ degree: '', institution: '', year: '' }],
    experience: [{ jobTitle: '', company: '', duration: '', description: '' }],
    skills: ''
  });

  const resumeRef = useRef();

  const updateField = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field, index, key, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  const addArrayItem = (field) => {
    const newItem = field === 'education' 
      ? { degree: '', institution: '', year: '' }
      : { jobTitle: '', company: '', duration: '', description: '' };
    
    setResumeData(prev => ({
      ...prev,
      [field]: [...prev[field], newItem]
    }));
  };

  const removeArrayItem = (field, index) => {
    setResumeData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const skillsArray = resumeData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);

  return (
    <div className="h-screen bg-[#F5F5F5] overflow-hidden">
      {/* Print Styles jo print karte time apply hogi :)*/}
      <style>{`
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .resume-preview { 
            box-shadow: none !important; 
            margin: 0 !important;
            max-width: none !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
          }
        }
        .print-only { display: none; }
      `}</style>

      <div className="no-print">
        {/* Header */}
        <div className="bg-[#E4F1FB] shadow-md flex items-center justify-center py-4 mb-4 sticky w-full z-10 top-0 ">
            <div className="flex flex-row justify-between items-center max-w-screen-xl w-full">
            <div className="max-w-7xl mx-4 px-4">
                <h1 className="text-3xl font-bold text-gray-900">Resume Generator</h1>
                <p className="text-gray-600 mt-1">Create your professional resume in minutes</p>
            </div>

            <div className='w-3xs flex justify-end m-3'>
                <DownloadBtn />
            </div>
        </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6 w-100% mb-10 h-[calc(100vh-120px)] overflow-y-scroll">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={resumeData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={resumeData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Professional Summary
                </h2>
                <textarea
                  placeholder="Write a brief summary about yourself, your career goals, and key achievements..."
                  value={resumeData.summary}
                  onChange={(e) => updateField('summary', e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Education */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Education
                  </h2>
                  <button
                    onClick={() => addArrayItem('education')}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors flex items-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-700">Education #{index + 1}</span>
                        {resumeData.education.length > 1 && (
                          <button
                            onClick={() => removeArrayItem('education', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateArrayField('education', index, 'degree', e.target.value)}
                          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => updateArrayField('education', index, 'year', e.target.value)}
                          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateArrayField('education', index, 'institution', e.target.value)}
                        className="w-full mt-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Work Experience
                  </h2>
                  <button
                    onClick={() => addArrayItem('experience')}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors flex items-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-700">Experience #{index + 1}</span>
                        {resumeData.experience.length > 1 && (
                          <button
                            onClick={() => removeArrayItem('experience', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.jobTitle}
                          onChange={(e) => updateArrayField('experience', index, 'jobTitle', e.target.value)}
                          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g., 2020-2023)"
                          value={exp.duration}
                          onChange={(e) => updateArrayField('experience', index, 'duration', e.target.value)}
                          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateArrayField('experience', index, 'company', e.target.value)}
                        className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <textarea
                        placeholder="Job description and achievements..."
                        value={exp.description}
                        onChange={(e) => updateArrayField('experience', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Skills
                </h2>
                <textarea
                  placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Node.js, Python)"
                  value={resumeData.skills}
                  onChange={(e) => updateField('skills', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:sticky w-100% h-[calc(100vh-120px)] overflow-y-auto top-0">
              <div className="bg-white rounded-lg shadow-lg p-8 resume-preview" ref={resumeRef}>
                {/* Header */}
                <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {resumeData.fullName || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600">
                    {resumeData.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {resumeData.email}
                      </div>
                    )}
                    {resumeData.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {resumeData.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {resumeData.summary && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp, index) => (
                        (exp.jobTitle || exp.company) && (
                          <div key={index} className="border-l-4 border-blue-500 pl-4">
                            <div className="flex flex-wrap justify-between items-start mb-1">
                              <h3 className="font-semibold text-gray-900">
                                {exp.jobTitle || 'Job Title'}
                              </h3>
                              {exp.duration && (
                                <span className="text-sm text-gray-500 font-medium">
                                  {exp.duration}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 font-medium mb-2">
                              {exp.company || 'Company Name'}
                            </p>
                            {exp.description && (
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {resumeData.education.some(edu => edu.degree || edu.institution) && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Education
                    </h2>
                    <div className="space-y-3">
                      {resumeData.education.map((edu, index) => (
                        (edu.degree || edu.institution) && (
                          <div key={index} className="border-l-4 border-green-500 pl-4">
                            <div className="flex flex-wrap justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {edu.degree || 'Degree'}
                                </h3>
                                <p className="text-gray-700">
                                  {edu.institution || 'Institution'}
                                </p>
                              </div>
                              {edu.year && (
                                <span className="text-sm text-gray-500 font-medium">
                                  {edu.year}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {skillsArray.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {skillsArray.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!resumeData.fullName && !resumeData.summary && 
                 !resumeData.experience.some(exp => exp.jobTitle) && 
                 !resumeData.education.some(edu => edu.degree) && 
                 !skillsArray.length && (
                  <div className="text-center py-12 text-gray-400">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Start filling out the form to see your resume preview</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <DownloadBtn />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only version */}
      <div className="print-only">
        <div className="resume-preview max-w-4xl mx-auto p-8 bg-white">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {resumeData.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600">
              {resumeData.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {resumeData.email}
                </div>
              )}
              {resumeData.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {resumeData.phone}
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Work Experience
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  (exp.jobTitle || exp.company) && (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex flex-wrap justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {exp.jobTitle || 'Job Title'}
                        </h3>
                        {exp.duration && (
                          <span className="text-sm text-gray-500 font-medium">
                            {exp.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 font-medium mb-2">
                        {exp.company || 'Company Name'}
                      </p>
                      {exp.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.some(edu => edu.degree || edu.institution) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu, index) => (
                  (edu.degree || edu.institution) && (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {edu.degree || 'Degree'}
                          </h3>
                          <p className="text-gray-700">
                            {edu.institution || 'Institution'}
                          </p>
                        </div>
                        {edu.year && (
                          <span className="text-sm text-gray-500 font-medium">
                            {edu.year}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skillsArray.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;