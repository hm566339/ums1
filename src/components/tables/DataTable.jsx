import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Search, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Input } from '../ui/Input'
import { cn } from '../../utils/cn'

export function DataTable({
  columns,
  data = [],
  title,
  searchableColumns = [],
  itemsPerPage = 10,
  actions = null
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter(item => {
      return searchableColumns.some(col => {
        const value = item[col]?.toString().toLowerCase() || ''
        return value.includes(searchTerm.toLowerCase())
      })
    })
  }, [data, searchTerm, searchableColumns])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Status badge styling
  const getStatusStyles = (value) => {
    const statusMap = {
      'Active': 'bg-success/10 text-success',
      'Inactive': 'bg-muted text-muted-foreground',
      'Paid': 'bg-success/10 text-success',
      'Pending': 'bg-warning/10 text-warning',
      'Overdue': 'bg-danger/10 text-danger',
      'Present': 'bg-success/10 text-success',
      'Absent': 'bg-danger/10 text-danger',
      'Late': 'bg-warning/10 text-warning',
      'Scheduled': 'bg-info/10 text-info',
      'Completed': 'bg-success/10 text-success',
      'Upcoming': 'bg-warning/10 text-warning',
      'On Leave': 'bg-warning/10 text-warning',
    }
    return statusMap[value] || ''
  }

  // Pagination range
  const getPaginationRange = () => {
    const delta = 2
    const range = []
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }
    if (currentPage - delta > 2) {
      range.unshift('...')
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...')
    }
    range.unshift(1)
    if (totalPages > 1) {
      range.push(totalPages)
    }
    return range
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {searchableColumns.length > 0 && (
          <div className="w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-border bg-muted/30">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                {actions && (
                  <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (actions ? 1 : 0)} 
                    className="py-12 text-center text-muted-foreground"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                currentData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((column) => (
                      <td
                        key={`${idx}-${column.key}`}
                        className="py-4 px-5 text-sm text-foreground"
                      >
                        {column.render ? column.render(row) : (
                          <span
                            className={cn(
                              column.key === 'status' && 'inline-flex px-2.5 py-1 rounded-lg text-xs font-medium',
                              getStatusStyles(row[column.key])
                            )}
                          >
                            {row[column.key]}
                          </span>
                        )}
                      </td>
                    ))}
                    {actions && (
                      <td className="py-4 px-5 text-sm">
                        <div className="flex items-center gap-1">
                          {actions(row)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{' '}
              <span className="font-medium text-foreground">{Math.min(endIndex, filteredData.length)}</span> of{' '}
              <span className="font-medium text-foreground">{filteredData.length}</span> results
            </p>
            <div className="flex items-center gap-1">
              {/* First page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              
              {/* Previous */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1 mx-1">
                {getPaginationRange().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="px-2 py-1 text-sm text-muted-foreground">...</span>
                    ) : (
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          'min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all',
                          currentPage === page
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'border border-border hover:bg-muted text-foreground'
                        )}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Next */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              {/* Last page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
