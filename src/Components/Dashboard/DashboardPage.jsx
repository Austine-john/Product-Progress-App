import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import StatsCard from '../common/StatsCard';
import ProductSummaryCard from './ProductSummaryCard';
import ActivityLog from './ActivityLog'; 
import { faBox, faCheckCircle, faHourglassStart, faUsers } from '@fortawesome/free-solid-svg-icons';

const DashboardPage = () => {
  const { products, activities } = useProductContext();
  const completedProjects = products.filter(p => p.status === 'dispatch').length;
  const activeProjects = products.filter(p => p.status !== 'dispatch').length;
  const inProduction = products.filter(p => p.status === 'production').length;

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <StatsCard 
            title="Active Projects" 
            value={activeProjects} 
            change={8} 
            icon={faBox} 
            color="#0d6efd" // Blue
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatsCard 
            title="Completed" 
            value={completedProjects} 
            change={12} 
            icon={faCheckCircle} 
            color="#198754" // Green
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatsCard 
            title="In Production" 
            value={inProduction} 
            change={-5}  
            icon={faHourglassStart}  
            color="#ffc107" // Yellow
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatsCard 
            title="Team Members" 
            value="15" 
            change={0} 
            icon={faUsers} 
            color="#6f42c1" // Purple
          />
        </div>
      </div>

      {/* Projects and Activity Log */}
      <div className="row g-4">
        <div className="col-lg-8">
          <h5 className="fw-semibold mb-3">Active Projects</h5>
          <div className="row g-3">
            {products.slice(0, 3).map(product => (
              <div key={product.id} className="col-12">
                <ProductSummaryCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <ActivityLog activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;