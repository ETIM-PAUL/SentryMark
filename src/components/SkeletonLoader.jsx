import React from 'react';

// Reusable skeleton shimmer animation
export const SkeletonCard = ({ children }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg">
    {children}
  </div>
);

export const SkeletonLine = ({ width = 'w-full', height = 'h-4' }) => (
  <div className={`${width} ${height} bg-slate-700/50 rounded animate-pulse`}></div>
);

export const SkeletonText = () => (
  <div className="space-y-3">
    <SkeletonLine width="w-3/4" height="h-4" />
    <SkeletonLine width="w-full" height="h-4" />
    <SkeletonLine width="w-5/6" height="h-4" />
  </div>
);

// Skeleton for Metadata Card
export const MetadataCardSkeleton = () => (
  <SkeletonCard>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-6 bg-slate-700/50 rounded animate-pulse"></div>
      <SkeletonLine width="w-32" height="h-6" />
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-start">
          <SkeletonLine width="w-24" height="h-4" />
          <SkeletonLine width="w-48" height="h-4" />
        </div>
      ))}
    </div>
  </SkeletonCard>
);

// Skeleton for License Card
export const LicenseCardSkeleton = () => (
  <SkeletonCard>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-6 bg-slate-700/50 rounded animate-pulse"></div>
      <SkeletonLine width="w-32" height="h-6" />
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between items-start">
          <SkeletonLine width="w-28" height="h-4" />
          <SkeletonLine width="w-40" height="h-4" />
        </div>
      ))}
    </div>
  </SkeletonCard>
);

// Skeleton for Table
export const TableSkeleton = ({ title, rows = 5 }) => (
  <SkeletonCard>
    <div className="flex items-center gap-2 mb-6">
      <div className="w-6 h-6 bg-slate-700/50 rounded animate-pulse"></div>
      <SkeletonLine width="w-40" height="h-6" />
    </div>
    
    {/* Table Header */}
    <div className="grid grid-cols-4 gap-4 mb-4 pb-3 border-b border-slate-700/50">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonLine key={i} width="w-20" height="h-4" />
      ))}
    </div>
    
    {/* Table Rows */}
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((j) => (
            <SkeletonLine key={j} width="w-full" height="h-4" />
          ))}
        </div>
      ))}
    </div>
    
    {/* Pagination Skeleton */}
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700/50">
      <SkeletonLine width="w-32" height="h-4" />
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-slate-700/50 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-slate-700/50 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-slate-700/50 rounded animate-pulse"></div>
      </div>
    </div>
  </SkeletonCard>
);

// Complete Loading State
export const IPAssetLoadingSkeleton = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/30">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <p className="text-purple-300 text-sm font-medium">Fetching IP Asset Data...</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MetadataCardSkeleton />
      <LicenseCardSkeleton />
    </div>
    
    <div className="space-y-6">
      <TableSkeleton title="Tips Received" />
      <TableSkeleton title="Revenue Claims" />
    </div>
  </div>
);

export default IPAssetLoadingSkeleton;
