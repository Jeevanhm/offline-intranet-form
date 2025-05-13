
import * as XLSX from 'xlsx';

// Function to export data to Excel file
export const exportToExcel = (data: any[], fileName: string = 'data-innovation-app.xlsx') => {
  try {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Form Submissions');
    
    // Write workbook to file and trigger download
    XLSX.writeFile(wb, fileName);
    
    return true;
  } catch (error) {
    console.error('Failed to export to Excel:', error);
    return false;
  }
};

// Function to load data from Excel file (for future use if needed)
export const loadFromExcel = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          reject(new Error('Failed to read file'));
          return;
        }
        
        const wb = XLSX.read(data, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        
        const jsonData = XLSX.utils.sheet_to_json(ws);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsBinaryString(file);
  });
};
