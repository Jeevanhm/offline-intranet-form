
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getAllFormData, deleteFormData } from '@/utils/offlineStorage';
import { exportToExcel } from '@/utils/excelUtils';
import { useToast } from '@/hooks/use-toast';
import { FileExcel, Trash } from 'lucide-react';

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
      const success = exportToExcel(formSubmissions, 'data-innovation-app.xlsx');
      if (success) {
        toast({
          title: "Export Successful",
          description: "Form submissions have been exported to Excel.",
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Saved Form Submissions</h2>
        <Button onClick={handleExport} disabled={formSubmissions.length === 0}>
          <FileExcel className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading submissions...</div>
      ) : formSubmissions.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No form submissions found. Submit a new request to see it here.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>App Name</th>
                <th>Requestor</th>
                <th>Date Requested</th>
                <th>Submission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.appName}</td>
                  <td>{submission.requestor}</td>
                  <td>{submission.dateRequested}</td>
                  <td>{new Date(submission.timestamp).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(submission.id)}
                    >
                      <Trash className="h-4 w-4" />
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
