import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Sparkles, FileText, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const jobProfiles = [
  "Software Engineer",
  "Product Manager", 
  "Data Scientist",
  "Marketing Manager",
  "Sales Representative",
  "UX/UI Designer",
  "Business Analyst",
  "Project Manager",
  "Financial Analyst",
  "Operations Manager"
];

export default function DemoForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      if (!uploadedFile.type.includes('pdf') && !uploadedFile.type.includes('doc')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file.",
          variant: "destructive",
        });
        return;
      }
      
      setFile(uploadedFile);
      toast({
        title: "File uploaded successfully",
        description: `${uploadedFile.name} is ready for analysis.`,
      });
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "Missing resume",
        description: "Please upload your resume first.",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription && !selectedProfile) {
      toast({
        title: "Missing job information",
        description: "Please provide a job description or select a profile.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        atsScore: Math.floor(Math.random() * 15) + 85, // 85-100
        matchScore: (Math.random() * 2 + 8).toFixed(1), // 8.0-10.0
        suggestions: [
          "Add more relevant keywords from the job description",
          "Improve formatting for better ATS compatibility", 
          "Include quantifiable achievements",
          "Optimize section headings",
          "Add missing technical skills"
        ],
        strengths: [
          "Strong professional experience",
          "Good educational background",
          "Relevant skill set",
          "Clear career progression"
        ]
      };
      
      setResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: `Your ATS score is ${mockResults.atsScore}%.`,
      });
    }, 3000);
  };

  return (
    <section className="py-24 px-4 lg:px-8 relative" id="demo">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 glass-card text-sm text-accent font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Free Demo - Try Now</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold">
            See JobFit Buddy in <span className="text-gradient-accent">Action</span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Upload your resume and get instant feedback on how to improve your ATS score
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload & Analyze
              </CardTitle>
              <CardDescription>
                Get your personalized resume analysis in seconds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="resume">Resume (PDF or DOCX)</Label>
                <div className="relative">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {file && (
                    <div className="mt-2 text-sm text-green-400 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {file.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Job Profile Selector */}
              <div className="space-y-2">
                <Label htmlFor="profile">Job Profile</Label>
                <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                  <SelectTrigger className="glass border-border/50">
                    <SelectValue placeholder="Select your target role" />
                  </SelectTrigger>
                  <SelectContent className="glass border-border/50">
                    {jobProfiles.map((profile) => (
                      <SelectItem key={profile} value={profile}>
                        {profile}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Job Description <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Paste the job description here for more accurate analysis..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="glass border-border/50 min-h-[120px] resize-none"
                  maxLength={1000}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {jobDescription.length}/1000
                </div>
              </div>

              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5 mr-2" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                Your personalized feedback and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload your resume and click "Analyze Resume" to see results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Scores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center glass-card">
                      <div className="text-3xl font-bold text-gradient-primary mb-1">
                        {results.atsScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">ATS Score</div>
                    </div>
                    <div className="text-center glass-card">
                      <div className="text-3xl font-bold text-gradient-accent mb-1">
                        {results.matchScore}/10
                      </div>
                      <div className="text-sm text-muted-foreground">Match Score</div>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Key Improvements</h4>
                    <ul className="space-y-2">
                      {results.suggestions.slice(0, 3).map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Strengths</h4>
                    <ul className="space-y-2">
                      {results.strengths.slice(0, 2).map((strength: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="neon" className="w-full" size="lg">
                    Get Full Analysis Report
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}