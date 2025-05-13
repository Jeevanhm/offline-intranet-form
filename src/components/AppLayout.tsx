
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataInnovationForm from './DataInnovationForm';
import DataManagement from './DataManagement';
import { Home, FileExcel } from 'lucide-react';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Data Innovation App Request Portal</h1>
        <p className="text-gray-600 text-center mt-2">Intranet Application for Infrastructure Requests</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-gray-100 p-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>New Request</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <FileExcel className="h-4 w-4" />
                <span>View & Export</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-4">
            <TabsContent value="form" className="mt-0">
              <DataInnovationForm />
            </TabsContent>
            <TabsContent value="data" className="mt-0">
              <DataManagement />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This application works offline and stores your data locally.</p>
        <p>No internet connection is required to use this application.</p>
      </div>
    </div>
  );
};

export default AppLayout;
