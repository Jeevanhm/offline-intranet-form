
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataInnovationForm from './DataInnovationForm';
import DataManagement from './DataManagement';
import { Home, FileText } from 'lucide-react';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="container mx-auto px-2 py-4 max-w-5xl">
      <div className="mb-4 bg-blue-600 text-white p-3 rounded-t-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Weekly Intake Review</h1>
        <p className="text-center mt-1 text-sm opacity-90">Intranet Application for Infrastructure Requests</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-gray-100 p-1">
            <TabsList className="grid w-full grid-cols-2 gap-1">
              <TabsTrigger value="form" className="flex items-center justify-center gap-1 py-1 text-sm">
                <Home className="h-4 w-4" />
                <span>New Request</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center justify-center gap-1 py-1 text-sm">
                <FileText className="h-4 w-4" />
                <span>View & Export</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-2">
            <TabsContent value="form" className="mt-0 p-0">
              <DataInnovationForm />
            </TabsContent>
            <TabsContent value="data" className="mt-0 p-0">
              <DataManagement />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        <p>This application works offline and stores your data locally.</p>
        <p>No internet connection is required to use this application.</p>
      </div>
    </div>
  );
};

export default AppLayout;
