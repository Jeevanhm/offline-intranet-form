import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { saveFormData } from '@/utils/offlineStorage';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  // App Name section
  appName: string;
  requestor: string;
  appOwner: string;
  l1Leadership: string;
  dateRequested: string;
  domain: string;
  fundingAvailable: string;
  fundCode: string;
  asgIrb: string;
  
  // Location section
  azure: string;
  onPrem: string;
  dataCenterLocation: string;
  physical: string;
  locationPhysicalReason: string;
  
  // Server Count section
  prodServerCount: number;
  nonProdServerCount: number;
  drServerCount: number;
  
  // Environments section
  prodEnv: string;
  nonProdEnv: string;
  drEnv: string;
  
  // Support Needs section
  cmsFullSupport: string;
  cmsExceptions: string;
  
  // Database Platforms section
  sql: string;
  oracle: string;
  otherDb: string;
  otherDbExplain: string;
  
  // Storage Needs section
  azureType: string;
  azureVolume: string;
  onPremStorage: string;
  onPremVolume: string;
  
  // Exceptions section
  backup: string;
  dr: string;
  physical_exceptions: string;
  physicalReason: string;
  onPremExceptions: string;
  onPremReason: string;
  noTestEnvSignOff: string;
  
  // Other Notes section
  otherNotes: string;

  // Manager Approval
  tabManagerSignoff: string;
}

const initialFormData: FormData = {
  // App Name section
  appName: "",
  requestor: "",
  appOwner: "",
  l1Leadership: "",
  dateRequested: new Date().toISOString().split('T')[0],
  domain: "School",
  fundingAvailable: "No",
  fundCode: "",
  asgIrb: "Pending",
  
  // Location section
  azure: "Yes",
  onPrem: "No",
  dataCenterLocation: "No",
  physical: "No",
  locationPhysicalReason: "",
  
  // Server Count section
  prodServerCount: 1,
  nonProdServerCount: 0,
  drServerCount: 0,
  
  // Environments section
  prodEnv: "Yes",
  nonProdEnv: "No",
  drEnv: "No",
  
  // Support Needs section
  cmsFullSupport: "Yes",
  cmsExceptions: "",
  
  // Database Platforms section
  sql: "Yes",
  oracle: "No",
  otherDb: "No",
  otherDbExplain: "",
  
  // Storage Needs section
  azureType: "Blob",
  azureVolume: "300TB",
  onPremStorage: "No",
  onPremVolume: "No",
  
  // Exceptions section
  backup: "Yes",
  dr: "No",
  physical_exceptions: "No",
  physicalReason: "",
  onPremExceptions: "No",
  onPremReason: "",
  noTestEnvSignOff: "Pending",
  
  // Other Notes section
  otherNotes: "• DB size 10G\n• SQL on VM:\n  • 4 vCPU & 32G RAM\n  • Windows 2022 license\n• Azure SQL MI\n• Azure SQL DB",
  
  // Manager Approval
  tabManagerSignoff: "No",
};

const DataInnovationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleYesNoChange = (field: keyof FormData, value: string) => {
    handleChange(field, value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveFormData(formData);
      
      toast({
        title: "Form Submitted Successfully",
        description: "Your request has been saved locally and can be exported to Excel.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error Submitting Form",
        description: "There was a problem saving your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render field/value pairs
  const renderField = (label: string, value: React.ReactNode, colSpan: number = 1) => {
    return (
      <div className={`grid grid-cols-2 items-center border-b border-gray-200 py-2 ${colSpan > 1 ? 'col-span-' + colSpan : ''}`}>
        <div className="font-medium text-left">{label}:</div>
        <div className="text-right">{value}</div>
      </div>
    );
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
      {/* Application Name field at the top */}
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="bg-gray-100 p-3 text-center font-semibold border-b">
          Application Details
        </div>
        <div className="p-4">
          <Label htmlFor="appName" className="block font-medium mb-2">Application Name</Label>
          <Input 
            id="appName"
            value={formData.appName} 
            onChange={(e) => handleChange("appName", e.target.value)}
            placeholder="Enter application name"
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* App Name Section - Left Column */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 text-center font-semibold border-b">
            App Information
          </div>
          <div className="p-4 space-y-2">
            {renderField("Requestor", 
              <Input 
                value={formData.requestor} 
                onChange={(e) => handleChange("requestor", e.target.value)}
                placeholder="Enter requestor name"
                className="w-full text-right"
              />
            )}
            
            {renderField("App Owner", 
              <Input 
                value={formData.appOwner} 
                onChange={(e) => handleChange("appOwner", e.target.value)}
                placeholder="Enter app owner name"
                className="w-full text-right"
              />
            )}
            
            {renderField("L1 Leadership", 
              <Input 
                value={formData.l1Leadership} 
                onChange={(e) => handleChange("l1Leadership", e.target.value)}
                placeholder="Enter L1 leadership name"
                className="w-full text-right"
              />
            )}
            
            {renderField("Date requested for build", 
              <Input 
                type="date" 
                value={formData.dateRequested} 
                onChange={(e) => handleChange("dateRequested", e.target.value)}
                className="w-full text-right"
              />
            )}
            
            {renderField("Domain", 
              <Input 
                value={formData.domain} 
                onChange={(e) => handleChange("domain", e.target.value)}
                placeholder="Enter domain"
                className="w-full text-right"
              />
            )}
            
            {renderField("Funding Available", 
              <Select 
                value={formData.fundingAvailable} 
                onValueChange={(value) => handleYesNoChange("fundingAvailable", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("Fund Code or Project Name", 
              <Input 
                value={formData.fundCode} 
                onChange={(e) => handleChange("fundCode", e.target.value)}
                placeholder="Enter fund code"
                className="w-full text-right"
              />
            )}
            
            {renderField("ASG/IRB", 
              <Input 
                value={formData.asgIrb} 
                onChange={(e) => handleChange("asgIrb", e.target.value)}
                placeholder="Enter ASG/IRB"
                className="w-full text-right"
              />
            )}
          </div>
        </div>
        
        {/* Middle column - first row (Support Needs) */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 text-center font-semibold border-b">
            Support Needs
          </div>
          <div className="p-4 space-y-2">
            {renderField("CMS Full Support", 
              <Select 
                value={formData.cmsFullSupport} 
                onValueChange={(value) => handleYesNoChange("cmsFullSupport", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            <div className="mt-4">
              <Label className="block font-medium mb-2">Exceptions to CMS Support:</Label>
              <Textarea 
                value={formData.cmsExceptions} 
                onChange={(e) => handleChange("cmsExceptions", e.target.value)}
                placeholder="Enter any exceptions"
                className="min-h-[180px] w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Right column - first row (Exceptions) */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 text-center font-semibold border-b">
            Exceptions
          </div>
          <div className="p-4 space-y-2">
            {renderField("Backup", 
              <Select 
                value={formData.backup} 
                onValueChange={(value) => handleYesNoChange("backup", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("DR", 
              <Select 
                value={formData.dr} 
                onValueChange={(value) => handleYesNoChange("dr", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("Physical", 
              <Select 
                value={formData.physical_exceptions} 
                onValueChange={(value) => handleYesNoChange("physical_exceptions", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("Reason for Physical", 
              <Input 
                value={formData.physicalReason} 
                onChange={(e) => handleChange("physicalReason", e.target.value)}
                placeholder=""
                className="w-full text-right"
              />
            )}
            
            {renderField("On Prem", 
              <Select 
                value={formData.onPremExceptions} 
                onValueChange={(value) => handleYesNoChange("onPremExceptions", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("Reason for On Prem", 
              <Input 
                value={formData.onPremReason} 
                onChange={(e) => handleChange("onPremReason", e.target.value)}
                placeholder=""
                className="w-full text-right"
              />
            )}
            
            {renderField("No-Test Env sign-off", 
              <Input 
                value={formData.noTestEnvSignOff} 
                onChange={(e) => handleChange("noTestEnvSignOff", e.target.value)}
                placeholder=""
                className="w-full text-right"
              />
            )}
          </div>
        </div>
        
        {/* Second Row */}
        {/* Left column - second row (Location) */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 text-center font-semibold border-b">
            Location
          </div>
          <div className="p-4 space-y-2">
            {renderField("Azure", 
              <Select 
                value={formData.azure} 
                onValueChange={(value) => handleYesNoChange("azure", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("On Prem", 
              <Select 
                value={formData.onPrem} 
                onValueChange={(value) => handleYesNoChange("onPrem", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("Data Center Location", 
              <Select 
                value={formData.dataCenterLocation} 
                onValueChange={(value) => handleChange("dataCenterLocation", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="EUS">EUS</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("Physical", 
              <Select 
                value={formData.physical} 
                onValueChange={(value) => handleYesNoChange("physical", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {renderField("Reason for Physical", 
              <Input 
                value={formData.locationPhysicalReason} 
                onChange={(e) => handleChange("locationPhysicalReason", e.target.value)}
                placeholder=""
                className="w-full text-right"
              />
            )}
          </div>
        </div>
        
        {/* Middle column - second row (Two small boxes) */}
        <div className="grid grid-rows-2 gap-6">
          {/* Server Count box */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-center font-semibold border-b">
              Server Count
            </div>
            <div className="p-4 space-y-2">
              {renderField("Prod", 
                <Input 
                  type="number" 
                  value={formData.prodServerCount.toString()} 
                  onChange={(e) => handleChange("prodServerCount", parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-24 text-right ml-auto"
                />
              )}
              
              {renderField("Non-Prod", 
                <Input 
                  type="number" 
                  value={formData.nonProdServerCount.toString()} 
                  onChange={(e) => handleChange("nonProdServerCount", parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-24 text-right ml-auto"
                />
              )}
              
              {renderField("DR", 
                <Input 
                  type="number" 
                  value={formData.drServerCount.toString()} 
                  onChange={(e) => handleChange("drServerCount", parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-24 text-right ml-auto"
                />
              )}
            </div>
          </div>
          
          {/* Environments box */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-center font-semibold border-b">
              Environments
            </div>
            <div className="p-4 space-y-2">
              {renderField("Prod", 
                <Select 
                  value={formData.prodEnv} 
                  onValueChange={(value) => handleYesNoChange("prodEnv", value)}
                >
                  <SelectTrigger className="w-24 ml-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {renderField("Non-Prod", 
                <Select 
                  value={formData.nonProdEnv} 
                  onValueChange={(value) => handleYesNoChange("nonProdEnv", value)}
                >
                  <SelectTrigger className="w-24 ml-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {renderField("DR", 
                <Select 
                  value={formData.drEnv} 
                  onValueChange={(value) => handleYesNoChange("drEnv", value)}
                >
                  <SelectTrigger className="w-24 ml-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - second and third row */}
        <div className="grid grid-rows-2 gap-6">
          {/* Database Platforms box */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-center font-semibold border-b">
              Database Platforms
            </div>
            <div className="p-4 space-y-2">
              {renderField("SQL", 
                <Select 
                  value={formData.sql} 
                  onValueChange={(value) => handleYesNoChange("sql", value)}
                >
                  <SelectTrigger className="w-24 ml-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {renderField("Oracle", 
                <Select 
                  value={formData.oracle} 
                  onValueChange={(value) => handleYesNoChange("oracle", value)}
                >
                  <SelectTrigger className="w-24 ml-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {renderField("Other (explain)", 
                <Select 
                  value={formData.otherDb} 
                  onValueChange={(value) => handleYesNoChange("otherDb", value)}
                >
                  <SelectTrigger className="w-24 ml-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {formData.otherDb === "Yes" && (
                <div className="col-span-2 mt-2">
                  <Textarea 
                    value={formData.otherDbExplain} 
                    onChange={(e) => handleChange("otherDbExplain", e.target.value)}
                    placeholder="Explain other database platform"
                    className="min-h-[60px] w-full"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Storage Needs box */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-center font-semibold border-b">
              Storage Needs
            </div>
            <div className="p-4 space-y-2">
              {renderField("Azure Type", 
                <Input 
                  value={formData.azureType} 
                  onChange={(e) => handleChange("azureType", e.target.value)}
                  placeholder=""
                  className="w-full text-right"
                />
              )}
              
              {renderField("Azure Volumes", 
                <Input 
                  value={formData.azureVolume} 
                  onChange={(e) => handleChange("azureVolume", e.target.value)}
                  placeholder=""
                  className="w-full text-right"
                />
              )}
              
              {renderField("On Prem", 
                <Select 
                  value={formData.onPremStorage} 
                  onValueChange={(value) => handleYesNoChange("onPremStorage", value)}
                >
                  <SelectTrigger className="w-24 ml-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {renderField("On Prem Volume", 
                <Input 
                  value={formData.onPremVolume} 
                  onChange={(e) => handleChange("onPremVolume", e.target.value)}
                  placeholder=""
                  className="w-full text-right"
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom row - Other Notes */}
        <div className="border rounded-md overflow-hidden col-span-1 md:col-span-3">
          <div className="bg-gray-100 p-3 text-center font-semibold border-b">
            Other Notes
          </div>
          <div className="p-4">
            <Textarea 
              value={formData.otherNotes} 
              onChange={(e) => handleChange("otherNotes", e.target.value)}
              placeholder="Enter any additional notes here"
              className="min-h-[100px] w-full"
            />
          </div>
        </div>
        
        {/* Manager Approval - renamed from Tab Manager Signoff */}
        <div className="border rounded-md overflow-hidden col-span-1 md:col-span-3">
          <div className="bg-gray-100 p-3 text-center font-semibold border-b">
            Manager Approval
          </div>
          <div className="p-4 space-y-2">
            {renderField("Manager Approval", 
              <Select 
                value={formData.tabManagerSignoff} 
                onValueChange={(value) => handleYesNoChange("tabManagerSignoff", value)}
              >
                <SelectTrigger className="w-24 ml-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mt-8">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
};

export default DataInnovationForm;
