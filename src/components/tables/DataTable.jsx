import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>{title}</CardTitle>
        {searchableColumns.length > 0 && (
          <div className="w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10"
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

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="text-left py-3 px-4 font-semibold text-foreground"
                  >
                    {column.label}
                  </th>
                ))}
                {actions && <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={`${idx}-${column.key}`}
                      className="py-4 px-4 text-sm text-foreground"
                    >
                      {column.render ? column.render(row) : (
                        <div
                          className={cn(
                            column.key === 'status' && 'inline-flex px-2 py-1 rounded-full text-xs font-medium',
                            row[column.key] === 'Active' && 'bg-green-500/10 text-green-700 dark:text-green-400',
                            row[column.key] === 'Inactive' && 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
                            row[column.key] === 'Paid' && 'bg-green-500/10 text-green-700 dark:text-green-400',
                            row[column.key] === 'Pending' && 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
                            row[column.key] === 'Overdue' && 'bg-red-500/10 text-red-700 dark:text-red-400',
                            row[column.key] === 'Present' && 'bg-green-500/10 text-green-700 dark:text-green-400',
                            row[column.key] === 'Absent' && 'bg-red-500/10 text-red-700 dark:text-red-400',
                            row[column.key] === 'Late' && 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
                          )}
                        >
                          {row[column.key]}
                        </div>
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td className="py-4 px-4 text-sm">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'px-2 py-1 rounded text-sm font-medium transition-colors',
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border hover:bg-muted'
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
