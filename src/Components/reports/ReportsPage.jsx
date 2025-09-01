import React from 'react';

const ReportsPage = () => {
  const stages = ['Design', 'Production', 'QA Testing', 'Dispatch'];
  const progressValues = [25, 40, 20, 15];

  return (
    <div>
      <h2 className="h2 mb-4">Reports & Analytics</h2>

      <div className="row g-4">
        {/* Project Status Overview */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border">
            <div className="card-body">
              <h5 className="card-title mb-4">Project Status Overview</h5>
              {stages.map((stage, idx) => (
                <div key={stage} className="d-flex justify-content-between align-items-center mb-3">
                  <span>{stage}</span>
                  <div className="d-flex align-items-center gap-2">
                    <div className="progress" style={{ width: '150px', height: '8px' }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${progressValues[idx]}%` }}
                        aria-valuenow={progressValues[idx]}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className="fw-medium">{progressValues[idx]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Completion Rate */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border">
            <div className="card-body text-center">
              <h5 className="card-title mb-4">Monthly Completion Rate</h5>
              <div className="display-4 text-success mb-2">85%</div>
              <p className="text-muted mb-3">Projects completed on time</p>
              <div className="small text-muted">
                8 out of 12 projects completed this month
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
