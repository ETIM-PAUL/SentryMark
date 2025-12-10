import { ChevronDown, ScanEye } from 'lucide-react';
import { X } from 'lucide-react';
import { TrackedAssetCard } from './TrackedAssetCard';
import { Image } from 'lucide-react';

export const TrackingModal = ({ isLoading, trackedAssets, onClose, currentPage, setCurrentPage, itemsPerPage }) => {

  // Pagination logic
  const totalPages = Math.ceil(trackedAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAssets = trackedAssets.slice(startIndex, endIndex);
  const startItem = startIndex + 1;
  const endItem = Math.min(endIndex, trackedAssets.length);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page and neighbors, and last page
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl border border-purple-500/30 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <ScanEye className="text-purple-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Internet Tracking Results</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
  
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-400"></div>
                  <ScanEye className="absolute inset-0 m-auto text-purple-400" size={32} />
                </div>
                <p className="text-slate-300 text-lg mt-6 font-medium">Scanning the internet...</p>
                <p className="text-slate-500 text-sm mt-2">This may take a few moment</p>
              </div>
            ) : trackedAssets.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-400">
                    Found <span className="text-purple-400 font-bold">{trackedAssets.length}</span> potential matches
                  </p>
                  <p className="text-slate-500 text-sm">
                    Showing {startItem}-{endItem} of {trackedAssets.length}
                  </p>
                </div>
                {paginatedAssets.map((asset) => (
                  <TrackedAssetCard key={asset.position} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Image className="mx-auto mb-4 text-slate-600" size={64} />
                <p className="text-slate-400 text-lg">No matches found</p>
              </div>
            )}
          </div>

          
  
          {/* Footer with Pagination */}
          {!isLoading && trackedAssets.length > 0 && (
            <div className="border-t border-slate-700 bg-slate-800/50">
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between">
                  {/* Previous Button */}
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ChevronDown className="rotate-90" size={16} />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {getPageNumbers().map((page, idx) => (
                      page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="text-slate-500 px-2">...</span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageClick(page)}
                          className={`w-10 h-10 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Next
                    <ChevronDown className="-rotate-90" size={16} />
                  </button>
                </div>
              )}

              {/* Close Button */}
              <div className="px-6 pb-4">
                <button
                  onClick={onClose}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };