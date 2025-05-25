
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataInnovationForm from './DataInnovationForm';
import DataManagement from './DataManagement';
import { Home, FileText, Plus } from 'lucide-react';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [formKey, setFormKey] = useState(0);

  const handleNewApplication = () => {
    setFormKey(prev => prev + 1);
    setActiveTab('form');
  };

  return (
    <div className="container mx-auto px-2 py-2 max-w-5xl">
      <div className="mb-1 bg-sky-500 text-white p-2 rounded-t-lg shadow-md">
        <h1 className="text-lg font-bold text-center">Intake Application</h1>
        <p className="text-center mt-0.5 text-xs opacity-90">Infrastructure Request Management System</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-gray-100 p-0.5">
            <div className="flex items-center gap-2">
              <TabsList className="grid grid-cols-2 gap-1 flex-1">
                <TabsTrigger value="form" className="flex items-center justify-center gap-1 py-0.5 text-xs">
                  <Home className="h-3 w-3" />
                  <span>New Request</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center justify-center gap-1 py-0.5 text-xs">
                  <FileText className="h-3 w-3" />
                  <span>View & Export</span>
                </TabsTrigger>
              </TabsList>
              <Button
                onClick={handleNewApplication}
                size="sm"
                variant="outline"
                className="flex items-center gap-1 text-xs px-2 py-1 h-7"
              >
                <Plus className="h-3 w-3" />
                New Application
              </Button>
            </div>
          </div>
          
          <div className="p-1">
            <TabsContent value="form" className="mt-0 p-0">
              <DataInnovationForm key={formKey} />
            </TabsContent>
            <TabsContent value="data" className="mt-0 p-0">
              <DataManagement />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-1 text-center text-xs text-gray-500">
        <p>This application works offline and stores your data locally.</p>
      </div>
    </div>
  );
};

export default AppLayout;
