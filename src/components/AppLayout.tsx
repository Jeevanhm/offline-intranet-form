
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataInnovationForm from './DataInnovationForm';
import DataManagement from './DataManagement';
import { Home, FileText } from 'lucide-react';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="mb-6 bg-blue-600 text-white p-4 rounded-t-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Weekly Intake Review</h1>
        <p className="text-center mt-2 opacity-90">Intranet Application for Infrastructure Requests</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-gray-100 p-2">
            <TabsList className="grid w-full grid-cols-2 gap-1">
              <TabsTrigger value="form" className="flex items-center justify-center gap-2 py-2">
                <Home className="h-4 w-4" />
                <span>New Request</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center justify-center gap-2 py-2">
                <FileText className="h-4 w-4" />
                <span>View & Export</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-4">
            <TabsContent value="form" className="mt-0 p-0">
              <DataInnovationForm />
            </TabsContent>
            <TabsContent value="data" className="mt-0 p-0">
              <DataManagement />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>This application works offline and stores your data locally.</p>
        <p>No internet connection is required to use this application.</p>
      </div>
    </div>
  );
};

export default AppLayout;
