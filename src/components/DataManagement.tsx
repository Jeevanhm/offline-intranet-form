
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getAllFormData, deleteFormData } from '@/utils/offlineStorage';
import { exportToExcel } from '@/utils/excelUtils';
import { useToast } from '@/hooks/use-toast';
import { FileText, Trash } from 'lucide-react';

interface FormSubmission {
  id: number;
  appName: string;
  requestor: string;
  dateRequested: string;
  timestamp: string;
  [key: string]: any;
}

const DataManagement: React.FC = () => {
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    setLoading(true);
    try {
      const data = await getAllFormData();
      setFormSubmissions(data);
    } catch (error) {
      console.error("Error loading form data:", error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load saved form submissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (formSubmissions.length === 0) {
      toast({
        title: "No Data to Export",
        description: "There are no form submissions to export.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = exportToExcel(formSubmissions, 'intake-application.xlsx');
      if (success) {
        toast({
          title: "Export Successful",
          description: "Form submissions have been appended to the Excel file.",
        });
      }
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export data to Excel.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFormData(id);
      toast({
        title: "Submission Deleted",
        description: "Form submission has been deleted.",
      });
      loadFormData();
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete form submission.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Saved Requests</h2>
        <Button onClick={handleExport} disabled={formSubmissions.length === 0} size="sm">
          <FileText className="mr-1 h-3 w-3" />
          Export to Excel
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-6 text-sm">Loading submissions...</div>
      ) : formSubmissions.length === 0 ? (
        <div className="text-center py-6 text-gray-500 text-sm">
          No form submissions found. Submit a new request to see it here.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="app-table text-xs">
            <thead>
              <tr>
                <th className="p-1">App Name</th>
                <th className="p-1">Requestor</th>
                <th className="p-1">Date Requested</th>
                <th className="p-1">Submission Date</th>
                <th className="p-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="p-1">{submission.appName}</td>
                  <td className="p-1">{submission.requestor}</td>
                  <td className="p-1">{submission.dateRequested}</td>
                  <td className="p-1">{new Date(submission.timestamp).toLocaleDateString()}</td>
                  <td className="p-1">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(submission.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataManagement;
