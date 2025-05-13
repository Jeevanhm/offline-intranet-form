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
}

const initialFormData: FormData = {
  // App Name section
  appName: "Data Innovation App",
  requestor: "",
  appOwner: "",
  l1Leadership: "",
  dateRequested: new Date().toISOString().split('T')[0],
  fundingAvailable: "No",
  fundCode: "",
  asgIrb: "NA – Existing App",
  
  // Location section
  azure: "Yes",
  onPrem: "No",
  dataCenterLocation: "EUS",
  physical: "No",
  locationPhysicalReason: "",
  
  // Server Count section
  prodServerCount: 2,
  nonProdServerCount: 1,
  drServerCount: 0,
  
  // Environments section
  prodEnv: "Yes",
  nonProdEnv: "Yes",
  drEnv: "No",
  
  // Support Needs section
  cmsFullSupport: "Yes",
  cmsExceptions: "",
  
  // Database Platforms section
  sql: "No",
  oracle: "No",
  otherDb: "No",
  otherDbExplain: "",
  
  // Storage Needs section
  azureType: "Yes",
  azureVolume: "2x1.2TB & 1x500GB",
  onPremStorage: "No",
  onPremVolume: "",
  
  // Exceptions section
  backup: "Yes",
  dr: "No",
  physical_exceptions: "No",
  physicalReason: "",
  onPremExceptions: "No",
  onPremReason: "",
  noTestEnvSignOff: "NA",
  
  // Other Notes section
  otherNotes: "4 vCPU & 16G RAM\nWin Server 2022 licenses",
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
      
      // Reset form or keep values based on user preference
      // setFormData(initialFormData);
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
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
      {/* App Name Section */}
      <div className="form-section">
        <div className="form-section-header">
          App Name – Data Innovation App
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-label">Requestor:</div>
            <div className="form-value">
              <Input 
                value={formData.requestor} 
                onChange={(e) => handleChange("requestor", e.target.value)}
                placeholder="Enter requestor name"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">App Owner:</div>
            <div className="form-value">
              <Input 
                value={formData.appOwner} 
                onChange={(e) => handleChange("appOwner", e.target.value)}
                placeholder="Enter app owner name"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">L1 Leadership:</div>
            <div className="form-value">
              <Input 
                value={formData.l1Leadership} 
                onChange={(e) => handleChange("l1Leadership", e.target.value)}
                placeholder="Enter L1 leadership name"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Date requested for build:</div>
            <div className="form-value">
              <Input 
                type="date" 
                value={formData.dateRequested} 
                onChange={(e) => handleChange("dateRequested", e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Funding Available:</div>
            <div className="form-value">
              <Select 
                value={formData.fundingAvailable} 
                onValueChange={(value) => handleYesNoChange("fundingAvailable", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Fund Code or Project Name:</div>
            <div className="form-value">
              <Input 
                value={formData.fundCode} 
                onChange={(e) => handleChange("fundCode", e.target.value)}
                placeholder="Pending"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">ASG/IRB:</div>
            <div className="form-value">
              <Input 
                value={formData.asgIrb} 
                onChange={(e) => handleChange("asgIrb", e.target.value)}
                placeholder="NA – Existing App"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Location Section */}
      <div className="form-section">
        <div className="form-section-header">
          Location
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-label">Azure:</div>
            <div className="form-value">
              <Select 
                value={formData.azure} 
                onValueChange={(value) => handleYesNoChange("azure", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">On Prem:</div>
            <div className="form-value">
              <Select 
                value={formData.onPrem} 
                onValueChange={(value) => handleYesNoChange("onPrem", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Data Center Location:</div>
            <div className="form-value">
              <Input 
                value={formData.dataCenterLocation} 
                onChange={(e) => handleChange("dataCenterLocation", e.target.value)}
                placeholder="EUS"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Physical:</div>
            <div className="form-value">
              <Select 
                value={formData.physical} 
                onValueChange={(value) => handleYesNoChange("physical", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Reason for Physical:</div>
            <div className="form-value">
              <Textarea 
                value={formData.locationPhysicalReason} 
                onChange={(e) => handleChange("locationPhysicalReason", e.target.value)}
                placeholder="Enter reason if applicable"
                className="min-h-[60px]"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Server Count Section */}
      <div className="form-section">
        <div className="form-section-header">
          Server Count
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-label">Prod:</div>
            <div className="form-value">
              <Input 
                type="number" 
                value={formData.prodServerCount.toString()} 
                onChange={(e) => handleChange("prodServerCount", parseInt(e.target.value) || 0)}
                min={0}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Non-Prod:</div>
            <div className="form-value">
              <Input 
                type="number" 
                value={formData.nonProdServerCount.toString()} 
                onChange={(e) => handleChange("nonProdServerCount", parseInt(e.target.value) || 0)}
                min={0}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">DR:</div>
            <div className="form-value">
              <Input 
                type="number" 
                value={formData.drServerCount.toString()} 
                onChange={(e) => handleChange("drServerCount", parseInt(e.target.value) || 0)}
                min={0}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Environments Section */}
      <div className="form-section">
        <div className="form-section-header">
          Environments
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-label">Prod:</div>
            <div className="form-value">
              <Select 
                value={formData.prodEnv} 
                onValueChange={(value) => handleYesNoChange("prodEnv", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Non-Prod:</div>
            <div className="form-value">
              <Select 
                value={formData.nonProdEnv} 
                onValueChange={(value) => handleYesNoChange("nonProdEnv", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">DR:</div>
            <div className="form-value">
              <Select 
                value={formData.drEnv} 
                onValueChange={(value) => handleYesNoChange("drEnv", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Support Needs Section */}
      <div className="form-section">
        <div className="form-section-header">
          Support Needs
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-label">CMS Full Support:</div>
            <div className="form-value">
              <Select 
                value={formData.cmsFullSupport} 
                onValueChange={(value) => handleYesNoChange("cmsFullSupport", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Exceptions to CMS Support:</div>
            <div className="form-value">
              <Textarea 
                value={formData.cmsExceptions} 
                onChange={(e) => handleChange("cmsExceptions", e.target.value)}
                placeholder="Enter any exceptions"
                className="min-h-[60px]"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Database Platforms Section */}
      <div className="form-section">
        <div className="form-section-header">
          Database Platforms
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-label">SQL:</div>
            <div className="form-value">
              <Select 
                value={formData.sql} 
                onValueChange={(value) => handleYesNoChange("sql", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Oracle:</div>
            <div className="form-value">
              <Select 
                value={formData.oracle} 
                onValueChange={(value) => handleYesNoChange("oracle", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Other (explain):</div>
            <div className="form-value">
              <Select 
                value={formData.otherDb} 
                onValueChange={(value) => handleYesNoChange("otherDb", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {formData.otherDb === "Yes" && (
            <div className="form-row">
              <div className="form-label">Explanation:</div>
              <div className="form-value">
                <Textarea 
                  value={formData.otherDbExplain} 
                  onChange={(e) => handleChange("otherDbExplain", e.target.value)}
                  placeholder="Explain other database platform"
                  className="min-h-[60px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Storage Needs Section */}
      <div className="form-section">
        <div className="form-section-header">
          Storage Needs
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-label">Azure Type:</div>
            <div className="form-value">
              <Select 
                value={formData.azureType} 
                onValueChange={(value) => handleYesNoChange("azureType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Azure Volume:</div>
            <div className="form-value">
              <Input 
                value={formData.azureVolume} 
                onChange={(e) => handleChange("azureVolume", e.target.value)}
                placeholder="e.g., 2x1.2TB & 1x500GB"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">On Prem:</div>
            <div className="form-value">
              <Select 
                value={formData.onPremStorage} 
                onValueChange={(value) => handleYesNoChange("onPremStorage", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">On Prem Volume:</div>
            <div className="form-value">
              <Input 
                value={formData.onPremVolume} 
                onChange={(e) => handleChange("onPremVolume", e.target.value)}
                placeholder="Enter volume if applicable"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Exceptions Section */}
      <div className="form-section">
        <div className="form-section-header">
          Exceptions
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-label">Backup:</div>
            <div className="form-value">
              <Select 
                value={formData.backup} 
                onValueChange={(value) => handleYesNoChange("backup", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">DR:</div>
            <div className="form-value">
              <Select 
                value={formData.dr} 
                onValueChange={(value) => handleYesNoChange("dr", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Physical:</div>
            <div className="form-value">
              <Select 
                value={formData.physical_exceptions} 
                onValueChange={(value) => handleYesNoChange("physical_exceptions", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Reason for Physical:</div>
            <div className="form-value">
              <Textarea 
                value={formData.physicalReason} 
                onChange={(e) => handleChange("physicalReason", e.target.value)}
                placeholder="Enter reason if applicable"
                className="min-h-[60px]"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">On Prem:</div>
            <div className="form-value">
              <Select 
                value={formData.onPremExceptions} 
                onValueChange={(value) => handleYesNoChange("onPremExceptions", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">Reason for On Prem:</div>
            <div className="form-value">
              <Textarea 
                value={formData.onPremReason} 
                onChange={(e) => handleChange("onPremReason", e.target.value)}
                placeholder="Enter reason if applicable"
                className="min-h-[60px]"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-label">No-Test Env sign-off:</div>
            <div className="form-value">
              <Input 
                value={formData.noTestEnvSignOff} 
                onChange={(e) => handleChange("noTestEnvSignOff", e.target.value)}
                placeholder="Enter NA if not applicable"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Other Notes Section */}
      <div className="form-section">
        <div className="form-section-header">
          Other Notes
        </div>
        <div className="form-section-content">
          <Textarea 
            value={formData.otherNotes} 
            onChange={(e) => handleChange("otherNotes", e.target.value)}
            placeholder="Enter any additional notes here"
            className="min-h-[100px] w-full"
          />
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
