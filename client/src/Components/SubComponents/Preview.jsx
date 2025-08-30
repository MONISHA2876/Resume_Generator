import { Mail, Phone, FileText, GraduationCap, Briefcase, Award } from 'lucide-react';

function Preview({ resumeData = {}, skillsArray = [] }) {
  return (
    <div>
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
        {resumeData.experience?.some(exp => exp.jobTitle || exp.company) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Work Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) =>
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
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education?.some(edu => edu.degree || edu.institution) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu, index) =>
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
              )}
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
  );
}

export default Preview;
